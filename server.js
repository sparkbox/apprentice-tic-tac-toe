// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'src/css')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/html/index.html'));
});


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
