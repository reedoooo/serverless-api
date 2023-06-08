const dynamoose = require("dynamoose");
const { v4: uuidv4 } = require('uuid');

const cardSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true },
  title: String,
  level: Number,
  type: String,
});

const CardModel = dynamoose.model("CardTable", cardSchema);

exports.handler = async (event) => {
  try {
    let newCard = await CardModel.create({
      id: uuidv4(),
      ...JSON.parse(event.body)
    });

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
};
