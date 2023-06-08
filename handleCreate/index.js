require('dotenv').config()
const AWS = require('aws-sdk');
const dynamoose = require('dynamoose');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const cardSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true },
  title: String,
  level: Number,
  type: String,
});

const CardModel = dynamoose.model("CardTable", cardSchema);

exports.handler = async (event) => {
  if (!event.body) {
    const response = {
      statusCode: 500,
      body: "Request body missing, unable to create new DB entry",
    };
    return response;
  } else {
    let modelBody = JSON.parse(event.body);

    try {
      const newCard = await CardModel.create(modelBody);
      const response = {
        statusCode: 200,
        body: JSON.stringify(newCard),
      };
      return response;
    } catch (e) {
      console.log(e);
      const response = {
        statusCode: 500,
        body: JSON.stringify(e),
      };
      return response;
    }
  }
};
