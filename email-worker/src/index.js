export default {
  async fetch(request, env, ctx) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.CORS_ORIGIN || '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Method not allowed' 
      }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    try {
      // Parse the incoming request
      const { name, email, message, subject } = await request.json();

      // Validate required fields
      if (!name || !email || !message) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Missing required fields: name, email, and message are required' 
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }

      // Create email content
      const emailContent = createEmailContent(name, email, subject, message);

      // Try to send the email using Resend
      const emailResult = await sendEmailWithResend(emailContent, env);

      if (emailResult.success) {
        console.log('✅ Email sent successfully:', emailResult);
        return new Response(JSON.stringify({
          success: true,
          message: 'Message sent successfully! I\'ll get back to you soon.',
          service: emailResult.service
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      } else {
        // Return error to user
        console.error('❌ Email sending failed:', emailResult.error);
        
        return new Response(JSON.stringify({
          success: false,
          message: 'Failed to send email. Please try again or contact me directly at gokul@addtocloud.tech',
          error: emailResult.error
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }

    } catch (error) {
      console.error('❌ Worker error:', error);
      
      return new Response(JSON.stringify({
        success: false,
        error: 'Internal server error. Please try again later.'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  },
};

/**
 * Create email content
 */
function createEmailContent(name, email, subject, message) {
  const emailSubject = `Portfolio Contact: ${subject || 'General Inquiry'}`;
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <div style="background: linear-gradient(135deg, #ec4899, #f97316); padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">📧 New Portfolio Contact Message</h1>
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
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            This message was sent from your portfolio contact form
          </p>
          <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
            <strong>Timestamp:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  `;

  return {
    subject: emailSubject,
    html: html,
    replyTo: email,
  };
}

/**
 * Send email using Resend API
 */
async function sendEmailWithResend(emailContent, env) {
  if (!env.RESEND_API_KEY) {
    return { success: false, error: 'Resend API key not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Portfolio Contact <${env.FROM_EMAIL || 'gokul@addtocloud.tech'}>`,
        to: [env.TO_EMAIL || 'noreply@addtocloud.tech'],
        reply_to: emailContent.replyTo,
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Email sent via Resend:', result.id);
      return { success: true, service: 'Resend API', id: result.id };
    } else {
      const error = await response.text();
      console.log('❌ Resend failed:', error);
      return { success: false, error: `Resend API error: ${error}` };
    }
  } catch (error) {
    console.log('❌ Resend error:', error.message);
    return { success: false, error: `Resend connection error: ${error.message}` };
  }
}
