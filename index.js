auto verify user on congito
exports.handler = (event, context, callback) => {
    
    // Confirm the user
        event.response.autoConfirmUser = true;

    // Set the email as verified if it is in the request
    if (event.request.userAttributes.hasOwnProperty("email")) {
        event.request.userAttributes.autoVerifyEmail = true;
        event.response.autoVerifyEmail = true;
    }

    // Set the phone number as verified if it is in the request
    if (event.request.userAttributes.hasOwnProperty("phone_number")) {
        event.request.userAttributes.autoVerifyPhone = true;
        event.response.autoVerifyPhone = true;
    }
    console.log(event)
    // Return to Amazon Cognito
    callback(null, event);
};