const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/scan',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Test 1: Empty body
const req1 = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Test 1 (Empty Body) Status:', res.statusCode);
    console.log('Test 1 Response:', data);
  });
});
req1.write(JSON.stringify({}));
req1.end();

// Test 2: Invalid base64
const req2 = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Test 2 (Invalid Base64) Status:', res.statusCode);
    console.log('Test 2 Response:', data);
  });
});
req2.write(JSON.stringify({ image: 'data:image/jpeg;base64,invalid!!!' }));
req2.end();
