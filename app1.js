const http = require("http");

const server = http.createServer((req, res) => {
  const fs = require("fs");
  if (req.url === "/") {
    res.write(`<html>`);
    res.write(
      `<form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Submit</button></form>`
    );
    res.write(`</html>`);
    res.end();
  } else if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
});

server.listen(3001);
