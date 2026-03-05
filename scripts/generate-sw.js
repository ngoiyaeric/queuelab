const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'public', 'firebase-messaging-sw.template.js');
const outputPath = path.join(__dirname, '..', 'public', 'firebase-messaging-sw.js');

let template = fs.readFileSync(templatePath, 'utf8');

const replacements = {
  'YOUR_API_KEY': process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'YOUR_API_KEY',
  'YOUR_PROJECT_ID.firebaseapp.com': process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'YOUR_PROJECT_ID.firebaseapp.com',
  'YOUR_PROJECT_ID.appspot.com': process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'YOUR_PROJECT_ID.appspot.com',
  'YOUR_PROJECT_ID': process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'YOUR_PROJECT_ID',
  'YOUR_MESSAGING_SENDER_ID': process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_MESSAGING_SENDER_ID',
  'YOUR_APP_ID': process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'YOUR_APP_ID',
  'YOUR_MEASUREMENT_ID': process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'YOUR_MEASUREMENT_ID',
};

// Use RegExp for global replacement
template = template.replace(/YOUR_API_KEY/g, replacements['YOUR_API_KEY']);
template = template.replace(/YOUR_PROJECT_ID\.firebaseapp\.com/g, replacements['YOUR_PROJECT_ID.firebaseapp.com']);
template = template.replace(/YOUR_PROJECT_ID\.appspot\.com/g, replacements['YOUR_PROJECT_ID.appspot.com']);
template = template.replace(/YOUR_PROJECT_ID/g, replacements['YOUR_PROJECT_ID']);
template = template.replace(/YOUR_MESSAGING_SENDER_ID/g, replacements['YOUR_MESSAGING_SENDER_ID']);
template = template.replace(/YOUR_APP_ID/g, replacements['YOUR_APP_ID']);
template = template.replace(/YOUR_MEASUREMENT_ID/g, replacements['YOUR_MEASUREMENT_ID']);

fs.writeFileSync(outputPath, template, 'utf8');
console.log('Successfully generated public/firebase-messaging-sw.js');
