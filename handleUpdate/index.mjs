const dynamoose = require("dynamoose");

const cardSchema = new dynamoose.Schema({
  title: String,
  level: Number,
  type: String,
});

const CardModel = dynamoose.model("CardTable", cardSchema);

exports.handler = async (event) => {
  try {
    let updatedCard = CardModel.update(
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
