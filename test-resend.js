const https = require('https');

const postData = JSON.stringify({
    name: "Test User",
    email: "testuser@example.com",
    subject: "Testing Resend Email Integration",
    message: "This is a test message to verify that Resend API is working correctly with the Cloudflare Worker. The email should be delivered to noreply@addtocloud.tech"
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

console.log('🧪 Testing Resend API integration...');
console.log('📧 Expected delivery: noreply@addtocloud.tech');

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
                console.log('\n🎉 Email sent successfully!');
                console.log('📥 Check your noreply@addtocloud.tech inbox');
                console.log('🔍 Also check spam/junk folder');
                if (parsed.id) {
                    console.log('📧 Resend Email ID:', parsed.id);
                }
            } else {
                console.log('\n❌ Email failed:', parsed.error);
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
