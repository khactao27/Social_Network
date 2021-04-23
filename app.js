const express = require('express');
// const bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('./views/homepage/homepage.html');
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})