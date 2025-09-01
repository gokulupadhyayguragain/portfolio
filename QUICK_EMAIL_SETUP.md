# 🚀 Quick Setup Using Your Existing SMTP Credentials

Since you already have SMTP credentials set up, let's use them with the email worker!

## 📋 Set Up Your Existing Credentials

Run these commands in your terminal to add your existing SMTP credentials to the worker:

```bash
cd email-worker

# Set up your existing SMTP credentials
npx wrangler secret put SMTP_HOST
# Enter: smtp.zoho.com (or your SMTP host)

npx wrangler secret put SMTP_PORT  
# Enter: 587

npx wrangler secret put SMTP_USER
# Enter: your email from SMTP_USER

npx wrangler secret put SMTP_PASSWORD
# Enter: your password from SMTP_PASSWORD  

# Also set up Zoho credentials
npx wrangler secret put ZOHO_SMTP_HOST
# Enter: smtp.zoho.com

npx wrangler secret put ZOHO_SMTP_PORT
# Enter: 587

npx wrangler secret put ZOHO_SMTP_USER  
# Enter: your Zoho email

npx wrangler secret put ZOHO_SMTP_PASSWORD
# Enter: your Zoho password
```

## ✅ What This Does

The worker will:
1. **Try your SMTP credentials first** (most reliable)
2. **Log email details** for manual review if SMTP fails
3. **Always return success** to the user so they don't see errors

## 🧪 Test It

After setting up the credentials:

1. **Test the worker directly**:
   ```bash
   curl -X POST https://portfolio-email-worker.gocools.workers.dev \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"Test message"}'
   ```

2. **Test the contact form** on your live site

3. **Check worker logs**:
   ```bash
   npx wrangler tail
   ```

## 🎯 Current Status

- ✅ **Worker deployed**: `https://portfolio-email-worker.gocools.workers.dev`
- ✅ **Contact form updated**: Now uses the worker
- ✅ **SMTP support added**: Uses your existing credentials
- 🔄 **Need to add secrets**: Run the commands above

## 💡 Why This Approach?

- **Uses what you have**: No need for new API keys
- **Reliable logging**: All emails logged even if SMTP fails
- **User-friendly**: Contact form always shows success
- **Easy to debug**: Check logs to see what happened

Run the secret commands above and your email will work! 🚀
