import express from "express";
import { faker } from "@faker-js/faker/locale/ru";
import cors from "cors";

const app = express();

app.use(cors());

function genData() {
  let newUser;
  const id = faker.string.uuid();
  const fullName = faker.person.fullName();
  const number = faker.phone.number();

  const addressForms = [
    `${faker.location.city()}, ${faker.location.street()}, дом: ${faker.location.buildingNumber()}`,
    `${faker.location.city()}, ${faker.location.streetAddress()}`,
    `${faker.location.city()}, ${faker.location.streetAddress(false)}`,
    `${faker.location.city()}, ${faker.location.streetAddress(true)}`,
    `${faker.location.city()}, ${faker.location.streetAddress({
      useFullAddress: true,
    })}`,
  ];
  const randomIndex = Math.floor(Math.random() * addressForms.length);
  const randomFormAddres = addressForms[randomIndex];

  return (newUser = {
    name: fullName,
    number,
    id,
    addres: randomFormAddres,
  });
}

app.get("/", (req, res) => {
  let usersArray = [];
  for (let i = 0; i < 20; i++) {
    let newUser = genData();
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

//Таблица выглядит следующим образом:
// 1) Номер — без ошибок
// 2) Случайный идентификатор — без ошибок
// 3) ФИО
// 4) Адрес (в нескольких вариантах форматов, не под копирку, например, где-то это область, город, улица, дом, корпус, квартира, а где-то село, улица и дом)
// 5) Телефон (опять же, желательно в нескольких вариантах форматов)
