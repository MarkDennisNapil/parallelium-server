function verificationCode(id, email){
    var success = false;
    const domain = "https://parallelium.vercel.app/";
    const sender = "dennis7napil@gmail.com";
    const receiver = email;
    const subject = "Parallelium";
    const rb_message = "Account verification";
    const content = "Thank you for signing up to Parallelium, please click confirm to verify account.";
    const linkCode = `${domain}id=${id}/email=${email}/confirm=true`;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dennis7napil@gmail.com',
          pass: 'zisiwozsdevlbkvp'
        }
      });
      
      var mailOptions = {
        from: sender,
        to: receiver,
        subject: subject,
        text: content,
        html: '<a href="'+linkCode+'"><button style="padding:8px;background:blue;border-radius:5px;">Confirm</button></a>'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          success = true
          return success;
        } else {
          console.log('Email sent: ' + info.response);
          success = false;
          return success;
        }
      });
}

module.export = verificationCode;