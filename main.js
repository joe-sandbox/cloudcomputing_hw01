const http = require('http');
const PORT = 8000;
const server = http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("Hello World\n");
});

server.listen(PORT);
console.log("Server running at http://127.0.0.0.1:"+PORT);