const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;

const server = http.createServer((req, res) => {

  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url,
  );

  const extName = String(path.extname(filePath)).toLowerCase();

  const mimeType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };

  const contentType = mimeType[extName] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    console.log(1)
    if (err) {
        console.log(`${err} - occured`);
        res.writeHead(404, { "content-type": "text/html" });
        res.end("404: Nahi mila");
    } else {
        res.writeHead(200, { "content-type": contentType });
        res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`Port-${port} is listening successfully.`);
});
