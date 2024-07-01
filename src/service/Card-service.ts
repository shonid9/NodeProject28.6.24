import { Card } from "../models/Cards"
import { ICardInput } from "./../@types/Card.d";
const createCard = async (data: ICardInput, userId: string) => {
  //bizNumber, userId
  const card = new Card(data);

  card.userId = userId;
  //random number that does not exist in the database:
  while (true) {
    const random = Math.floor(Math.random() * 1_000_000);
    const dbRes = await Card.findOne({ bizNumber: random });
    if (!dbRes) {
      card.bizNumber = random;
      break;
    }
  }

  return card.save();
};

export {createCard}