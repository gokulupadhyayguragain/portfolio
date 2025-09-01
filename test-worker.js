const https = require('https');

const postData = JSON.stringify({
    name: "Portfolio Test",
    email: "test@example.com",
    subject: "Contact Form Test",
    message: "Testing the contact form from the live website."
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
console.log('Request data:', JSON.parse(postData));

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
            console.log('\n📊 Parsed Response:');
            console.log('  Success:', parsed.success);
            console.log('  Message:', parsed.message);
            console.log('  Service:', parsed.service);
            
            if (parsed.success) {
                console.log('\n🎉 Email worker is functioning correctly!');
                console.log('💡 If you\'re not receiving emails, check:');
                console.log('   1. Your noreply@addtocloud.tech inbox');
                console.log('   2. Spam/junk folder');
                console.log('   3. Email server logs in Zoho admin panel');
            } else {
                console.log('\n❌ Email worker returned an error');
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
