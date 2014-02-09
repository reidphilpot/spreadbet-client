var http = require('http')
    , express = require('express')
    , app = express()
    , port = process.env.PORT || 5000;

app.configure(function () {
    app.use(
        "/", //the URL throught which you want to access to you static content
        express.static(__dirname) //where your static content is located in your filesystem
    );
});

var server = http.createServer(app).listen(port, function() {
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
});
