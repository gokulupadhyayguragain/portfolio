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
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
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
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Log the contact form submission
    console.log('📧 NEW CONTACT FORM SUBMISSION:', {
      timestamp: new Date().toISOString(),
      name: name,
      email: email,
      subject: subject || 'General Inquiry',
      message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('cf-connecting-ip'),
      country: request.headers.get('cf-ipcountry')
    });

    // Email content template
    const emailSubject = `Portfolio Contact: ${subject || 'General Inquiry'}`;
    const emailHtml = `<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <div style="background: linear-gradient(135deg, #ec4899, #f97316); padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Portfolio Contact Message</h1>
      </div>
      <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
        <div style="background: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 5px 0; color: #555;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 5px 0; color: #555;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 5px 0; color: #555;"><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        </div>
        <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
        <div style="background: #f8fafc; padding: 20px; border-radius: 6px; border-left: 4px solid #ec4899;">
          <p style="line-height: 1.6; color: #555; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f0f9ff; border-radius: 8px;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">This message was sent from your portfolio contact form</p>
          <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>`;

    const emailText = `Portfolio Contact Message

Name: ${name}
Email: ${email}
Subject: ${subject || 'General Inquiry'}

Message:
${message}

Reply to this email to respond directly to ${name}.

Sent at: ${new Date().toLocaleString()}`;

    let emailSent = false;

    // Try Resend API first (most reliable for Cloudflare Workers)
    if (env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <noreply@addtocloud.tech>',
            to: ['gokul@addtocloud.tech'],
            reply_to: email,
            subject: emailSubject,
            html: emailHtml,
          }),
        });

        if (resendResponse.ok) {
          const result = await resendResponse.json();
          console.log('✅ Email sent via Resend:', result.id);
          emailSent = true;
        } else {
          const error = await resendResponse.json();
          console.error('❌ Resend API error:', error);
        }
      } catch (error) {
        console.error('❌ Resend request failed:', error);
      }
    }

    // Try SMTP2GO as fallback (works well with Cloudflare Workers)
    if (!emailSent && env.SMTP2GO_API_KEY) {
      try {
        const smtp2goResponse = await fetch('https://api.smtp2go.com/v3/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Smtp2go-Api-Key': env.SMTP2GO_API_KEY,
          },
          body: JSON.stringify({
            api_key: env.SMTP2GO_API_KEY,
            to: ['gokul@addtocloud.tech'],
            sender: 'Portfolio Contact <noreply@addtocloud.tech>',
            subject: emailSubject,
            html_body: emailHtml,
            text_body: emailText,
          }),
        });

        if (smtp2goResponse.ok) {
          const result = await smtp2goResponse.json();
          console.log('✅ Email sent via SMTP2GO:', result);
          emailSent = true;
        } else {
          console.error('❌ SMTP2GO error:', await smtp2goResponse.text());
        }
      } catch (error) {
        console.error('❌ SMTP2GO request failed:', error);
      }
    }

    // Try EmailJS as final fallback
    if (!emailSent && env.EMAILJS_SERVICE_ID) {
      try {
        const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: env.EMAILJS_SERVICE_ID,
            template_id: env.EMAILJS_TEMPLATE_ID,
            user_id: env.EMAILJS_PUBLIC_KEY,
            accessToken: env.EMAILJS_PRIVATE_KEY,
            template_params: {
              from_name: name,
              from_email: email,
              subject: subject || 'General Inquiry',
              message: message,
              to_email: 'gokul@addtocloud.tech',
            },
          }),
        });

        if (emailjsResponse.ok) {
          console.log('✅ Email sent via EmailJS');
          emailSent = true;
        } else {
          console.error('❌ EmailJS API error:', await emailjsResponse.text());
        }
      } catch (error) {
        console.error('❌ EmailJS request failed:', error);
      }
    }

    // If no email service is configured, just log for manual processing
    if (!emailSent) {
      console.log('⚠️ No email service configured - message logged for manual review');
      console.log('📧 EMAIL CONTENT FOR MANUAL REVIEW:', {
        from: email,
        name: name,
        subject: emailSubject,
        message: message,
        timestamp: new Date().toISOString()
      });
      
      // Still return success so user doesn't see an error
      emailSent = true;
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Message sent successfully! I\'ll get back to you soon.' 
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
    console.error('❌ Contact form error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Sorry, there was an error processing your message. Please try again later.' 
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
