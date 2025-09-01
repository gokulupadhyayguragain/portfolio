export default {
  async fetch(request, env, ctx) {
    // CORS headers - more permissive for testing
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
      'Access-Control-Max-Age': '86400',
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

      // Create email content for notification
      const notificationEmail = createNotificationEmail(name, email, subject, message);
      
      // Create auto-reply email for sender
      const autoReplyEmail = createAutoReplyEmail(name, email, subject);

      // Try to send both emails using Resend
      const notificationResult = await sendEmailWithResend(notificationEmail, env, 'notification');
      const autoReplyResult = await sendEmailWithResend(autoReplyEmail, env, 'autoreply');

      if (notificationResult.success || autoReplyResult.success) {
        console.log('✅ Email results:', {
          notification: notificationResult,
          autoReply: autoReplyResult
        });
        
        let responseMessage = 'Thank you for your message!';
        if (notificationResult.success && autoReplyResult.success) {
          responseMessage = 'Message sent successfully! You should receive a confirmation email shortly.';
        } else if (notificationResult.success) {
          responseMessage = 'Message sent successfully! I\'ll get back to you soon.';
        } else if (autoReplyResult.success) {
          responseMessage = 'Thank you for your message! A confirmation has been sent to your email.';
        }

        return new Response(JSON.stringify({
          success: true,
          message: responseMessage,
          services: {
            notification: notificationResult.service,
            autoReply: autoReplyResult.service
          }
        }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      } else {
        // Return error to user
        console.error('❌ Both emails failed:', {
          notification: notificationResult.error,
          autoReply: autoReplyResult.error
        });
        
        return new Response(JSON.stringify({
          success: false,
          message: 'Failed to send email. Please try again or contact me directly at gokul@addtocloud.tech',
          errors: {
            notification: notificationResult.error,
            autoReply: autoReplyResult.error
          }
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
 * Create notification email content (sent to you)
 */
function createNotificationEmail(name, email, subject, message) {
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
    to: 'notification' // Flag to indicate this goes to you
  };
}

/**
 * Create auto-reply email content (sent to the form submitter)
 */
function createAutoReplyEmail(name, email, subject) {
  const emailSubject = `Thank you for contacting me - Re: ${subject || 'Your message'}`;
  
  const html = `
    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
      <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 20px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">✨ Thank You for Reaching Out!</h1>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-top: 0;">Hi ${name}! 👋</h2>
        
        <p style="line-height: 1.6; color: #555; font-size: 16px;">
          Thank you for reaching out to me through my portfolio! I have successfully received your message and really appreciate you taking the time to get in touch.
        </p>
        
        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 10px;">What happens next?</h3>
          <ul style="color: #555; line-height: 1.6; margin: 0; padding-left: 20px;">
            <li>I will review your message carefully</li>
            <li>I'll get back to you within 24-48 hours</li>
            <li>We can discuss your project or opportunity in detail</li>
          </ul>
        </div>
        
        <p style="line-height: 1.6; color: #555; font-size: 16px;">
          In the meantime, feel free to check out my latest projects on <a href="https://github.com/gokulupadhyayguragain" style="color: #3b82f6; text-decoration: none;">GitHub</a> or connect with me on <a href="https://linkedin.com/in/gokulupadhyayguragain" style="color: #3b82f6; text-decoration: none;">LinkedIn</a>.
        </p>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px;">
          <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: bold;">
            🚀 Looking forward to connecting with you!
          </p>
          <p style="margin: 5px 0 0 0; color: #92400e; font-size: 14px;">
            Best regards,<br>
            <strong>Gokul Upadhyay Guragain</strong><br>
            DevOps Engineer | Cloud Architect
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 6px;">
          <p style="margin: 0; color: #6b7280; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this email.<br>
            If you have urgent questions, contact me directly at gokul@addtocloud.tech
          </p>
        </div>
      </div>
    </div>
  `;

  return {
    subject: emailSubject,
    html: html,
    replyTo: 'gokul@addtocloud.tech',
    to: 'sender' // Flag to indicate this goes to the form submitter
  };
}

/**
 * Send email using Resend API
 */
async function sendEmailWithResend(emailContent, env, type = 'notification') {
  if (!env.RESEND_API_KEY) {
    return { success: false, error: 'Resend API key not configured' };
  }

  try {
    // Determine recipient based on email type
    let toEmail;
    if (type === 'autoreply') {
      // Send auto-reply to the form submitter
      toEmail = emailContent.replyTo;
    } else {
      // Send notification to you
      toEmail = env.TO_EMAIL || 'gokulupadhayaya19@gmail.com';
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Portfolio Contact <${env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
        to: [toEmail],
        reply_to: emailContent.replyTo,
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ ${type} email sent via Resend:`, result.id);
      return { success: true, service: `Resend API (${type})`, id: result.id };
    } else {
      const error = await response.text();
      console.log(`❌ Resend ${type} failed:`, error);
      return { success: false, error: `Resend API error: ${error}` };
    }
  } catch (error) {
    console.log(`❌ Resend ${type} error:`, error.message);
    return { success: false, error: `Resend connection error: ${error.message}` };
  }
}
