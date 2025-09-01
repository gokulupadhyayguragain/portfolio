export async function onRequestPost(context) {
  const { request, env } = context;
  
  try {
    // Parse the incoming request
    const { name, email, message, subject } = await request.json();
    
    // Validate required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Prepare email content
    const emailContent = {
      from: env.SMTP_USER || 'noreply@addtocloud.tech',
      to: 'gokul@addtocloud.tech',
      subject: subject || `Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #EC4899; border-bottom: 2px solid #EC4899; padding-bottom: 10px;">
            New Portfolio Contact Message
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border-left: 4px solid #EC4899; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              This message was sent from your portfolio contact form
            </p>
            <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
              <strong>Timestamp:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      text: `
Portfolio Contact Message

Name: ${name}
Email: ${email}
Subject: ${subject || 'General Inquiry'}

Message:
${message}

Sent at: ${new Date().toLocaleString()}
      `
    };
    
    // Send email using SMTP (works with multiple providers)
    let emailSent = false;
    let emailResponse;
    
    // Try direct email sending via Zoho Mail API (if available) or fallback to SendGrid
    // For Zoho, we'll use a webhook-based approach since Cloudflare Workers don't support SMTP directly
    
    if (env.ZOHO_SMTP_PASSWORD) {
      try {
        // Create a simple email payload that can be sent via webhook or API
        const emailPayload = {
          to: 'gokul@addtocloud.tech',
          from: env.ZOHO_SMTP_USER || 'gokul@addtocloud.tech',
          replyTo: email,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
          timestamp: new Date().toISOString(),
          source: 'portfolio-contact-form'
        };
        
        // For now, we'll use SendGrid as the primary service since it's more reliable in Cloudflare Workers
        // You can later add a Zoho integration if needed
        console.log('Using primary email service...');
        
        emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.SMTP_PASSWORD || env.ZOHO_SMTP_PASSWORD}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: 'gokul@addtocloud.tech', name: 'Gokul Upadhyay Guragain' }],
              subject: emailContent.subject
            }],
            from: { 
              email: 'contact@addtocloud.tech',
              name: 'Portfolio Contact Form'
            },
            reply_to: {
              email: email,
              name: name
            },
            content: [
              {
                type: 'text/html',
                value: emailContent.html
              },
              {
                type: 'text/plain',
                value: emailContent.text
              }
            ]
          })
        });
        
        if (emailResponse.ok) {
          emailSent = true;
          console.log('Email sent successfully');
        }
        
      } catch (error) {
        console.error('Email service error:', error);
      }
    }
    
    // Fallback: Try generic SMTP if SendGrid fails
    if (!emailSent && env.SMTP_HOST) {
      try {
        // Use a more generic email service
        const fallbackResponse = await fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service_id: 'default_service',
            template_id: 'template_contact',
            user_id: env.EMAILJS_USER_ID || 'fallback',
            template_params: {
              to_email: 'gokul@addtocloud.tech',
              from_name: name,
              from_email: email,
              subject: emailContent.subject,
              message: emailContent.text
            }
          })
        });
        
        if (fallbackResponse.ok) {
          emailSent = true;
        }
      } catch (error) {
        console.error('Fallback email error:', error);
      }
    }
    
    if (!emailSent) {
      throw new Error('All email services failed');
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Message sent successfully!' 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to send message. Please try again later.' 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Handle CORS preflight requests
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
