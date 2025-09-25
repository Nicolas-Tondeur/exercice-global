const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`Hello from the **${process.env.ENV_NAME || 'Default'}** environment!`);
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});