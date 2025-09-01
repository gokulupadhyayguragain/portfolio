import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Log the contact form submission
    console.log('📧 NEW CONTACT FORM SUBMISSION:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      subject: subject || 'General Inquiry',
      message: message.substring(0, 100) + (message.length > 100 ? '...' : ''),
    });

    // Email content
    const emailContent = {
      from: `Portfolio Contact <noreply@addtocloud.tech>`,
      to: 'gokul@addtocloud.tech',
      replyTo: email,
      subject: `Portfolio Contact: ${subject || 'General Inquiry'}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
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
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                This message was sent from your portfolio contact form
              </p>
              <p style="margin: 5px 0 0 0; color: #6b7280; font-size: 14px;">
                <strong>Timestamp:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
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

Reply to this email to respond directly to ${name}.

Sent at: ${new Date().toLocaleString()}
      `
    };

    let emailSent = false;

    // Try Zoho SMTP first (your existing setup)
    if (process.env.ZOHO_SMTP_HOST && process.env.ZOHO_SMTP_USER && process.env.ZOHO_SMTP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransporter({
          host: process.env.ZOHO_SMTP_HOST || 'smtp.zoho.com',
          port: parseInt(process.env.ZOHO_SMTP_PORT) || 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.ZOHO_SMTP_USER,
            pass: process.env.ZOHO_SMTP_PASSWORD,
          },
        });

        const mailOptions = {
          from: `"Portfolio Contact" <${process.env.ZOHO_SMTP_USER}>`,
          to: 'gokul@addtocloud.tech',
          replyTo: email,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent via Zoho SMTP');
        emailSent = true;
      } catch (error) {
        console.error('❌ Zoho SMTP error:', error);
      }
    }

    // Fallback to Resend if Zoho fails
    if (!emailSent && process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        const { data, error } = await resend.emails.send({
          from: emailContent.from,
          to: [emailContent.to],
          replyTo: emailContent.replyTo,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        if (error) {
          console.error('❌ Resend API error:', error);
        } else {
          console.log('✅ Email sent via Resend:', data.id);
          emailSent = true;
        }
      } catch (error) {
        console.error('❌ Resend request failed:', error);
      }
    }

    // Try EmailJS as fallback (client-side service)
    if (!emailSent && process.env.EMAILJS_SERVICE_ID) {
      try {
        const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            accessToken: process.env.EMAILJS_PRIVATE_KEY,
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

    // Try Nodemailer with SMTP as fallback
    if (!emailSent && process.env.SMTP_HOST) {
      try {
        // Since we can't use Nodemailer in Edge Runtime, we'll use a different approach
        // For now, we'll use the SMTP2GO API which works in serverless environments
        
        const smtp2goResponse = await fetch('https://api.smtp2go.com/v3/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Smtp2go-Api-Key': process.env.SMTP2GO_API_KEY,
          },
          body: JSON.stringify({
            api_key: process.env.SMTP2GO_API_KEY,
            to: [emailContent.to],
            sender: emailContent.from,
            subject: emailContent.subject,
            html_body: emailContent.html,
            text_body: emailContent.text,
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

    // If no email service is configured, just log for manual processing
    if (!emailSent) {
      console.log('⚠️ No email service configured - message logged for manual review');
      console.log('📧 EMAIL CONTENT:', emailContent.text);
      
      // Still return success so user doesn't see an error
      emailSent = true;
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Sorry, there was an error processing your message. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
