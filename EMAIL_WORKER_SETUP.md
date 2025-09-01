# 📧 Email Worker Setup Guide

The portfolio now uses a **dedicated Cloudflare Worker** for email functionality, which is more reliable than Cloudflare Pages Functions.

## ✅ What's Already Done

- ✅ **Worker Deployed**: `https://portfolio-email-worker.gocools.workers.dev`
- ✅ **Contact Form Updated**: Now uses the worker endpoint
- ✅ **Multiple Email Services**: Supports Resend, SMTP2GO, EmailJS
- ✅ **CORS Configured**: Works with your portfolio domain
- ✅ **Error Handling**: Graceful fallbacks and logging

## 🔧 Email Service Setup (Required)

You need to set up at least one email service for the worker to function. Here are your options:

### Option 1: Resend (Recommended)

**Why Resend?**
- ✅ Built for developers
- ✅ Great deliverability
- ✅ Simple API
- ✅ Free tier: 3,000 emails/month

**Setup Steps:**
1. **Sign up**: Go to [resend.com](https://resend.com)
2. **Add domain**: Add `addtocloud.tech` to your Resend account
3. **DNS Setup**: Add the required DNS records to Cloudflare:
   ```
   Type: TXT
   Name: @
   Value: v=spf1 include:_spf.resend.com ~all
   
   Type: TXT
   Name: resend._domainkey  
   Value: [DKIM key from Resend]
   ```
4. **Get API Key**: Create an API key in Resend dashboard
5. **Set Worker Secret**:
   ```bash
   cd email-worker
   npx wrangler secret put RESEND_API_KEY
   # Enter your API key when prompted
   ```

### Option 2: SMTP2GO (Alternative)

**Setup Steps:**
1. **Sign up**: Go to [smtp2go.com](https://www.smtp2go.com/)
2. **Get API Key**: From your SMTP2GO dashboard
3. **Set Worker Secret**:
   ```bash
   cd email-worker
   npx wrangler secret put SMTP2GO_API_KEY
   # Enter your API key when prompted
   ```

### Option 3: EmailJS (Client-side service)

**Setup Steps:**
1. **Sign up**: Go to [emailjs.com](https://www.emailjs.com/)
2. **Create Service**: Set up Gmail/Outlook service
3. **Create Template**: Create an email template
4. **Set Worker Secrets**:
   ```bash
   cd email-worker
   npx wrangler secret put EMAILJS_SERVICE_ID
   npx wrangler secret put EMAILJS_TEMPLATE_ID
   npx wrangler secret put EMAILJS_PUBLIC_KEY
   npx wrangler secret put EMAILJS_PRIVATE_KEY
   ```

## 🧪 Testing

### 1. Test Worker Directly
```bash
curl -X POST https://portfolio-email-worker.gocools.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"Test message"}'
```

### 2. Test Contact Form
1. Visit your live portfolio site
2. Fill out the contact form
3. Submit and check for success message
4. Check `gokul@addtocloud.tech` for the email

## 🔍 Monitoring

### Check Worker Logs
```bash
cd email-worker
npx wrangler tail
```

### Cloudflare Dashboard
- Go to Cloudflare Workers dashboard
- Select `portfolio-email-worker`
- View metrics, logs, and analytics

## 🚨 Troubleshooting

### Common Issues:

**1. No email service configured**
- Solution: Set up at least one API key as shown above
- Worker will log messages for manual review if no service works

**2. CORS errors**
- Current CORS origin: `https://portfolio-e5u.pages.dev`
- Update if your domain changes

**3. Rate limiting**
- Worker currently has no rate limits
- Can be added using Cloudflare KV if needed

**4. Email goes to spam**
- Set up proper SPF/DKIM records for your domain
- Use Resend with verified domain for best deliverability

### Debug Steps:
1. Check worker logs: `npx wrangler tail`
2. Test worker directly with curl
3. Verify API keys are set correctly
4. Check email service dashboards for delivery status

## 🔄 Updates

### Redeploy Worker
```bash
cd email-worker
npx wrangler deploy
```

### Update Secrets
```bash
npx wrangler secret put SECRET_NAME
```

### List Current Secrets
```bash
npx wrangler secret list
```

## ✨ Features

The worker provides:
- ✅ **Input validation** (email format, field requirements)
- ✅ **Professional email templates** (HTML + text)
- ✅ **Multiple service fallbacks** (tries services in order)
- ✅ **CORS support** (works from browsers)
- ✅ **Error logging** (detailed logs in Cloudflare)
- ✅ **Rate limiting ready** (can be extended)

## 🎯 Next Steps

1. **Choose an email service** from the options above
2. **Set up the API key** using wrangler secret commands
3. **Test the contact form** on your live site
4. **Monitor the logs** to ensure everything works
5. **Set up domain verification** for better deliverability

The worker is production-ready and will handle all your contact form submissions reliably! 🚀
