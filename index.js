'use strict';

const AWS = require('aws-sdk');
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;

exports.handler = (event) => {
    console.log('Event:', event);
    console.log('EmailAddress:', EMAIL_ADDRESS);
};