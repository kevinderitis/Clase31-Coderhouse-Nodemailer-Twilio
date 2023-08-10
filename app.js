import express from 'express';
import config from './src/config/config.js';
import { sendMail } from './src/services/email.js';
import { sendSMS } from './src/services/sms.js';

const app = express();

app.get('/mail', async (req, res) => {

    let email = req.query.email;

    let options = {
        from: 'Test email <kevin.deritis77@gmail.com>',
        to: email,
        subject: 'Correo de prueba',
        html: `
        <div>
        <h1>Esto es un test</h1>
        <img src="cid:perrito1"/>
        </div>`,
        attachments: [{
            filename: 'perrito.jpeg',
            path: './perrito.jpeg',
            cid: 'perrito1'
        }]
    }

    // En caso de no querer enviar la imagen embebida en el html, podemos eliminar 
    // la referencia en el mismo y no necesitariamos enviar el filename y cid

    let result = await sendMail(options)
    console.log(result);
    res.send(result)
})

app.get('/sms', async (req, res) => {
    let { to, body } = req.query;

    let options = {
        body,
        from: config.TWILIO_PHONE_NUMBER,
        to
    }

    let result = await sendSMS(options);
    res.send(result)

})

const PORT = config.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running on port: ${server.address().port}`));
