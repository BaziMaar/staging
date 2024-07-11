const admin = require('../firebase');

const sendNotification = async (req, res) => {
    const { token, title, body } = req.body;

    if (!token || !title || !body) {
        return res.status(400).send({
            success: false,
            msg: 'Token, title, and body are required'
        });
    }

    const messagePayload = {
        notification: {
            title: title,
            body: body
        }
    };

    try {
        const response = await admin.messaging().sendToDevice(token, messagePayload);
        return res.status(200).send({
            success: true,
            msg: 'Successfully sent message',
            response
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            msg: 'Error sending message',
            error: error.message
        });
    }
};

module.exports = { sendNotification };
