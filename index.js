// Create an express erver and serve files from the ./static directory
// The server listens on port 3078
// The server will respond to requests for the root URL with the file index.html

const express = require('express');
const app = express();
const path = require('path');

const PORT = 3078;

function log(...args) {
	console.log(`\x1b[36m[${new Date().toISOString()}]\x1b[0m`, ...args);
}

const logger = (req, _res, next) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	log(req.method, url.pathname);
	next();
};

app.use(logger);
app.use(express.static(path.join(__dirname, 'static')));


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(3078, () => {
	log(`Server listening on port http://localhost:${PORT}`);
});

