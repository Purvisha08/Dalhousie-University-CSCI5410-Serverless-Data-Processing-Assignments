console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
var tableName = "studentDetails";

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

function verificationFunction(intent, callback) {

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
            {'contentType': 'PlainText', 'content': "Ohh no! Unable to verify! Your Name or Email Id is Incorrect"}));
        } else {
            callback(close(intent.sessionAttributes, 'Fulfilled',
            {'contentType': 'PlainText', 'content': "Hurreh! You are verified! You can now access your system."}));
        }
    });
}


exports.handler = (event, context, callback) => {
    console.log(event);
    try {
        verificationFunction(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};
