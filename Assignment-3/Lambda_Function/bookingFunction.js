console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
var tableName = "Appointments";

function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

function bookingAppointment(intent, callback) {

    let userInfo = {};

    Object.keys(intent.currentIntent.slots).forEach((item) => {
        console.log(item)
        userInfo[item] = {"S": intent.currentIntent.slots[item]};
    });
    
    
    dynamodb.putItem({
        "TableName": tableName,
        "Item" : userInfo
    }, function(err, data) {
        if (err) {
            console.log(err);
            callback(close(intent.sessionAttributes, 'Fulfilled',
            {'contentType': 'PlainText', 'content': "Unable to book Appointment! This slot is already booked. Please try yo book another slot."}));
        } else {
            callback(close(intent.sessionAttributes, 'Fulfilled',
            {'contentType': 'PlainText', 'content': "Thank you for booking appointment."}));
        }
    });
}


exports.handler = (event, context, callback) => {
    console.log(event);
    try {
        bookingAppointment(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};
