const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/version', (_, res) => {
  return res.json({
    ios: { soft: '0.0.1', hard: '0.0.0' },
    android: { soft: '0.0.1', hard: '0.0.0' },
  });
});

app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(port, () => {
  console.log(port);
});
