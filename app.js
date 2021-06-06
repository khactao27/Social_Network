const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const routeHome = require('./routes/homepage.route');
let routePost = require('./routes/post.route');
let routeSearch = require('./routes/search.route');
let routeUser = require('./routes/user.route');
var cookieParser = require('cookie-parser');

// create the app
const app = express();
var server = require('http').Server(app);
const port = process.env.port || 3000;
let io = require("socket.io")(server);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
//setting middleware
app.use(express.static(__dirname + 'public')); //Serves resources from public folder
app.use(express.static('public'));
app.use(compression());
app.set('views', './views')
app.set('view engine', 'ejs');



app.use('/', routeHome);
app.use('/posts', routePost);
app.use('/search', routeSearch);
app.use('/users', routeUser);

let users = [];
const addUser = (user_id, socketId, avatar, fullname) => {
  !users.some((user)=> user.user_id == user_id) && users.push({user_id, socketId, avatar, fullname});
};
const removeUser = (socketId) =>{
  users = users.filter(user => user.socketId !== socketId);
};
const getUser = (user_id) =>{
  return users.find(user => user.user_id = user_id);
};

io.on("connection", function(socket){
  socket.on("Notifications", data=>{
    socket.broadcast.emit("update-notification", data.following_id);
  })
  socket.on("onlines", ({user_id, avatar, fullname})=>{
    addUser(user_id, socket.id, avatar, fullname);
    io.emit("user-onlines", users);
  })
  socket.on("disconnect", ()=>{
    removeUser(socket.id);
    console.log("a user disconnected!");
    io.emit("user-onlines", users);
  })
})

server.listen(port, ()=>{
  console.log(`The server is running at http://localhost:${port}`);
});