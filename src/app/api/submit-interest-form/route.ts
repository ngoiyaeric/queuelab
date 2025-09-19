import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Basic validation functions (can be expanded)
const isValidEmail = (email: string): boolean => {
  return /\S+@\S+\.\S+/.test(email);
};

const isValidIdentity = (identity: string): boolean => {
  return ['Customer', 'Business', 'Open Source Contributor'].includes(identity);
};

const isValidMessage = (message: string): boolean => {
  return message.trim().length > 0 && message.trim().length <= 5000; // Max length 5000 chars
};

const isValidSubmissionContext = (context: string): boolean => {
  if (typeof context !== 'string') return false;
  return context.trim().length > 0 && context.trim().length <= 100; // Max 100 chars
};

export async function POST(request: NextRequest) {
  try {
    const { email, identity, message, submissionContext } = await request.json();

    // --- Server-side Validation ---
    if (!email || !identity || !message || !submissionContext) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ message: 'Invalid email format.' }, { status: 400 });
    }
    if (!isValidIdentity(identity)) {
      return NextResponse.json({ message: 'Invalid identity selected.' }, { status: 400 });
    }
    if (!isValidMessage(message)) {
      return NextResponse.json({ message: 'Message is invalid or too long (max 5000 characters).' }, { status: 400 });
    }
    if (!isValidSubmissionContext(submissionContext)) {
      return NextResponse.json({ message: 'Submission context is missing or invalid.' }, { status: 400 });
    }

    // --- Nodemailer Configuration ---
    // IMPORTANT: Store sensitive credentials in environment variables, not directly in code.
    // For this example, we'll use placeholder values.
    // You'll need to configure an SMTP transporter. This might be Gmail, SendGrid, etc.
    // For Gmail, you might need to "allow less secure app access" or use an "App Password".
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com', // Replace with your SMTP host
      port: Number(process.env.SMTP_PORT || 587), // Replace with your SMTP port
      secure: (process.env.SMTP_SECURE === 'true') || false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'your-email@example.com', // Replace with your email
        pass: process.env.SMTP_PASS || 'your-email-password', // Replace with your email password
      },
      tls: {
        // do not fail on invalid certs for development/testing if needed
        // rejectUnauthorized: process.env.NODE_ENV === 'production',
        ciphers:'SSLv3' // Adjust if necessary, some servers might require specific ciphers
      }
    });


    // Determine a more descriptive subject prefix based on context
    const subjectPrefix = submissionContext.toLowerCase().includes('demo')
      ? "New QCX Demo Request"
      : `New QCX ${submissionContext} Submission`; // Or a more generic fallback if context is varied

    const mailOptions = {
      from: `"QCX Interest Form" <${process.env.SMTP_FROM_EMAIL || email}>`, // Sender address (can be same as SMTP_USER or a "no-reply" address)
      to: 'relations@queue.cx', // Destination email address provided by user
      replyTo: email, // Set reply-to to the user's email
      subject: `${subjectPrefix} from ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Submission: ${submissionContext}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Identity:</strong> ${identity}</p>
          <p><strong>Context:</strong> ${submissionContext}</p> <!-- Added context to email body for clarity -->
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f9f9f9; border: 1px solid #eee; padding: 10px;">${message}</p>
          <hr/>
          <p style="font-size: 0.9em; color: #555;">This email was sent from the QCX website.</p>
        </div>
      `,
    };

    // --- Send Mail ---
    try {
      await transporter.sendMail(mailOptions);
      return NextResponse.json({ message: 'Form submitted successfully! We will be in touch.' }, { status: 200 });
    } catch (mailError: any) {
      console.error('Error sending email:', mailError);
      // It's good practice to check the error type and message for more specific user feedback
      let errorMessage = 'An error occurred while sending your message.';
      if (mailError.code === 'EENVELOPE') {
          errorMessage = "Error with sender/recipient email addresses. Please check and try again.";
      } else if (mailError.code === 'ECONNREFUSED' || mailError.code === 'ETIMEDOUT') {
          errorMessage = "Could not connect to the email server. Please try again later.";
      }
      return NextResponse.json({ message: errorMessage, details: mailError.message || 'No details' }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Error processing request:', error);
    // Check if it's a JSON parsing error or other type
    if (error instanceof SyntaxError) {
        return NextResponse.json({ message: 'Invalid request format.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred on the server.', details: error.message || 'No details' }, { status: 500 });
  }
}
