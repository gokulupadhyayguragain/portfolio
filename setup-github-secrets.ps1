# GitHub Action Secrets Setup Script
# Run this after authenticating with: gh auth login

Write-Host "Setting up GitHub Action Secrets..." -ForegroundColor Green

# Cloudflare Secrets
Write-Host "Adding Cloudflare secrets..." -ForegroundColor Yellow
gh secret set CLOUDFLARE_API_TOKEN --body "0VjUeBTKaG9pL2VZODIIBlRGmVj3J3nS6Oqw_iQq"
gh secret set CLOUDFLARE_ACCOUNT_ID --body "53e5a5ffc81a032a83bc2f12419485e1"
gh secret set CLOUDFLARE_ZONE_ID --body "a2626d2d93dd45dd399fa883b4be8655"

# SendGrid SMTP Secrets (fallback)
Write-Host "Adding SendGrid SMTP secrets..." -ForegroundColor Yellow
gh secret set SMTP_HOST --body "smtp.sendgrid.net"
gh secret set SMTP_PORT --body "587"
gh secret set SMTP_USER --body "apikey"
# You'll need to replace this with your actual SendGrid API key
# gh secret set SMTP_PASSWORD --body "YOUR_SENDGRID_API_KEY"

# Zoho SMTP Secrets (primary for gokul@addtocloud.tech)
Write-Host "Adding Zoho SMTP secrets..." -ForegroundColor Yellow
gh secret set ZOHO_SMTP_HOST --body "smtp.zoho.com"
gh secret set ZOHO_SMTP_PORT --body "587"
gh secret set ZOHO_SMTP_USER --body "gokul@addtocloud.tech"
# You'll need to replace this with your actual Zoho app password
# gh secret set ZOHO_SMTP_PASSWORD --body "YOUR_ZOHO_APP_PASSWORD"

Write-Host "GitHub Action secrets setup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Set your actual SendGrid API key: gh secret set SMTP_PASSWORD --body 'YOUR_SENDGRID_API_KEY'"
Write-Host "2. Set your Zoho app password: gh secret set ZOHO_SMTP_PASSWORD --body 'YOUR_ZOHO_APP_PASSWORD'"
Write-Host "3. Push your changes to trigger deployment"
Write-Host ""
Write-Host "To create a Zoho app password:" -ForegroundColor Yellow
Write-Host "1. Go to https://accounts.zoho.com/home#security"
Write-Host "2. Enable 2-Factor Authentication if not already enabled"
Write-Host "3. Go to 'App Passwords' section"
Write-Host "4. Generate a new app password for 'Mail'"
Write-Host "5. Use that password in the ZOHO_SMTP_PASSWORD secret"
