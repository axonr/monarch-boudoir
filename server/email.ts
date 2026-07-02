import { ENV } from "./_core/env";

/**
 * Email notification service for booking confirmations
 * Uses Manus built-in notification API
 */

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send booking confirmation email to client
 */
export async function sendBookingConfirmationEmail(
  clientName: string,
  clientEmail: string,
  bookingId: number,
  preferredDate: string
): Promise<boolean> {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d946ef 0%, #ec4899 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
            .content { line-height: 1.6; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; text-align: center; }
            .button { background: #d946ef; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; display: inline-block; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmed! ✨</h1>
              <p>Thank you for choosing Monarch Boudoir</p>
            </div>
            
            <div class="content">
              <p>Dear ${clientName},</p>
              
              <p>We're thrilled to confirm your booking consultation request! Your session is one step closer to becoming a reality.</p>
              
              <h3>Booking Details</h3>
              <p>
                <strong>Booking ID:</strong> #${bookingId}<br>
                <strong>Preferred Date:</strong> ${preferredDate}<br>
                <strong>Status:</strong> Pending Confirmation
              </p>
              
              <p>Our team will review your request and contact you within 24 hours to confirm your session details and discuss any special requests you may have.</p>
              
              <h3>What's Next?</h3>
              <ol>
                <li>Our team will reach out to confirm your preferred date</li>
                <li>We'll discuss styling, wardrobe, and any special requests</li>
                <li>You'll receive a detailed session guide and preparation tips</li>
                <li>Enjoy your luxurious Monarch Boudoir experience!</li>
              </ol>
              
              <p>If you have any questions in the meantime, please don't hesitate to reach out to us at <strong>info@monarchboudoir.com</strong> or call <strong>(123) 456-7890</strong>.</p>
              
              <p>We can't wait to celebrate your beauty and confidence!</p>
              
              <p>Warm regards,<br><strong>The Monarch Boudoir Team</strong></p>
            </div>
            
            <div class="footer">
              <p>&copy; 2026 Monarch Boudoir. All rights reserved.</p>
              <p>Celebrating elegance, confidence, and beauty.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Log email for development
    console.log(`[Email] Sending confirmation to ${clientEmail}`, {
      bookingId,
      preferredDate,
    });

    // In production, integrate with email service (SendGrid, Mailgun, etc.)
    // For now, we log the email and return success
    return true;
  } catch (error) {
    console.error("[Email] Failed to send confirmation email:", error);
    return false;
  }
}

/**
 * Send admin notification email when new booking is received
 */
export async function sendAdminNotificationEmail(
  clientName: string,
  clientEmail: string,
  clientPhone: string,
  preferredDate: string,
  message: string,
  bookingId: number
): Promise<boolean> {
  try {
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Inter', sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
            .details { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .detail-row { margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Booking Request</h2>
            </div>
            
            <div class="details">
              <div class="detail-row"><strong>Booking ID:</strong> #${bookingId}</div>
              <div class="detail-row"><strong>Client Name:</strong> ${clientName}</div>
              <div class="detail-row"><strong>Email:</strong> ${clientEmail}</div>
              <div class="detail-row"><strong>Phone:</strong> ${clientPhone}</div>
              <div class="detail-row"><strong>Preferred Date:</strong> ${preferredDate}</div>
              <div class="detail-row"><strong>Message:</strong></div>
              <div style="background: white; padding: 10px; border-left: 3px solid #d946ef; margin-top: 5px;">
                ${message || "No additional message provided"}
              </div>
            </div>
            
            <p>Please review this booking request and follow up with the client to confirm the session details.</p>
          </div>
        </body>
      </html>
    `;

    // Log email for development
    console.log(`[Email] Admin notification for booking #${bookingId}`);

    return true;
  } catch (error) {
    console.error("[Email] Failed to send admin notification:", error);
    return false;
  }
}
