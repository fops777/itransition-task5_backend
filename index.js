import express from "express";
import { faker } from "@faker-js/faker/locale/ru";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

function genData(sid) {
  let newUser;

  faker.seed(sid);

  const id = faker.string.uuid();
  const fullName = faker.person.fullName();
  const number = faker.phone.number();

  const addressForms = [
    `${(faker.seed(sid), faker.location.city())}, ${
      (faker.seed(sid), faker.location.street())
    }, дом: ${(faker.seed(sid), faker.location.buildingNumber())}`,
    `${(faker.seed(sid), faker.location.city())}, ${
      (faker.seed(sid), faker.location.streetAddress())
    }`,
    `${(faker.seed(sid), faker.location.city())}, ${
      (faker.seed(sid), faker.location.streetAddress(false))
    }`,
    `${(faker.seed(sid), faker.location.city())}, ${
      (faker.seed(sid), faker.location.streetAddress(true))
    }`,
    `${(faker.seed(sid), faker.location.city())}, ${
      (faker.seed(sid),
      faker.location.streetAddress({
        useFullAddress: true,
      }))
    }`,
  ];
  const randomIndex = Math.floor(Math.random() * addressForms.length);
  const randomFormAddres = addressForms[randomIndex];

  return (newUser = {
    id,
    name: fullName,
    number,
    addres: randomFormAddres,
  });
}

app.get("/", (req, res) => {
  let usersArray = [];
  let sid = 0;

  for (let i = 0; i < 20; i++) {
    sid++;
    let newUser = genData();
    usersArray.push(newUser);
  }
  res.json(usersArray); // 20 users
});

app.post("/seed", (req, res) => {
  let usersArray = [];
  let sid = req.body.seed;

  for (let i = 0; i < 20; i++) {
    sid++;
    let newUser = genData(sid);
    usersArray.push(newUser);
  }
  res.json(usersArray); // 20 users
});

app.listen(5555, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Server OK");
});
