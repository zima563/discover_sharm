export const generateEmailTemplateOrder = (bookingDetails) => {
    const {
     name,
     date,
     Adults,
     children,
     children_s,
     totalPrice,
     hotel,
     RoomNumber,
     orderId,
    } = bookingDetails;
  
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 80%;
                margin: auto;
                overflow: hidden;
            }
            .header, .footer {
                background: #333;
                color: #fff;
                padding: 10px 0;
                text-align: center;
            }
            .content {
                background: #fff;
                padding: 20px;
                margin: 20px 0;
            }
            .content h1 {
                color: #333;
            }
            .content p {
                line-height: 1.6;
            }
            .details {
                margin: 20px 0;
            }
            .details table {
                width: 100%;
                border-collapse: collapse;
            }
            .details th, .details td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            .details th {
                background-color: #f2f2f2;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Order Confirmation</h1>
            </div>
            <div class="content">
                <h1>Dear ${name},</h1>
                <p>Thank you for your order. Here are the details of your booking:</p>
                <div class="details">
                    <h2>Booking Details</h2>
                    <table>
                        <tr>
                            <th>Order Code</th>
                            <td>${orderId}</td>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <td>${date}</td>
                        </tr>
                        <tr>
                            <th>Adults</th>
                            <td>${Adults}</td>
                        </tr>
                        <tr>
                            <th>Children</th>
                            <td>${children}</td>
                        </tr>
                        <tr>
                            <th>Children (special)</th>
                            <td>${children_s}</td>
                        </tr>
                        <tr>
                            <th>Total Price</th>
                            <td>${totalPrice}</td>
                        </tr>
                        <tr>
                            <th>Hotel</th>
                            <td>${hotel}</td>
                        </tr>
                        <tr>
                            <th>Room Number</th>
                            <td>${RoomNumber}</td>
                        </tr>
                        <tr>
                            <th>Payment</th>
                            <td>Done...</td>
                        </tr>
                    </table>
                </div>
                <p>If you have any questions, feel free to contact us at support@example.com.</p>
                <p>Thank you,<br>The discocer_sharm App Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 discocer_sharm App. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  };
  