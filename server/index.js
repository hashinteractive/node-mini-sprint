const http = require('http');

//headers to allows CORS requests
const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10
};

const port = 3333;

// TODO: Fill with strings of your favorite quotes :)
const quotes = [
  'Compassion has no limit. Kindness has no enemy.',
  'Love has no end, only a beginning.',
  'Empty yourself and let the universe fill you.',
  'Life is a chance. Love is infinity. Grace is reality.',
  'Work but don’t forget to live.'
];

//Utility Function to return a random integer
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const handleRequest = function(req, res) {
  //console.log(`Endpoint: ${req.url} Method: ${req.method}`);
  for(header in headers){
    res.setHeader(header, headers[header])
  } 
	if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	}

  // redirect users to /quote if they try to hit the homepage. This should already work, no changes needed
  if (req.url == '/') {
    console.log('redirecting');
    res.writeHead(301, {...headers, Location: `http://localhost:${port}/quote`}) //redirect to quote
    res.end();
    return;
  }

  if ((req.url == '/quotes/' || req.url == '/quotes') && req.method == "GET") {
    //YOUR CODE HERE
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(quotes))
    return;
  }
  // TODO: GET ONE
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "GET") {
    //YOUR CODE HERE
    const quote = quotes[getRandomInt(0, quotes.length)]
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end(quote)
    return;
  }
  // TODO: POST/CREATE
  else if ((req.url == '/quote/' || req.url == '/quote') && req.method == "POST") {
    //YOUR CODE HERE
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = JSON.parse(Buffer.concat(body).toString());
      // at this point, `body` has the entire request body stored in it as a string
      let { quote } = body
      quotes.push(quote)
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end(JSON.stringify(body))
    });
  }

//CATCH ALL ROUTE
  else {
    res.writeHead(404,headers);
    res.end('Page not found');
    return;
  }
}

const server = http.createServer(handleRequest);
server.listen(port);

console.log('Server is running in the terminal!');
console.log(`Listening on http://localhost:${port}`);
