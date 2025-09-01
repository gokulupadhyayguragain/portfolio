# Email Service Setup Script for Cloudflare Pages
# Run this script to set up environment variables for your email service

param(
    [Parameter(Mandatory=$true)]
    [string]$EmailService,
    
    [Parameter(Mandatory=$false)]
    [string]$ProjectName = "portfolio"
)

Write-Host "Setting up email service: $EmailService for project: $ProjectName" -ForegroundColor Green

switch ($EmailService.ToLower()) {
    "zoho" {
        Write-Host "`nZoho SMTP Setup (Recommended - your existing email):" -ForegroundColor Yellow
        Write-Host "1. Use your existing Zoho Mail account credentials"
        Write-Host "2. Make sure IMAP/SMTP is enabled in Zoho Mail settings"
        Write-Host "3. Use an App Password (recommended) instead of your main password"
        Write-Host "4. Run the following commands with your actual credentials:"
        Write-Host ""
        Write-Host "wrangler pages secret put ZOHO_SMTP_HOST --project-name $ProjectName" -ForegroundColor Cyan
        Write-Host "wrangler pages secret put ZOHO_SMTP_PORT --project-name $ProjectName" -ForegroundColor Cyan
        Write-Host "wrangler pages secret put ZOHO_SMTP_USER --project-name $ProjectName" -ForegroundColor Cyan
        Write-Host "wrangler pages secret put ZOHO_SMTP_PASSWORD --project-name $ProjectName" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Typical values:" -ForegroundColor Green
        Write-Host "  Host: smtp.zoho.com"
        Write-Host "  Port: 587"
        Write-Host "  User: your_email@addtocloud.tech"
        Write-Host "  Password: your_app_password"
    }
    
    "resend" {
        Write-Host "`nResend Setup:" -ForegroundColor Yellow
        Write-Host "1. Go to https://resend.com and create an account"
        Write-Host "2. Add and verify your domain 'addtocloud.tech'"
        Write-Host "3. Create an API key"
        Write-Host "4. Run the following command with your actual API key:"
        Write-Host ""
        Write-Host "wrangler pages secret put RESEND_API_KEY --project-name $ProjectName" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "When prompted, enter your Resend API key (starts with 're_')"
    }
    
    "emailjs" {
        Write-Host "`nEmailJS Setup:" -ForegroundColor Yellow
        Write-Host "1. Go to https://www.emailjs.com and create an account"
        Write-Host "2. Create a service (Gmail, Outlook, etc.)"
        Write-Host "3. Create an email template"
        Write-Host "4. Run the following commands with your actual values:"
        Write-Host ""
        Write-Host "wrangler pages secret put EMAILJS_SERVICE_ID --project-name $ProjectName" -ForegroundColor Cyan
        Write-Host "wrangler pages secret put EMAILJS_TEMPLATE_ID --project-name $ProjectName" -ForegroundColor Cyan
        Write-Host "wrangler pages secret put EMAILJS_PUBLIC_KEY --project-name $ProjectName" -ForegroundColor Cyan
        Write-Host "wrangler pages secret put EMAILJS_PRIVATE_KEY --project-name $ProjectName" -ForegroundColor Cyan
    }
    
    "smtp2go" {
        Write-Host "`nSMTP2GO Setup:" -ForegroundColor Yellow
        Write-Host "1. Go to https://www.smtp2go.com and create an account"
        Write-Host "2. Get your API key from the dashboard"
        Write-Host "3. Run the following command with your actual API key:"
        Write-Host ""
        Write-Host "wrangler pages secret put SMTP2GO_API_KEY --project-name $ProjectName" -ForegroundColor Cyan
    }
    
    default {
        Write-Host "Unknown email service: $EmailService" -ForegroundColor Red
        Write-Host "Available options: zoho, resend, emailjs, smtp2go" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Recommended setup order:" -ForegroundColor Green
        Write-Host "1. zoho (use your existing Zoho Mail setup)"
        Write-Host "2. resend (modern API, great for development)"
        Write-Host "3. emailjs (client-side service)"
        Write-Host "4. smtp2go (alternative SMTP service)"
        exit 1
    }
}

Write-Host "`nAfter setting up the secrets, deploy your site:" -ForegroundColor Green
Write-Host "npm run build && npm run deploy" -ForegroundColor Cyan

Write-Host "`nTo test locally:" -ForegroundColor Green
Write-Host "1. Add your API key to .env.local"
Write-Host "2. Run 'npm run dev'"
Write-Host "3. Test the contact form at http://localhost:3000"
