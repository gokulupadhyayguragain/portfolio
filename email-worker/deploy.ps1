# Portfolio Email Worker Deployment Script

param(
    [switch]$Production
)

Write-Host "🚀 Deploying Portfolio Email Worker..." -ForegroundColor Green

# Check if wrangler is installed
try {
    $null = Get-Command wrangler -ErrorAction Stop
    Write-Host "✅ Wrangler CLI found" -ForegroundColor Green
}
catch {
    Write-Host "❌ Wrangler CLI not found. Please install it:" -ForegroundColor Red
    Write-Host "npm install -g wrangler" -ForegroundColor Yellow
    exit 1
}

# Check if user is logged in
try {
    $whoami = wrangler whoami 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "🔐 Please login to Cloudflare..." -ForegroundColor Yellow
        wrangler auth login
    } else {
        Write-Host "✅ Logged in to Cloudflare" -ForegroundColor Green
    }
}
catch {
    Write-Host "🔐 Please login to Cloudflare..." -ForegroundColor Yellow
    wrangler auth login
}

# Deploy
Write-Host "📦 Deploying worker..." -ForegroundColor Blue

if ($Production) {
    Write-Host "Deploying to production environment..." -ForegroundColor Yellow
    wrangler deploy --env production
} else {
    Write-Host "Deploying to development environment..." -ForegroundColor Yellow
    wrangler deploy
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Worker deployed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Set up email service secrets:" -ForegroundColor White
    Write-Host "   wrangler secret put RESEND_API_KEY" -ForegroundColor Yellow
    Write-Host "   # OR" -ForegroundColor Gray
    Write-Host "   wrangler secret put SMTP2GO_API_KEY" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "2. Update your portfolio contact form to use the worker URL" -ForegroundColor White
    Write-Host "3. Test the contact form on your live site" -ForegroundColor White
    Write-Host ""
    Write-Host "🔗 Worker URL will be shown in the deployment output above" -ForegroundColor Cyan
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}
