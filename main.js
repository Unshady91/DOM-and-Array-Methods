let DATA = [];

const createTemplate = (arr) => {
  let result;

  arr.forEach((user) => {
    result = `<strong>${user.name}</strong> &dollar;${user.wealth}.00`;
  });

  return result;
};

const setPerson = (providedData = DATA) => {
  const div = document.createElement("div");
  div.classList.add("person");
  const fragment = document.createDocumentFragment();
  const main = document.querySelector("main");

  div.innerHTML = createTemplate(providedData);
  
  fragment.append(div.cloneNode(true));
  main.appendChild(fragment);
}

const setData = (obj) => {
  DATA.push(obj);

  setPerson();
};

async function fetchUsers() {
  await fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((person) => {
      const name = person.results[0].name;

      let newUser = {
        name: `${name.first} ${name.last}`,
        wealth: generateRandomIntegerInRange(MIN_WEALTH_RATE, MAX_WEALTH_RATE),
      };

      setData(newUser);
    });
}

document.addEventListener("DOMContentLoaded", fetchUsers);

// task 2 add user to the existing list

const addUserButton = document.querySelector("#add-user");

const addUserHandler = () => {
  fetchUsers();
};

addUserButton.addEventListener("click", addUserHandler);

// generates rundom number
let MIN_WEALTH_RATE = 1;
let MAX_WEALTH_RATE = 1000000;

const generateRandomIntegerInRange = (min, max) => {
  const res = (Math.floor(Math.random() * (max - min + 1000000)) + min).toFixed(
    2
  );
  Number(res);
  const toString = Number(res).toLocaleString("en-US");
  return toString;
};
