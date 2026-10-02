import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(express.json({ limit: '10mb' }));

// Content API
app.get('/api/content', (_req, res) => {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const data = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
      return res.json({ success: true, data });
    }
    return res.json({ success: true, data: null });
  } catch (error) {
    console.error('Error reading content:', error);
    return res.status(500).json({ error: 'Failed to read content' });
  }
});

app.post('/api/content', (req, res) => {
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(req.body, null, 2), 'utf-8');
    return res.json({ success: true, savedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Error saving content:', error);
    return res.status(500).json({ error: 'Failed to save content' });
  }
});

// Inquiries API
app.get('/api/inquiries', (_req, res) => {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
      return res.json({ success: true, data });
    }
    return res.json({ success: true, data: null });
  } catch (error) {
    console.error('Error reading inquiries:', error);
    return res.status(500).json({ error: 'Failed to read inquiries' });
  }
});

app.post('/api/inquiries', (req, res) => {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(req.body, null, 2), 'utf-8');
    return res.json({ success: true });
  } catch (error) {
    console.error('Error saving inquiries:', error);
    return res.status(500).json({ error: 'Failed to save inquiries' });
  }
});

app.post('/api/reset', (_req, res) => {
  try {
    if (fs.existsSync(CONTENT_FILE)) fs.unlinkSync(CONTENT_FILE);
    if (fs.existsSync(INQUIRIES_FILE)) fs.unlinkSync(INQUIRIES_FILE);
    return res.json({ success: true });
  } catch (error) {
    console.error('Error resetting content:', error);
    return res.status(500).json({ error: 'Failed to reset content' });
  }
});

// Vite middleware in dev or static files in production
const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(process.cwd(), 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`  ➜  Local:   http://localhost:${PORT}/`);
  console.log(`  ➜  Network: http://0.0.0.0:${PORT}/`);
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
