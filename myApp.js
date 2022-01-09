// challenge #1
// console.log("An error happened");

// challenge #2
var express = require('express');
var app = express();

// challenge #3
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// challenge #4
//app.use(path, middlewareFunction)

app.use("/public", express.static(__dirname + "/public"));

// challenge #5
// https://boilerplate-express-1.yuuchinkeoy.repl.co/json will serve {"message":"Hello json"}

app.get("/json", (req, res) => {
  res.json({
    message: "Hello json"
  });
});

// challenge #6
process.env.MESSAGE_STYLE = 'uppercase';

// challenge #7
// Build a simple logger. For every request, log  a string following format: method path - ip. An example: GET /json - ::ffff:127.0.0.1. Note: there is a space between method and path and the dash between path and ip is surrounded by a space on both sides. You can get the request method (http verb), the relative route path, and the caller’s ip from the request object using req.method, req.path and req.ip. Remember to call next() when you are done, or your server will be stuck forever. Be sure to have the ‘Logs’ opened, and see what happens when some request arrives.

app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

// challenge #6 cont'd 
app.get('/json', function(req, res) {
  var response = {
    "message": "Hello json"
  };

  if (process.env.MESSAGE_STYLE === 'uppercase') {
    response.message = response.message.toUpperCase();
  }

  return res.json(response);
});

// challenge #8
// In the route app.get('/now', ...) chain a middleware function and the final handler. In the middleware function you should add the current time to the request object in the req.time key. You can use new Date().toString(). In the handler, respond with a JSON object, taking the structure {time: req.time}.

app.get('/now', function(req, res, next) {
  req.time = new Date().toString()
  next();
}, function(req, res) {
  res.json({
    time: req.time
  });
});

// challenge #9
// Build an echo server, mounted at the route GET /:word/echo. Respond with a JSON object, taking the structure {echo: word}. You can find the word to be repeated at req.params.word. You can test your route from your browser's address bar, visiting some matching routes, e.g. your-app-rootpath/freecodecamp/echo.
// syntax: 
// app.method("/:param1/:param2", (req, res) => {
//   var param1 = req.params.param1;
//   var { param1, param2 } = req.params;
//   res.json(req.params);
// });

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

// challenge #10
//Build an API endpoint, mounted at GET /name. 
//Respond with JSON, { name: 'firstname lastname'}. 
//The first and last name parameters should be encoded in a query string ?first=firstname&last=lastname.

// method #1
app
  .route('/name')
  .get((req, res) => {
    var first = req.query.first;
    var last = req.query.last;
    res.json({
      name: first + ' ' + last
    });
  })
  .post();

// method #2
// app.get("/name", function(req, res) {
//   var firstName = req.query.first;
//   var lastName = req.query.last;
//   // OR you can destructure and rename the keys
//   var { first: firstName, last: lastName } = req.query;
//   res.json({
//     name: `${firstName} ${lastName}`
//   });
// });


// # challenge11: body-parser to Parse POST Requests






module.exports = app;
