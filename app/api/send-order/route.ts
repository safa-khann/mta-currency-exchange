// app/api/send-order/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Updated validation for multiple items structure
    const requiredFields = [
      'customer_title', 'first_name', 'last_name', 'email', 'mobile',
      'branch_name', 'items', 'payment_method'
    ];
    
    const missingFields = requiredFields.filter(field => !orderData[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      )
    }

    // Validate that items array is not empty
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No items in order' 
        },
        { status: 400 }
      )
    }

    // Validate each item in the array
    for (const [index, item] of orderData.items.entries()) {
      const itemRequiredFields = [
        'currency_code', 'transaction_type', 'gbp_amount', 'foreign_amount', 'exchange_rate'
      ];
      
      const missingItemFields = itemRequiredFields.filter(field => !item[field]);
      
      if (missingItemFields.length > 0) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Item ${index + 1} missing fields: ${missingItemFields.join(', ')}` 
          },
          { status: 400 }
        )
      }
    }

    // Setup Nodemailer transporter (same as before)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Generate order number
    const orderNumber = `ORD-${Date.now().toString().slice(-8)}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Customer email with items array
    const customerHtml = generateCustomerEmailHTML(orderData, orderNumber);
    
    await transporter.sendMail({
      from: `"MTA Currency Exchange" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: orderData.email,
      subject: `✅ Order Confirmation - ${orderNumber}`,
      html: customerHtml,
      attachments: [{
      filename: 'logo-wid.png',
      path: './public/images/logo-wid.png', // Path to your logo
      cid: 'mtalogo' // Same cid value as in the HTML img src
    }]
    });

    // Admin email with items array
    const adminHtml = generateAdminEmailHTML(orderData, orderNumber);
    
    await transporter.sendMail({
      from: `"MTA Currency Exchange" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_FROM || 'mtaworldwidelimited@gmail.com',
      subject: `📋 New Order ${orderNumber}: ${orderData.first_name} ${orderData.last_name} - ${orderData.items.length} item(s)`,
      html: adminHtml,
      attachments: [{
      filename: 'logo-wid.png',
      path: './public/images/logo-wid.png', // Path to your logo
      cid: 'mtalogo' // Same cid value as in the HTML img src
    }]
    });

    return NextResponse.json({
      success: true,
      message: 'Order confirmation sent successfully',
      orderNumber: orderNumber
    });

  } catch (error: any) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send order confirmation. Please try again.' 
      },
      { status: 500 }
    );
  }
}
// Email template functions
function generateCustomerEmailHTML(orderData: any, orderNumber: string): string {
  // Calculate totals
  const totalGBP = orderData.items.reduce((sum: number, item: any) => 
    sum + (item.gbp_amount || 0), 0);
  
  // Generate items table HTML
  const itemsHtml = orderData.items.map((item: any, index: number) => `
    <tr style="border-bottom: 1px solid #eaeaea;">
      <td style="padding: 12px 8px; text-align: center;">${index + 1}</td>
      <td style="padding: 12px 8px;">
        ${item.transaction_type === 'buy' ? 'Buy' : 'Sell'} ${item.currency_code}
        <p style="font-size:10px; color:black;">${item.currency_name}</p>
      </td>
      <td style="padding: 12px 8px; text-align: left;">£${parseFloat(item.gbp_amount).toFixed(2)} </td>
      <td style="padding: 12px 8px; text-align: left;">$${parseFloat(item.foreign_amount).toFixed(2)}</td>
      <td style="padding: 12px 8px; text-align: left;">${parseFloat(item.exchange_rate).toFixed(4)}</td>
    </tr>
  `).join('');
  const hasBuyItems = orderData.items.some((item: any) => item.transaction_type === 'buy');
   let tableHeaders = '';
   if (hasBuyItems) {
    // If only buy transactions
    tableHeaders = `
      <tr>
        <th>#</th>
        <th>Transaction</th>
        <th>You Pay (GBP)</th>
        <th>You Receive (Foreign)</th>
        <th>Exchange Rate</th>
      </tr>
    `;
  } else {
    // If only sell transactions
    tableHeaders = `
      <tr>
        <th>#</th>
        <th>Transaction</th>
        <th>You Receive (GBP)</th>
        <th>You Pay (Foreign)</th>
        <th>Exchange Rate</th>
      </tr>
    `;
  }

  return `
   <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation - MTA Currency Exchange</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f5f5f5;
            padding: 20px;
        }
        
        .email-container {
            max-width: 700px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .email-header {
            background: linear-gradient(45deg, #022b59, #002f8a);
            padding: 25px 30px;
            border-bottom: 1px solid #eaeaea;
            text-align: center;
        }
        
        .logo-container {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-bottom: 15px;
            display: inline-block;
        }
        
        .logo-text {
            margin-left: 12px;
            margin-bottom:10px;
            gap: 0;
            display:inline-block;
        }
        
        .logo-mta {
            font-weight: bold;
            font-size: 20px;
            line-height: 1;
            color: #f59e0b;
            white-space: nowrap;
        }
        
        .logo-currency, .logo-exchange {
            font-weight: 600;
            font-size: 9px;
            line-height: 1.2;
            color: #f59e0b;
            white-space: nowrap;
        }
        
        .email-body {
            padding: 30px 20px;
        }
        
        .greeting {
            font-size: 14px;
            margin-bottom: 25px;
            color: #050505;
        }
        
        .message {
            font-size: 14px;
            margin-bottom: 30px;
            color: #000000;
        }
        
        .section {
            margin-bottom: 30px;
            padding-bottom: 25px;
            border-bottom: 1px solid #eeeeee;
        }
        
        .section:last-of-type {
            border-bottom: none;
        }
        
        .section-title {
            color: #0638a7;
            font-size: 18px;
            margin-bottom: 18px;
            padding-bottom: 8px;
            border-bottom: 2px solid #f59e0b;
        }
        
        .detail-row {
            margin-bottom: 12px;
            display: flex;
            flex-wrap: wrap;
        }
        
        .detail-label {
            font-weight: bold;
            color: #0c0c0c;
            min-width: 115px;
        }
        
        .detail-value {
            color: #282828;
            flex: 1;
        }
        
        .highlight-box {
            background-color: #fefce8;
            border-left: 4px solid #f59e0b;
            padding: 18px;
            margin: 25px 0;
            border-radius: 0 4px 4px 0;
        }
        
        .highlight-box p {
            margin-bottom: 10px;
            color: #444444;
        }
        
        .highlight-box p:last-child {
            margin-bottom: 0;
        }
        
        .order-number {
            background: linear-gradient(45deg, #ffc41d, #e2a207);
            color: black;
            padding: 10px 15px;
            border-radius: 4px;
            display: block;
            font-weight: bold;
            margin: 10px 0;
            letter-spacing: 1px;
        }
        
        .email-footer {
            background: linear-gradient(45deg, #1c2f84, #0e1f53);
            color: #ffffff;
            padding: 25px 30px;
            text-align: center;
            font-size: 12px;
        }
        
        .footer-links {
            margin: 15px 0;
            display: flex;
            justify-content: center;
            gap: 25px;
        }
        
        .footer-link {
            color: #5e8eff !important;
            text-decoration: none;
        }
        
        .footer-link:hover {
            text-decoration: underline;
        }
        
        .copyright {
            margin-top: 20px;
            color: #b6b6b6;
            font-size: 12px;
        }
        
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 14px;
        }
        
        .items-table th {
            background-color: #f8f9fa;
            padding: 12px 5px;
            text-align: left;
            border-bottom: 2px solid #dee2e6;
            color: #000000;
            font-weight: medium;
            font-size: 12px;
        }
        
        .items-table td {
            padding: 12px 5px;
            text-align: left;
            border-bottom: 1px solid #eaeaea;
        }
        
        .total-row {
            font-weight: bold;
            background-color: #f8f9fa;
            border-top: 2px solid #dee2e6;
        }
        
        @media (max-width: 600px) {
            .email-body {
                padding: 25px 10px;
            }
            
            .detail-row {
                flex-direction: column;
            }
            
            .detail-label {
                min-width:100px;
                margin-bottom: 5px;
            }
            .items-table th {
             font-size:11px;
            }
            
            .footer-links {
                flex-direction: column;
                gap: 10px;
            }
            
            .email-header {
                padding: 20px;
            }
            
            .items-table {
                font-size: 11px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header with Logo -->
        <div class="email-header">
            <div class="logo-container">
              <img src="cid:mtalogo" 
                alt="MTA Logo" 
                style="max-height: 40px; width: auto; display:inline-block;"
                width="120"
                height="auto">
                <div class="logo-text">
                    <p class="logo-mta">MTA</p>
                    <p class="logo-currency">CURRENCY</p>
                    <p class="logo-exchange">EXCHANGE</p>
                </div>
            </div>
            <h2 style="color:white;">Order Confirmed!</h2>
             <h2 style="color:white; font-size:x-large; font-weight:100;">#${orderNumber}</h2>
        </div>
        
        <!-- Email Body -->
        <div class="email-body">
            <p class="greeting">Dear ${orderData.customer_title} ${orderData.last_name},</p>
            
            <p class="message">Thank you for your order with MTA Currency Exchange. Your transaction has been confirmed and is now being processed.</p>
            
            <div class="section">
                <h3 class="section-title">Order Summary</h3>
                
                <table class="items-table">
                    <thead>
                       ${tableHeaders}
                    </thead>
                    <tbody>
                        ${itemsHtml}
                        <tr class="total-row">
                            <td colspan="2" style="text-align: right; padding-right: 20px;">Total GBP:</td>
                            <td style="text-align: left;">£${totalGBP.toFixed(2)}</td>
                            <td colspan="2"></td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="detail-row">
                    <span class="detail-label">Total Items:</span>
                    <span class="detail-value">${orderData.items.length}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Branch:</span>
                    <span class="detail-value">${orderData.branch_name}</span>
                </div>
            </div>
            
            <div class="section">
                <h3 class="section-title">Customer Information</h3>
                
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">${orderData.customer_title} ${orderData.first_name} ${orderData.last_name}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${orderData.email}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Mobile:</span>
                    <span class="detail-value">${orderData.mobile}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Payment Method:</span>
                    <span class="detail-value style="padding-left:3px;">${orderData.payment_method}</span>
                </div>
                ${orderData.notes ? `
                <div class="detail-row">
                <span class="detail-label">Order Note:</span>
                    <span class="detail-value">${orderData.notes}</span>
                </div>
                ` : ''}
            </div>
            
            <div class="highlight-box">
                <p><strong>Next Steps:</strong></p>
                <p>Please visit <strong>${orderData.branch_name}</strong> with a valid photo ID to complete your transaction.</p>
                <p>Bring this order number with you for reference.</p>
            </div>
            
            <p>Your order number is:</p>
            <div class="order-number">${orderNumber}</div>
            <p style="margin-top: 15px; font-size: 14px; margin-bottom: 10px;">Please quote this reference number when visiting the branch.</p>
        </div>
        
        <!-- Email Footer -->
        <div class="email-footer">
            <p><strong>MTA Currency Exchange</strong></p>
            <a href="mailto:mtaworldwidelimited@gmail.com" class="footer-link">mtaworldwidelimited@gmail.com</a>
            
            <p style="margin-top: 15px;">Thank you for choosing MTA Currency Exchange</p>
            <a href="https://www.mtaworldwidelimited.com" class="footer-link">www.mtaworldwidelimited.com</a>
            <div class="copyright">
                <p>© 2025 MTA World Wide Limited. All rights reserved.</p>
                <p style="font-size:10px;">This email was sent to <span style="color:#c0c0c0;">${orderData.email}</span> in response to your currency exchange order.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
}

function generateAdminEmailHTML(orderData: any, orderNumber: string): string {
  // Calculate totals
  const totalGBP = orderData.items.reduce((sum: number, item: any) => 
    sum + (item.gbp_amount || 0), 0);
 
  // Generate items table for admin
  const itemsHtml = orderData.items.map((item: any, index: number) => `
    <tr style="border-bottom: 1px solid #eaeaea;">
      <td style="padding: 12px 8px; text-align: left;">${index + 1}</td>
      <td style="padding: 12px 8px;">
        ${item.transaction_type === 'buy' ? 'Buy' : 'Sell'} ${item.currency_code}
        <p style="font-size:10px; color:black;">${item.currency_name}</p>
      </td>
      <td style="padding: 12px 8px; text-align: left;">£${parseFloat(item.gbp_amount).toFixed(2)} </td>
      <td style="padding: 12px 8px; text-align: left;">$${parseFloat(item.foreign_amount).toFixed(2)}</td>
      <td style="padding: 12px 8px; text-align: left;">${parseFloat(item.exchange_rate).toFixed(4)}</td>
    </tr>
  `).join('');
  const hasBuyItems = orderData.items.some((item: any) => item.transaction_type === 'buy');
   let tableHeaders = '';
   if (hasBuyItems) {
    // If only buy transactions
    tableHeaders = `
      <tr>
        <th>#</th>
        <th>Transaction</th>
        <th>You Recieve (GBP)</th>
        <th>You Send (Foreign)</th>
        <th>Exchange Rate</th>
      </tr>
    `;
  } else {
    // If only sell transactions
    tableHeaders = `
      <tr>
        <th>#</th>
        <th>Transaction</th>
        <th>You Send (GBP)</th>
        <th>You Recieve (Foreign)</th>
        <th>Exchange Rate</th>
      </tr>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          background-color: #f5f5f5;
          padding: 20px;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .header {
          background: linear-gradient(45deg, #022b59, #002f8a);
          color: white;
          padding: 25px 30px;
          text-align: center;
        }
        
        .header h2 {
          color: #f59e0b;
          margin-bottom: 10px;
        }
        
        .content {
          padding: 30px;
        }
        
        .alert-box {
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          color: #856404;
          padding: 15px;
          border-radius: 4px;
          margin-bottom: 25px;
        }
        
        .order-summary {
          margin: 25px 0;
        }
        
        .order-summary h3 {
          color: #0638a7;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #f59e0b;
        }
         .details-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          font-size: 14px;
        }
        
        .details-table th {
          background-color: #f8f9fa;
          padding: 12px 8px;
          text-align: left;
          border-bottom: 2px solid #dee2e6;
          color: #141414;
          font-weight: medium;
          font-size: 12px;
        }
        
        .details-table td {
          padding: 12px 8px;
          text-align: left;
          border-bottom: 1px solid #eaeaea;
        }
        
        .total-row {
          font-weight: bold;
          background-color: #eef0f2;
          border-top: 2px solid #dee2e6;
        }
        .customer-info {
          padding: 30px 0px;
          border-radius: 4px;
          margin: 25px 0;
        }
        
        .customer-info h3 {
          color: #0638a7;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #f59e0b;
        }
        
        .info-row {
          margin-bottom: 10px;
        }
        
        .info-label {
          font-weight: bold;
          color: #3b3c3d;
          min-width: 100px;
          display: inline-block;
        }
        
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #dee2e6;
          color: #6c757d;
          font-size: 12px;
        }
        @media (max-width: 600px) {
          .content {
            padding: 20px 10px;
          }
           .details-table {
              font-size: 12px;
            }
            .details-table th{
            font-size: 11px;
            }
          .header {
          padding: 20px;}
          }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
        <img src="cid:mtalogo" 
                alt="MTA Logo" 
                style="max-height: 30px; width: auto;"
                width="120"
                height="auto">
          <h2>NEW ORDER RECEIVED</h2>
          <p>Order Number: <strong>${orderNumber}</strong></p>
          <p>${orderData.items.length} Item(s) | <strong>Total: </strong> £${totalGBP.toFixed(2)} GBP</p>
        </div>
        
        <div class="content">          
          <div class="order-summary">
            <h3>Order Details</h3>
            <table class="details-table">
              <thead>
                ${tableHeaders}
              </thead>
              <tbody>
                ${itemsHtml}
                <tr class="total-row">
                  <td colspan="2" style="text-align: right;">TOTAL GBP:</td>
                  <td">£${totalGBP.toFixed(2)}</td>
                  <td colspan="3"></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="customer-info">
            <h3>Customer Information</h3>
            <div class="info-row">
              <span class="info-label">Customer:</span>
              ${orderData.customer_title} ${orderData.first_name} ${orderData.last_name}
            </div>
            <div class="info-row">
              <span class="info-label">Email:</span>
              ${orderData.email}
            </div>
            <div class="info-row">
              <span class="info-label">Mobile:</span>
              ${orderData.mobile}
            </div>
            <div class="info-row">
              <span class="info-label">Branch:</span>
              ${orderData.branch_name}
            </div>
            <div class="info-row">
              <span class="info-label" style="padding-right:3px;">Payment Method:</span>
              ${orderData.payment_method}
            </div>
            ${orderData.notes ? `
            <div class="info-row">
            <span class="info-label" style="padding-right:3px;">Customer Notes: </span>${orderData.notes}
            </div>
            ` : ''}
          </div>
          
          <div class="footer">
            <p>Order received at: ${new Date().toLocaleString()}</p>
            <p>System: MTA Currency Exchange Platform</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}