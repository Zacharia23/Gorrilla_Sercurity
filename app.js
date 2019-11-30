const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const nodeMailer = require('nodemailer')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use('/assets', express.static('assets'));

app.use('/', indexRouter)


app.post('/send', (req, res) => {
    const output = 
    `
    <p> You have a new Enquiry From </p>
    <h3> Contact Details </h3>
    <ul> 
        <li> Name: ${req.body.firstName} "." ${req.body.lastName} </li>
        <li> Email: ${req.body.useremail} </li> 
    </ul> 

    <h3> Subject </h3>
    <p> Message: ${req.body.subject} </p>
    
    <h3> Message </h3>
    <p> Message: ${req.body.message} </p>

    `

    let transporter = nodeMailer.createTransport({
        host: 'smtp.etherreal.emai',//main.traversymedia.com
        port: 587,
        secure: false, 

        auth: {
            user: account.user, //test@traversymedia.com
            pass: account.pass //generated password
        }, 
        tls:{
            rejectUnauthorized: false
        }
    })

    let mailOptions = {
        from: "Node Mailer Contact", //mail sender 
        to: 'tehguyinfo@gmail.com', //receiver mail
        subject: "Hello World",
        html: output
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        console.log('message sent: %s', info.messageId)
        console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info))

        res.render('contact', {msg: 'Email has been Sent'})
    })
})


app.listen(process.env.PORT || 3000)
