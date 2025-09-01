# Gokul's Portfolio

A modern, anime-themed portfolio website built with Next.js, featuring interactive 3D elements, smooth animations, and a fully functional contact form.

## ✨ Features

- **Modern Design**: Anime-themed UI with light/dark mode toggle
- **Interactive 3D Elements**: Three.js powered animations and effects
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Contact Form**: Fully functional email sending with multiple service options
- **Performance Optimized**: Fast loading with Next.js optimizations
- **Accessible**: Built with accessibility best practices

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/gokulupadhyayguragain/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Add your email service API key to .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Email Setup

The contact form supports multiple email services. Choose one:

### Option 1: Resend (Recommended)
- Create account at [resend.com](https://resend.com)
- Add and verify domain `addtocloud.tech`
- Get API key and add to `.env.local`:
  ```
  RESEND_API_KEY=re_your_api_key_here
  ```

### Option 2: EmailJS
- Create account at [emailjs.com](https://www.emailjs.com/)
- Set up service and template
- Add credentials to `.env.local`

### Option 3: SMTP2GO
- Create account at [smtp2go.com](https://www.smtp2go.com/)
- Get API key and add to `.env.local`

See [EMAIL_SETUP.md](./EMAIL_SETUP.md) for detailed instructions.

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **3D Graphics**: Three.js
- **Email**: Resend/EmailJS/SMTP2GO
- **Deployment**: Cloudflare Pages
- **Development**: ESLint, PostCSS

## 📁 Project Structure

```
src/
├── app/
│   ├── api/contact/         # Contact form API endpoint
│   ├── globals.css          # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Home page
├── components/
│   ├── Contact.js          # Contact form component
│   ├── Projects.js         # Projects showcase
│   ├── Skills.js           # Skills section
│   └── ...                 # Other components
└── contexts/
    └── ThemeContext.js     # Theme management
```

## 🚀 Deployment

### Cloudflare Pages (Current)
```bash
npm run build
npm run deploy
```

### Set up environment variables in Cloudflare:
```bash
# Using wrangler CLI
wrangler pages secret put RESEND_API_KEY --project-name portfolio
```

### Other platforms:
- **Vercel**: Connect GitHub repo, add environment variables
- **Netlify**: Connect GitHub repo, add environment variables
- **GitHub Pages**: Use GitHub Actions workflow

## 🧪 Testing

### Test contact form locally:
1. Add API key to `.env.local`
2. Run `npm run dev`
3. Fill out contact form
4. Check console for success/error messages

### Test email delivery:
1. Use the EmailTest component (development only)
2. Check spam folder if emails don't arrive
3. Verify domain DNS settings for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add some feature'`
5. Push: `git push origin feature-name`
6. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: gokul@addtocloud.tech
- **LinkedIn**: [gokulupadhyayguragain](https://www.linkedin.com/in/gokulupadhyayguragain/)
- **GitHub**: [gokulupadhyayguragain](https://github.com/gokulupadhyayguragain)

---

Built with ❤️ by [Gokul Upadhyay](https://github.com/gokulupadhyayguragain)
