# Cloudflare Pages Deployment Guide

This guide will help you deploy your portfolio to Cloudflare Pages with SMTP functionality.

## Prerequisites

1. **Cloudflare Account** with Pages enabled
2. **GitHub Repository** with your portfolio code
3. **SMTP Service** (SendGrid, Mailgun, or similar)

## Required GitHub Secrets

Set these secrets in your GitHub repository (Settings → Secrets and variables → Actions):

### Cloudflare Secrets
```
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
CLOUDFLARE_ZONE_ID=your_cloudflare_zone_id (optional, for custom domain)
```

### SMTP Secrets
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_api_key
```

## Setup Instructions

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
# or
npm install --save-dev wrangler
```

### 2. Login to Cloudflare
```bash
npx wrangler login
```

### 3. Create Cloudflare Pages Project
```bash
npx wrangler pages project create gokul-portfolio
```

### 4. Set Environment Variables
```bash
# Set production environment variables
npx wrangler secret put SMTP_HOST --env production
npx wrangler secret put SMTP_PORT --env production  
npx wrangler secret put SMTP_USER --env production
npx wrangler secret put SMTP_PASSWORD --env production
```

### 5. Manual Deployment (if needed)
```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npm run deploy:production
```

## GitHub Actions Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:

1. **Builds** your Next.js application
2. **Deploys** to Cloudflare Pages
3. **Sets up** SMTP secrets
4. **Runs** on every push to main/master branch

## Contact Form Configuration

The contact form uses Cloudflare Functions (`functions/api/contact.js`) to:

- ✅ **Validate** form input
- ✅ **Send emails** via SMTP
- ✅ **Handle CORS** for cross-origin requests
- ✅ **Return JSON** responses

## Custom Domain (Optional)

1. **Add custom domain** in Cloudflare Pages dashboard
2. **Update DNS** records to point to Cloudflare
3. **Set CLOUDFLARE_ZONE_ID** in GitHub secrets
4. **Update wrangler.toml** with your domain

## SMTP Providers

### SendGrid (Recommended)
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_api_key
```

### Mailgun
```
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=your_mailgun_username
SMTP_PASSWORD=your_mailgun_password
```

### Gmail (Less Secure)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## Troubleshooting

### Build Issues
- Ensure `output: 'export'` in `next.config.mjs`
- Check `distDir: 'out'` configuration
- Verify all dependencies are installed

### SMTP Issues
- Verify SMTP credentials are correct
- Check Cloudflare Functions logs
- Test with different SMTP providers

### Deployment Issues
- Check GitHub Actions logs
- Verify Cloudflare API token permissions
- Ensure account ID is correct

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Test production build locally
npx serve out
```

## Security Notes

- ✅ All sensitive data stored in GitHub Secrets
- ✅ SMTP credentials encrypted with Wrangler secrets
- ✅ CORS properly configured for contact form
- ✅ Input validation on all form fields
- ✅ Rate limiting recommended for production

## Support

If you encounter issues:

1. **Check logs** in Cloudflare Dashboard → Functions
2. **Review build logs** in GitHub Actions
3. **Test locally** with `npm run build && npx serve out`
4. **Contact Cloudflare Support** for platform-specific issues

Happy deploying! 🚀
