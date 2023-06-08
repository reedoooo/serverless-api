import dynamoose from 'dynamoose';
import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB();

const cardSchema = new dynamoose.Schema({
  title: String,
  level: Number,
  type: String,
});

const CardModel = dynamoose.model("CardTable", cardSchema);

const tableExists = async (tableName) => {
  try {
    await dynamoDb.describeTable({ TableName: tableName }).promise();
    return true;
  } catch (error) {
    if (error.code === 'ResourceNotFoundException') {
      return false;
    }
    throw error;
  }
};

export const handler = async (event) => {
  try {
    const tableExists = await tableExists("CardTable");
    if (!tableExists) {
      throw new Error('Table does not exist');
    }

    let updatedCard = await CardModel.update(
      { id: `${event.pathParameters.id}` },
      JSON.parse(event.body)
    );

    const response = {
      statusCode: 200,
      body: JSON.stringify(updatedCard),
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
};
