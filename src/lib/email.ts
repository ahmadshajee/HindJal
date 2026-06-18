import nodemailer from "nodemailer";
import path from "path";

type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

type OrderData = {
  orderId: string;
  customerName: string;
  email: string;
  mobileNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: OrderItem[];
  totalAmount: number;
  notes?: string;
  paymentMethod: string;
};

export async function sendOrderConfirmation(order: OrderData) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn("Gmail credentials not found in environment variables. Email confirmation skipped.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price * item.quantity}</td>
    </tr>
  `
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #f7fafe; padding: 25px 20px; text-align: center; border-bottom: 1px solid #e8f4ff;">
        <img src="cid:logo_fulltext" alt="Hind Jal Logo" style="max-height: 48px; max-width: 100%; display: block; margin: 0 auto 8px;" />
        <p style="margin: 0; color: #1d7edc; font-weight: bold; font-size: 14px; letter-spacing: 0.05em; text-transform: uppercase;">Order Confirmation</p>
      </div>
      <div style="padding: 20px; line-height: 1.6;">
        <p>Dear ${order.customerName},</p>
        <p>Thank you for choosing Hind Jal! We have successfully received your order request.</p>
        
        <div style="background-color: #e8f4ff; border-left: 4px solid #1d7edc; padding: 15px; border-radius: 4px; margin: 20px 0; color: #0d47a1;">
          <strong>Quick Response Promise:</strong> A dedicated support manager is preparing your dispatch right now. We will call you at <strong>${order.mobileNumber}</strong> in <strong>less than 30 minutes</strong> to coordinate delivery.
        </div>
        
        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">Order Details</h3>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod.toUpperCase()}</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <thead>
            <tr style="background-color: #f9f9f9;">
              <th style="padding: 10px; border-bottom: 1px solid #ddd; text-align: left;">Item</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd; text-align: center;">Qty</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">Price</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 10px; text-align: right; font-weight: bold;">Grand Total:</td>
              <td style="padding: 10px; text-align: right; font-weight: bold; color: #1d7edc; font-size: 16px;">₹${order.totalAmount}</td>
            </tr>
          </tfoot>
        </table>

        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">Delivery Address</h3>
        <p style="margin: 0;">${order.address.street}</p>
        <p style="margin: 0;">${order.address.city}, ${order.address.state} ${order.address.pincode}</p>
        <p style="margin: 5px 0 0;"><strong>Phone:</strong> ${order.mobileNumber}</p>
        
        ${order.notes ? `<p style="margin-top: 15px;"><strong>Notes:</strong> ${order.notes}</p>` : ""}
      </div>
      <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 0;">If you have any questions, please contact us at hindjalpatna@gmail.com</p>
      </div>
    </div>
  `;

  const text = `
Dear ${order.customerName},

Thank you for choosing Hind Jal! We have successfully received your order request.

Quick Response Promise:
A dedicated support manager is preparing your dispatch right now. We will call you at ${order.mobileNumber} in less than 30 minutes to coordinate delivery.

Order Details:
-------------------------------------------
Order ID: ${order.orderId}
Payment Method: ${order.paymentMethod.toUpperCase()}

Items Ordered:
${order.items
  .map(
    (item) =>
      `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price} each (Total: ₹${item.price * item.quantity})`
  )
  .join("\n")}

Grand Total: ₹${order.totalAmount}
-------------------------------------------

Delivery Address:
${order.address.street}
${order.address.city}, ${order.address.state} ${order.address.pincode}
Phone: ${order.mobileNumber}
${order.notes ? `\nNotes: ${order.notes}` : ""}

If you have any questions, please contact us at ${user}.

Best regards,
Hind Jal Team
`.trim();

  const mailOptions = {
    from: `"Hind Jal" <${user}>`,
    to: order.email, // Customer email
    replyTo: user, // Direct replies to the admin
    subject: `Order Confirmation - ${order.orderId}`,
    text,
    html,
    attachments: [
      {
        filename: "logo-fulltext.png",
        path: path.join(process.cwd(), "public/logo-fulltext.png"),
        cid: "logo_fulltext",
        disposition: "inline",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent successfully for ${order.orderId}`);
  } catch (error) {
    console.error(`Failed to send order confirmation email for ${order.orderId}:`, error);
  }
}

export async function sendCompanyNotification(order: OrderData) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn("Gmail credentials not found in environment variables. Company notification skipped.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right; font-weight: bold;">₹${item.price * item.quantity}</td>
    </tr>
  `
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
      <div style="background-color: #102033; padding: 25px 20px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 20px; letter-spacing: 0.05em; text-transform: uppercase;">[New Order Alert]</h2>
        <p style="margin: 5px 0 0; opacity: 0.8; font-size: 13px;">Order ID: ${order.orderId}</p>
      </div>
      <div style="padding: 25px;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;"><strong>Customer Name:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;">${order.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Mobile Number:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold;"><a href="tel:${order.mobileNumber}">${order.mobileNumber}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Email Address:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><a href="mailto:${order.email}">${order.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Payment Method:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-transform: uppercase; font-weight: bold; color: #2e7d32;">${order.paymentMethod}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Address:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; line-height: 1.4;">
              ${order.address.street}<br/>
              ${order.address.city}, ${order.address.state} ${order.address.pincode}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #666;"><strong>Delivery Notes:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-style: italic; color: #555;">${order.notes || "None"}</td>
          </tr>
        </table>

        <h3 style="margin: 0 0 10px; font-size: 16px; border-bottom: 2px solid #102033; padding-bottom: 5px; color: #102033;">Items Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <thead>
            <tr style="background-color: #f7f9fb; text-align: left;">
              <th style="padding: 10px; border-bottom: 1px solid #ddd; color: #666;">Item</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd; color: #666; text-align: center;">Qty</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd; color: #666; text-align: right;">Price</th>
              <th style="padding: 10px; border-bottom: 1px solid #ddd; color: #666; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 15px 10px 10px; text-align: right; font-weight: bold; font-size: 16px;">Grand Total:</td>
              <td style="padding: 15px 10px 10px; text-align: right; font-weight: bold; font-size: 16px; color: #0d47a1;">₹${order.totalAmount}</td>
            </tr>
          </tfoot>
        </table>

        <div style="background-color: #e8f5e9; border-left: 4px solid #2e7d32; padding: 15px; border-radius: 4px; font-size: 13px; color: #1b5e20; margin-top: 20px;">
          <strong>Next Action Required:</strong> Contact the client at <a href="tel:${order.mobileNumber}" style="color: #2e7d32; font-weight: bold;">${order.mobileNumber}</a> within 30 minutes to confirm order request and schedule dispatch.
        </div>
      </div>
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #eee;">
        This is an automated system notification for Hind Jal orders database.
      </div>
    </div>
  `;

  const text = `
=============================================
[NEW ORDER ALERT] - Hind Jal
=============================================
Order ID: ${order.orderId}
Status: New Request Received

CUSTOMER INFORMATION:
---------------------
Name: ${order.customerName}
Phone: ${order.mobileNumber}
Email: ${order.email}
Payment: ${order.paymentMethod.toUpperCase()}

SHIPPING ADDRESS:
-----------------
Street: ${order.address.street}
City/State/Pincode: ${order.address.city}, ${order.address.state} ${order.address.pincode}

ORDER ITEMS:
------------
${order.items
  .map(
    (item) =>
      `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price} each (Total: ₹${item.price * item.quantity})`
  )
  .join("\n")}

Grand Total: ₹${order.totalAmount}
Notes: ${order.notes || "None"}

---------------------
ACTION REQUIRED: Contact customer at ${order.mobileNumber} immediately to arrange delivery.
=============================================
`.trim();

  const mailOptions = {
    from: `"Hind Jal Orders" <${user}>`,
    to: user, // Sends to company mail
    replyTo: order.email, // Replies go to the customer
    subject: `[New Order Alert] - ${order.customerName} (${order.orderId})`,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Company notification email sent successfully for ${order.orderId}`);
  } catch (error) {
    console.error(`Failed to send company notification email for ${order.orderId}:`, error);
  }
}

export async function sendWelcomeEmail(email: string, customerName: string) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    console.warn("Gmail credentials not found in environment variables. Welcome email skipped.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #f7fafe; padding: 25px 20px; text-align: center; border-bottom: 1px solid #e8f4ff;">
        <img src="cid:logo_fulltext" alt="Hind Jal Logo" style="max-height: 48px; max-width: 100%; display: block; margin: 0 auto 8px;" />
        <p style="margin: 0; color: #1d7edc; font-weight: bold; font-size: 14px; letter-spacing: 0.05em; text-transform: uppercase;">Welcome to Hind Jal!</p>
      </div>
      <div style="padding: 30px; line-height: 1.6;">
        <p>Dear ${customerName},</p>
        <p>We are absolutely thrilled to welcome you to the <strong>Hind Jal</strong> family!</p>
        <p>At Hind Jal, we are dedicated to providing the highest quality products and services. We're glad to have you on board with us.</p>
        <p>If you have any questions, feedback, or need assistance, feel free to reply directly to this email or reach out to us at <a href="mailto:${user}" style="color: #0d47a1; text-decoration: none;">${user}</a>.</p>
        <br/>
        <p style="margin: 0;">Best regards,</p>
        <p style="margin: 5px 0 0; font-weight: bold; color: #0d47a1;">The Hind Jal Team</p>
      </div>
      <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 12px; color: #777;">
        <p style="margin: 0;">This email was sent to ${email} by Hind Jal.</p>
      </div>
    </div>
  `;

  const text = `
Dear ${customerName},

Welcome to the Hind Jal family!

We are absolutely thrilled to welcome you to Hind Jal. We are dedicated to providing the highest quality products and services, and we're glad to have you on board with us.

If you have any questions, feedback, or need assistance, feel free to reply directly to this email or reach out to us at ${user}.

Best regards,
The Hind Jal Team
`.trim();

  const mailOptions = {
    from: `"Hind Jal" <${user}>`,
    to: email,
    replyTo: user,
    subject: `Welcome to Hind Jal!`,
    text,
    html,
    attachments: [
      {
        filename: "logo-fulltext.png",
        path: path.join(process.cwd(), "public/logo-fulltext.png"),
        cid: "logo_fulltext",
        disposition: "inline",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent successfully to ${email}`);
  } catch (error) {
    console.error(`Failed to send welcome email to ${email}:`, error);
  }
}
