import AWS from 'aws-sdk';
import dynamoose from 'dynamoose';

// Update AWS configuration
AWS.config.update({
  accessKeyId: 'AKIA3F323ZAFZU6WIQFB',
  secretAccessKey: 'Nwm0eHV3rTxvm8n7TGKLdJhaYM6hs9ID',
  region: 'us-east-1'
});

const cardSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true },
  title: String,
  level: Number,
  type: String,
});

const ddb = new AWS.DynamoDB();
const tableName = "CardTable";
let CardModel;

// Function to check if a DynamoDB table exists
async function tableExists(name) {
  try {
    await ddb.describeTable({ TableName: name }).promise();
    return true;
  } catch (err) {
    if (err.code === 'ResourceNotFoundException') {
      return false;
    }
    throw err;
  }
}

export const handler = async (event) => {
  if (!event.body) {
    const response = {
      statusCode: 500,
      body: "Request body missing, unable to create new DB entry",
    };
    return response;
  } else {
    let modelBody = JSON.parse(event.body);

    try {
      if (!CardModel) {
        const exists = await tableExists(tableName);
        if (!exists) {
          CardModel = dynamoose.model(tableName, cardSchema);
        } else {
          CardModel = dynamoose.model(tableName, cardSchema, { create: false });
        }
      }
      
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
