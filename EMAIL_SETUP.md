# Email Setup Guide for Portfolio Contact Form

## Overview
Your portfolio contact form uses **Cloudflare Functions** to handle email sending, with support for multiple email services. The form will send emails from `noreply@addtocloud.tech` to `gokul@addtocloud.tech` when someone fills out the contact form.

## Architecture
- **Frontend**: Next.js contact form (static export)
- **Backend**: Cloudflare Function (`/functions/api/contact.js`)
- **Email Services**: Resend, SMTP2GO, or EmailJS (configurable)

## Recommended Setup: Resend (Primary)

Resend is the recommended email service because it works seamlessly with Cloudflare Functions:

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify your account

### Step 2: Add Your Domain
1. In Resend dashboard, go to "Domains"
2. Add `addtocloud.tech` as your domain
3. Add the required DNS records to your domain registrar:
   - SPF record
   - DKIM records
   - DMARC record (optional but recommended)

### Step 3: Get API Key
1. Go to "API Keys" in Resend dashboard
2. Create a new API key
3. Copy the key (starts with `re_`)

### Step 4: Add to Environment Variables
For Cloudflare Pages deployment:
```bash
wrangler pages secret put RESEND_API_KEY --project-name portfolio
```

When prompted, enter your Resend API key.

## Alternative Setup: SMTP2GO (Fallback)
- Simple setup and great developer experience
- Reliable delivery
- Free tier: 3,000 emails/month
- Works seamlessly with Next.js

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up with your email
3. Verify your account

### Step 2: Add Your Domain
1. In Resend dashboard, go to "Domains"
2. Add `addtocloud.tech` as your domain
3. Add the required DNS records to your domain registrar:
   - SPF record
   - DKIM records
   - DMARC record (optional but recommended)

### Step 3: Get API Key
1. Go to "API Keys" in Resend dashboard
2. Create a new API key
3. Copy the key (starts with `re_`)

### Step 4: Add to Environment Variables
1. Update `.env.local`:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```

2. For Cloudflare Pages deployment, add environment variable:
   - Go to Cloudflare Pages dashboard
   - Select your portfolio project
   - Go to Settings → Environment Variables
   - Add `RESEND_API_KEY` with your API key

## Alternative Options

### Option 2: EmailJS (No server required)
Good for static sites, works entirely in the browser.

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and keys
5. Add to environment variables:
   ```
   EMAILJS_SERVICE_ID=your_service_id
   EMAILJS_TEMPLATE_ID=your_template_id
   EMAILJS_PUBLIC_KEY=your_public_key
   EMAILJS_PRIVATE_KEY=your_private_key
   ```

### Option 3: SMTP2GO
Alternative SMTP service for reliable delivery.

1. Sign up at [smtp2go.com](https://www.smtp2go.com/)
2. Get your API key
3. Add to environment variables:
   ```
   SMTP2GO_API_KEY=your_api_key
   ```

## Testing

### Local Testing
1. Add your API key to `.env.local`
2. Run `npm run dev`
3. Go to the contact section
4. Fill out and submit the form
5. Check the console for success/error messages

### Production Testing
1. Deploy with environment variables set
2. Test the contact form on your live site
3. Check email delivery

## Troubleshooting

### Common Issues
1. **Domain not verified**: Make sure you've added and verified your domain in Resend
2. **API key not working**: Check that the key is correctly set in environment variables
3. **Emails going to spam**: Set up proper SPF, DKIM, and DMARC records
4. **No emails received**: Check spam folder, verify domain setup

### Debug Steps
1. Check browser console for errors
2. Check server logs for email sending status
3. Verify environment variables are loaded
4. Test with a different email service

## Email Template

The contact form sends professionally formatted emails with:
- Sender information (name, email, subject)
- Original message content
- Timestamp
- Reply-to functionality (you can reply directly to the sender)

## Security Features

- Input validation and sanitization
- Email format validation
- Rate limiting (can be added)
- CORS protection
- XSS protection in email content

## Production Checklist

- [ ] Domain verified in email service
- [ ] DNS records configured (SPF, DKIM, DMARC)
- [ ] Environment variables set in production
- [ ] Contact form tested end-to-end
- [ ] Email deliverability verified
- [ ] Spam folder checked

## Support

If you need help setting up the email functionality:
1. Check the console logs for specific error messages
2. Verify all environment variables are correctly set
3. Test with the Resend dashboard email testing feature
4. Contact support for your chosen email service if needed
