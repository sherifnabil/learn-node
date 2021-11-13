const http = require('http');

const server = http.createServer((req, res) => {
  if(req.url === '/'){
    res.write('Hello Root')
  } else {
    res.write(req.url)
  }
  res.end()
});

server.listen(3000);

console.log('Listening to port 3000');