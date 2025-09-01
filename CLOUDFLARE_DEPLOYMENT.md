# Cloudflare Pages Deployment with Email Functionality

## Prerequisites
- Cloudflare account
- Domain `addtocloud.tech` configured in Cloudflare
- Email service account (Resend recommended)
- GitHub repository connected to Cloudflare Pages

## Step 1: Set up Email Service

### Using Resend (Recommended)
1. Create account at [resend.com](https://resend.com)
2. Add domain `addtocloud.tech`:
   - Go to Domains → Add Domain
   - Add the required DNS records to Cloudflare:
     ```
     Type: TXT
     Name: @
     Value: [SPF record from Resend]
     
     Type: TXT  
     Name: resend._domainkey
     Value: [DKIM record from Resend]
     ```
3. Wait for domain verification (usually 5-10 minutes)
4. Create API key in Resend dashboard

## Step 2: Configure Cloudflare Pages Environment Variables

### Method 1: Using Cloudflare Dashboard
1. Go to Cloudflare Pages dashboard
2. Select your portfolio project
3. Go to Settings → Environment Variables
4. Add the following:
   - **Production Environment**:
     - Variable name: `RESEND_API_KEY`
     - Value: `re_your_actual_api_key_here`
   
   - **Preview Environment** (optional):
     - Variable name: `RESEND_API_KEY`
     - Value: `re_your_actual_api_key_here`

### Method 2: Using Wrangler CLI
```bash
# Make sure you're in the project directory
cd portfolio

# Set the secret for production
wrangler pages secret put RESEND_API_KEY --project-name portfolio

# When prompted, enter your Resend API key
```

## Step 3: Deploy

### Automatic Deployment (GitHub Integration)
1. Push changes to your main branch
2. Cloudflare Pages will automatically build and deploy
3. Check the deployment logs for any errors

### Manual Deployment
```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

## Step 4: Verify Email Functionality

### Test Steps:
1. Visit your deployed site: `https://your-site.pages.dev`
2. Navigate to the contact section
3. Fill out the contact form with a test message
4. Submit the form
5. Check `gokul@addtocloud.tech` for the email
6. Verify the email appears correctly formatted

### Troubleshooting:

#### Emails not sending:
1. Check Cloudflare Pages function logs:
   ```bash
   wrangler pages deployment tail --project-name portfolio
   ```
2. Verify environment variable is set correctly
3. Check Resend dashboard for any delivery issues
4. Ensure domain is fully verified in Resend

#### Domain verification issues:
1. Double-check DNS records in Cloudflare DNS settings
2. Wait 24-48 hours for full propagation
3. Use DNS checker tools to verify records
4. Contact Resend support if issues persist

#### Build failures:
1. Check that all dependencies are in package.json
2. Verify Next.js version compatibility
3. Check function logs for specific errors
4. Ensure environment variables are set correctly

## Step 5: DNS Configuration for Production

### SPF Record (Required)
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

### DKIM Records (Required)
```
Type: TXT
Name: resend._domainkey
Value: [Provided by Resend]
```

### DMARC Record (Recommended)
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:gokul@addtocloud.tech
```

## Step 6: Testing Production

### Email Deliverability Test:
1. Send test email from contact form
2. Check primary inbox
3. Check spam/junk folders
4. Test with different email providers (Gmail, Outlook, etc.)
5. Verify reply-to functionality works

### Performance Test:
1. Test form submission speed
2. Check for any timeout issues
3. Verify error handling works correctly
4. Test with different browsers and devices

## Monitoring and Maintenance

### Regular Checks:
- [ ] Monthly email deliverability test
- [ ] Check Resend dashboard for any issues
- [ ] Monitor Cloudflare Pages function usage
- [ ] Review contact form submissions
- [ ] Update API keys if needed

### Analytics:
- Set up Cloudflare Pages analytics
- Monitor form submission rates
- Track email delivery success rates
- Monitor for any error patterns

## Support

### Resources:
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Resend Documentation](https://resend.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)

### Getting Help:
1. Check Cloudflare Pages logs first
2. Review Resend delivery logs
3. Test locally with same environment variables
4. Contact support for your chosen email service
5. Check GitHub Issues for common problems

## Security Considerations

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Regularly rotate API keys
- Monitor for unusual email activity
- Set up proper SPF/DKIM/DMARC records
- Consider rate limiting for form submissions

## Success Checklist

- [ ] Domain verified in email service
- [ ] DNS records properly configured
- [ ] Environment variables set in production
- [ ] Successful test email received
- [ ] Form handles errors gracefully
- [ ] Email formatting looks professional
- [ ] Reply-to functionality works
- [ ] No sensitive data in browser console
- [ ] Performance meets expectations
