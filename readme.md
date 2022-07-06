# AWS cognito: send email after skipping email verification

After creating a user on cognito and skipping the email verification workflow, sending them an email requires email verification by marking the `email_verified` attribute as `True`.

## What if you need to send them an email after creation but wish to skip.
SES won't send an email if the above mentioned attribute is not set. 

#### Therefore bypass this issue by creating the following lambda code with node.js runtime

```javascript
auto verify user on congito
exports.handler = (event, context, callback) => {
    
    // Confirm the user
        event.response.autoConfirmUser = true;

    // Set the email as verified if it is in the request
    if (event.request.userAttributes.hasOwnProperty("email")) {
        event.request.userAttributes.autoVerifyEmail = true;
        event.response.autoVerifyEmail = true;
    }

    
    console.log(event)
    // Return to Amazon Cognito
    callback(null, event);
};
```

and attach the `presignup lambda trigger to it`.

NB:**I NOTICED THE EMAIL IS SENT AFTER THIS, I THINK THE ATTRIBUTE IS SENSED BY SES DURING THE EVENT BUT NEVER REALLY PERMANNENTLY MARKED AS VERIFIED**
