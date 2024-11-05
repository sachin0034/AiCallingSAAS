const express = require('express');
const router = express.Router();

// Add this route to your auth.js or appropriate router file
router.post('/send-interest-email', auth, async (req, res) => {
  try {
    const { userName, userPhone } = req.body;

    // Get SendGrid API key from your config
    const SENDGRID_API_KEY = "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";
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: 'sachinparmar0246@gmail.com', // Admin email
      from: 'choudhardiv@gmail.com', // Your verified sender
      subject: 'New Interest Alert',
      html: `
        <h2>New Interest Alert</h2>
        <p>A user has shown interest in your services during a recent call.</p>
        
        <h3>User Details:</h3>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Phone:</strong> ${userPhone}</p>
        
        <p>Please follow up with this lead as soon as possible.</p>
      `,
    };

    await sgMail.send(msg);
    
    res.status(200).json({ 
      success: true, 
      message: 'Interest notification email sent successfully' 
    });

  } catch (error) {
    console.error('Error sending interest email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send interest notification email',
      error: error.message 
    });
  }
}); 