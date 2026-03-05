import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg;
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'kaswin',
  host: 'localhost',
  database: 'postgres',
  port: 5432,
});

// --- 1. DASHBOARD ANALYTICS ---
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const revenue = await pool.query("SELECT SUM(amount) FROM invoices WHERE status ILIKE 'Paid'");
    const active = await pool.query("SELECT COUNT(*) FROM shipments WHERE status != 'Delivered'");
    const pending = await pool.query("SELECT COUNT(*) FROM orders WHERE status ILIKE 'Pending'");
    
    console.log(`[VIEW] Dashboard stats calculated at ${new Date().toLocaleTimeString()}`);
    
    res.json({
      revenue: parseFloat(revenue.rows[0].sum || 0),
      activeShipments: parseInt(active.rows[0].count || 0),
      pendingOrders: parseInt(pending.rows[0].count || 0),
      customsAlerts: 2 // Sample static alert count
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 2. PRODUCTS (With Secure History) ---
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
    console.log(`[VIEW] Product Catalog: ${result.rows.length} items sent.`);
    res.json(result.rows.map(p => ({
      ...p,
      id: String(p.id), // Handle P006 safely
      price: parseFloat(p.price || 0)
    })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params; 
  const { price, role } = req.body;

  if (role !== 'admin' && role !== 'manager') {
    console.log(`[DENIED] ⛔ Role ${role} cannot update price.`);
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const oldData = await pool.query('SELECT name, price FROM products WHERE id = $1', [id]);
    if (oldData.rows.length === 0) return res.status(404).json({ error: "Not found" });

    await pool.query('UPDATE products SET price = $1 WHERE id = $2', [price, id]);
    
    console.log(`--------------------------------------------------`);
    console.log(`[HISTORY] ✅ PRICE UPDATE`);
    console.log(`[BY]:      ${role.toUpperCase()}`);
    console.log(`[ITEM]:    ${oldData.rows[0].name} (${id})`);
    console.log(`[CHANGE]:  $${oldData.rows[0].price} ➡️ $${price}`);
    console.log(`--------------------------------------------------`);

    res.json({ message: "Success" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 3. ORDERS ---
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders ORDER BY order_date DESC');
    console.log(`[VIEW] Orders accessed.`);
    res.json(result.rows.map(o => ({
      id: String(o.id),
      customer: o.customer_name,
      date: new Date(o.order_date).toLocaleDateString(),
      total: parseFloat(o.total_amount || 0),
      status: o.status
    })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 4. INVOICES & PAYMENTS ---
app.get('/api/invoices', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM invoices ORDER BY due_date ASC');
    console.log(`[VIEW] Invoices accessed.`);
    res.json(result.rows.map(i => ({
      ...i,
      amount: parseFloat(i.amount || 0)
    })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 5. VENDORS ---
app.get('/api/vendors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vendors ORDER BY rating DESC');
    console.log(`[VIEW] Vendor profiles viewed.`);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});


//----6. shipments ---
app.get('/api/shipments', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, o.customer_name 
      FROM shipments s 
      JOIN orders o ON s.order_id = o.id 
      ORDER BY s.eta ASC
    `);
    console.log(`[VIEW] Shipment logs accessed.`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/dashboard/stats', async (req, res) => {
  try {
    // 1. Total Revenue (Sum of 'Paid' invoices)
    const revenue = await pool.query("SELECT SUM(amount) FROM invoices WHERE status = 'Paid'");
    
    // 2. Active Shipments (Not yet 'Delivered')
    const active = await pool.query("SELECT COUNT(*) FROM shipments WHERE status != 'Delivered'");
    
    // 3. Pending Orders
    const pending = await pool.query("SELECT COUNT(*) FROM orders WHERE status = 'Pending'");
    
    // 4. Customs Alerts (Shipments currently in Customs)
    const customs = await pool.query("SELECT COUNT(*) FROM shipments WHERE status = 'Customs'");

    res.json({
      revenue: parseFloat(revenue.rows[0].sum || 0),
      activeShipments: parseInt(active.rows[0].count || 0),
      pendingOrders: parseInt(pending.rows[0].count || 0),
      customsAlerts: parseInt(customs.rows[0].count || 0)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 MASTER SERVER RUNNING: http://127.0.0.1:${PORT}`);
});
