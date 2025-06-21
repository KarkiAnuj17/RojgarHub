import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'karkianuj123@gmail.com',
    pass: 'ceys jumw zmme lbwd'
  }
});
  
function sendMail (UserEmail){
let mailOptions = {
  from: 'karkianuj123@gmail.com',
  to: UserEmail,
  subject: 'Your company has been approved',
  text: 'Congralutation, Now you can post the job '
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

export default sendMail