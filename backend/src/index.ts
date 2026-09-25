import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import notesRoutes from './routes/notesRoutes';
import tagsRoutes from './routes/tagsRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/notes', notesRoutes);
app.use('/api/tags', tagsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
