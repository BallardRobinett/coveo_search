import express from 'express';
import path from 'path';
import type { Request, Response } from 'express';

const app = express();

// Serve static files from the dist directory
app.use(express.static('dist'));

// Handle all other routes by serving index.html
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Current directory: ${process.cwd()}`);
  console.log(`Static files being served from: ${path.join(process.cwd(), 'dist')}`);
});