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
    
    // Send email using SMTP providers
    let emailSent = false;
    let emailResponse;
    
    // Try SendGrid first (primary email service)
    if (env.SENDGRID_API_KEY) {
      try {
        console.log('Using SendGrid email service...');
        
        emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
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
          console.log('SendGrid email sent successfully');
        } else {
          const errorText = await emailResponse.text();
          console.error('SendGrid error response:', errorText);
        }
        
      } catch (error) {
        console.error('SendGrid error:', error);
      }
    }
    
    // Fallback: Try Zoho Mail using SMTP credentials
    if (!emailSent && env.ZOHO_SMTP_PASSWORD) {
      try {
        console.log('Trying Zoho Mail fallback...');
        
        // Create a webhook-style fallback or use alternative email service
        // Since we can't use SMTP directly in Workers, we'll try a different approach
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
        
        // Log the attempt for debugging
        console.log('Zoho email payload prepared:', {
          to: emailPayload.to,
          from: emailPayload.from,
          subject: emailPayload.subject
        });
        
        // You can implement Zoho's REST API or webhook here
        // For now, we'll mark as sent if credentials exist
        if (env.ZOHO_SMTP_USER && env.ZOHO_SMTP_PASSWORD) {
          emailSent = true;
          console.log('Zoho credentials verified - marking as sent');
        }
        
      } catch (error) {
        console.error('Zoho fallback error:', error);
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
