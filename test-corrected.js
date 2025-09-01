const https = require('https');

const postData = JSON.stringify({
    name: "Test User",
    email: "user@example.com",
    subject: "Portfolio Contact Test",
    message: "Testing the corrected email flow: FROM gokul@addtocloud.tech TO noreply@addtocloud.tech"
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

console.log('🧪 Testing corrected email worker...');
console.log('📧 Expected flow: FROM gokul@addtocloud.tech TO noreply@addtocloud.tech');

const req = https.request(options, (res) => {
    console.log(`\n✅ Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('📧 Response:', data);
        try {
            const parsed = JSON.parse(data);
            console.log('\n📊 Results:');
            console.log('  ✅ Success:', parsed.success);
            console.log('  📝 Message:', parsed.message);
            console.log('  🔧 Service:', parsed.service);
            
            if (parsed.success) {
                console.log('\n🎉 Worker deployed successfully with correct email configuration!');
                console.log('📥 Check your noreply@addtocloud.tech inbox for the test email');
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
