import dynamoose from 'dynamoose';

const cardSchema = new dynamoose.Schema({
  title: String,
});

const CardModel = dynamoose.model("CardTable", cardSchema);

export const handler = async (event) => {
  try {
    let deletedCard = await CardModel.delete(event.pathParameters.id);
    const response = {
      statusCode: 200,
      body: JSON.stringify(deletedCard),
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
