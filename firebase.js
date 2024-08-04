const admin = require('firebase-admin');
const serviceAccount = require('./google-services.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://lucky-spin-4071c-default-rtdb.firebaseio.com'
});

module.exports = admin;
