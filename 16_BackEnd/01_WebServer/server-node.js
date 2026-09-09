const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    res.end("Welcome from the server(NODE)");
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("content-type", "text/plain");
    res.end(`Switched to the ${req.url} page`);
  } else {
    res.statusCode = 404;
    res.setHeader("content-type", "text/plain");
    res.end(`404 - ${req.url} Do not exists`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is listening to https://${hostname}:${port}`);
});
