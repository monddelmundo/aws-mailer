"use strict";

var aws = require("aws-sdk");
var ses = new aws.SES({ region: "ap-southeast-1" });

module.exports.sendEmail = async (event) => {
  const { body } = event;
  const { Message } = JSON.parse(body);

  var params = {
    Destination: {
      ToAddresses: [Message.To],
    },
    Message: {
      Body: {
        Text: { Data: Message.Body.Text.Data },
      },

      Subject: { Data: Message.Subject.Data },
    },
    Source: Message.From,
  };

  return ses
    .sendEmail(params)
    .promise()
    .then((res) => {
      if (res) {
        return {
          statusCode: 200,
          body: JSON.stringify(
            {
              message: "Function sendEmail executed successfully!",
            },
            null,
            2
          ),
        };
      }
    })
    .catch((err) => {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: "Function sendEmail failed. Check logs!",
          },
          null,
          2
        ),
      };
    });
};
