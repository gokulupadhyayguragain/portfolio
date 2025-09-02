const https = require('https');

const postData = JSON.stringify({
    name: "axa",
    email: "gokulupadhyayguragain@gmail.com",
    subject: "asdcasdcsa",
    message: "csda"
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

console.log('🧪 Testing the exact same data from your form submission...');

const req = https.request(options, (res) => {
    console.log(`\n✅ Status: ${res.statusCode}`);
    console.log('📊 Headers:', res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('\n📧 Response:', data);
        try {
            const parsed = JSON.parse(data);
            console.log('\n📊 Parsed Results:');
            console.log('  ✅ Success:', parsed.success);
            console.log('  📝 Message:', parsed.message);
            if (parsed.services) {
                console.log('  🔧 Services:', parsed.services);
            }
            if (parsed.errors) {
                console.log('  ❌ Errors:', parsed.errors);
            }
        } catch (e) {
            console.log('❌ Response is not JSON:', data);
        }
    });
});

req.on('error', (e) => {
    console.error(`❌ Request failed: ${e.message}`);
});

req.write(postData);
req.end();
