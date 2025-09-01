# Portfolio Email Worker

A dedicated Cloudflare Worker for handling contact form email submissions from the portfolio website.

## Features

- ✅ **Multiple Email Services**: Supports Resend, SMTP2GO, and EmailJS
- ✅ **Automatic Fallback**: Tries services in order until one succeeds
- ✅ **CORS Support**: Proper CORS headers for browser requests
- ✅ **Input Validation**: Validates email format and field requirements
- ✅ **Rate Limiting Ready**: Can be extended with KV for rate limiting
- ✅ **Professional Templates**: HTML and text email templates
- ✅ **Error Handling**: Graceful fallbacks and logging

## Setup

### 1. Install Dependencies
```bash
cd email-worker
npm install -g wrangler
```

### 2. Login to Cloudflare
```bash
wrangler auth login
```

### 3. Configure Email Service (Choose One)

#### Option A: Resend (Recommended)
```bash
wrangler secret put RESEND_API_KEY
# Enter your Resend API key when prompted
```

#### Option B: SMTP2GO
```bash
wrangler secret put SMTP2GO_API_KEY
# Enter your SMTP2GO API key when prompted
```

#### Option C: EmailJS
```bash
wrangler secret put EMAILJS_SERVICE_ID
wrangler secret put EMAILJS_TEMPLATE_ID
wrangler secret put EMAILJS_PUBLIC_KEY
wrangler secret put EMAILJS_PRIVATE_KEY
```

### 4. Deploy
```bash
npm run deploy
```

## Usage

The worker will be available at `https://portfolio-email-worker.your-subdomain.workers.dev`

### Frontend Integration

Update your contact form to use the worker endpoint:

```javascript
const response = await fetch('https://portfolio-email-worker.your-subdomain.workers.dev', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Hello',
    message: 'This is a test message'
  })
});

const result = await response.json();
```

## Configuration

### Environment Variables
- `CORS_ORIGIN`: Allowed origin for CORS (default: *)
- `FROM_EMAIL`: Sender email address (default: noreply@addtocloud.tech)
- `TO_EMAIL`: Recipient email address (default: gokul@addtocloud.tech)

### Secrets
Set these via `wrangler secret put`:
- `RESEND_API_KEY`: Resend API key
- `SMTP2GO_API_KEY`: SMTP2GO API key
- `EMAILJS_SERVICE_ID`: EmailJS service ID
- `EMAILJS_TEMPLATE_ID`: EmailJS template ID
- `EMAILJS_PUBLIC_KEY`: EmailJS public key
- `EMAILJS_PRIVATE_KEY`: EmailJS private key

## API Reference

### POST /

Send a contact form email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "subject": "Contact Form Submission",
  "message": "Hello, this is a test message."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Message sent successfully! I'll get back to you soon.",
  "service": "Resend"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid email format"
}
```

## Development

### Local Development
```bash
npm run dev
```

### View Logs
```bash
npm run tail
```

### Deploy to Production
```bash
# Deploy to production environment
wrangler deploy --env production
```

## Monitoring

The worker logs all email attempts and provides detailed error information. Check the Cloudflare Workers dashboard for:

- Request metrics
- Error rates
- Response times
- Console logs

## Security

- Input validation for all fields
- Email format validation
- Message length limits (5000 characters)
- Name length limits (100 characters)
- CORS protection
- No sensitive data in logs
