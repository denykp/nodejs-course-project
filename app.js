const http = require("http");

const server = http.createServer((req, res) => {
  const fs = require("fs");
  if (req.url === "/") {
    res.write(`<html>`);
    res.write(`<h3>Hello, welcome to / pages</h3>`);
    res.write(
      `<form action="/create-user" method="POST"><input type="text" name="username"/><button type="submit">Submit</button></form>`
    );
    res.write(`</html>`);
    res.end();
  } else if (req.url === "/users") {
    res.write(`<html>`);
    res.write(`<ul>`);
    res.write(`<li>User 1</li>`);
    res.write(`<li>User 2</li>`);
    res.write(`<li>User 3</li>`);
    res.write(`</ul>`);
    res.write(`</html>`);
    res.end();
  }
  if (req.url === "/create-user" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log("testlog", username);
      // fs.writeFileSync("username.txt", username);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
});

server.listen(3001);
