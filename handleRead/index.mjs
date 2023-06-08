import dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';

const cardSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true },
  title: String,
  level: Number,
  type: String,
});

const CardModel = dynamoose.model("CardTable", cardSchema);

export const handler = async (event) => {
  try {
    const existingTables = await dynamoose.aws.ddb().listTables().promise();
    if (!existingTables.TableNames.includes("CardTable")) {
      await dynamoose.aws.ddb().createTable(cardSchema);
    }

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
