#!/bin/bash

# Portfolio Email Worker Deployment Script

echo "🚀 Deploying Portfolio Email Worker..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check if user is logged in
if ! wrangler whoami &> /dev/null; then
    echo "🔐 Please login to Cloudflare..."
    wrangler auth login
fi

echo "📦 Deploying worker..."
wrangler deploy

echo "✅ Worker deployed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Set up email service secrets:"
echo "   wrangler secret put RESEND_API_KEY"
echo "   # OR"
echo "   wrangler secret put SMTP2GO_API_KEY"
echo ""
echo "2. Update your portfolio contact form to use the worker URL"
echo "3. Test the contact form on your live site"
echo ""
echo "🔗 Worker URL: https://portfolio-email-worker.your-subdomain.workers.dev"
