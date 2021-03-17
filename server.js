// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import path from 'path';
import pkg from './package.json';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'src')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/index.html'));
});

app.get('/version', (req, res) => {
  res.json(
    pkg.version,
  );
});

app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, 'src/html/404.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
