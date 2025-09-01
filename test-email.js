const https = require('https');

const postData = JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    subject: "Test Email from Worker",
    message: "This is a test message to verify the email worker is functioning correctly."
});

const options = {
    hostname: 'portfolio-email-worker.gocools.workers.dev',
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('Testing email worker...');

const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers, null, 2)}`);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('Response body:', data);
        try {
            const parsed = JSON.parse(data);
            console.log('Parsed response:', JSON.stringify(parsed, null, 2));
        } catch (e) {
            console.log('Response is not JSON:', data);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
