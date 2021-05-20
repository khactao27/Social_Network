const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const routeHome = require('./routes/homepage.route');
let routePost = require('./routes/post.route');
let routeSearch = require('./routes/search.route');

// create the app
const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//setting middleware
app.use(express.static(__dirname + 'public')); //Serves resources from public folder
app.use(express.static('public'));
app.use(compression());
app.set('views', './views')
app.set('view engine', 'ejs');


app.use('/', routeHome);
app.use('/posts', routePost);
app.use('/search', routeSearch);

app.listen(port, ()=>{
  console.log(`The server is running at http://localhost:${port}`);
});