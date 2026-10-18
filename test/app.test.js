const test = require('node:test');
const assert = require('node:assert/strict');
const server = require('../app');

test('HTTP server returns the expected response', async () => {
  await new Promise((resolve) => server.listen(0, resolve));

  try {
    const port = server.address().port;
    const response = await fetch(`http://localhost:${port}`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.equal(body, 'Hello from CSIT 314 Jenkins CI/CD!\n');
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  }
});
