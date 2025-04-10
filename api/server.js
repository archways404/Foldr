const fastify = require('fastify')({ logger: false });
const cors = require('@fastify/cors');
const db = require('./db');

// Enable CORS so the browser extension can send requests
fastify.register(cors, {
	origin: '*', // Limit this in production
});

// Save URL route
fastify.post('/api/save', async (request, reply) => {
	const { url } = request.body;

	if (!url) {
		return reply.status(400).send({ error: 'Missing URL' });
	}

	try {
		const stmt = db.prepare('INSERT INTO urls (url) VALUES (?)');
		const info = stmt.run(url);

		console.log(`Saved URL: ${url} (ID: ${info.lastInsertRowid})`);
		reply.send({ status: 'success', id: info.lastInsertRowid, url });
	} catch (err) {
		console.error('DB error:', err);
		reply.status(500).send({ error: 'Database error' });
	}
});

fastify.get('/api/urls', async (request, reply) => {
	try {
		const stmt = db.prepare('SELECT id, url, timestamp FROM urls ORDER BY timestamp DESC');
		const rows = stmt.all(); // `.all()` returns all rows

		reply.send({ status: 'success', urls: rows });
	} catch (err) {
		console.error('DB read error:', err);
		reply.status(500).send({ error: 'Database read error' });
	}
});

// Start the server
fastify.listen({ port: 3000 }, (err, address) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}
	console.log(`Server listening at ${address}`);
});
