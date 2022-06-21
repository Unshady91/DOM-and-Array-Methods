// Use forEach() to loop and output user/wealth
let DATA = [];
const MAX_WEALTH_RATE = 1000000;
const main = document.querySelector("main");

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

const setData = (obj) => {
  DATA.push(obj);

  setPerson();
};

async function fetchUsers() {
  const results = await fetch("https://randomuser.me/api/");
  const data = await results.json();

  const user = data.results[0].name;

  const newUser = {
    name: `${user.first} ${user.last}`,
    wealth: Math.floor(Math.random() * MAX_WEALTH_RATE),
  };

  setData(newUser);
}

document.addEventListener("DOMContentLoaded", fetchUsers);

function setPerson(providedData = DATA) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((user) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.wealth)}`;
    main.appendChild(element);
  });
}

const addUserButton = document.querySelector("#add-user");

const addUserHandler = () => {
  fetchUsers();
};

addUserButton.addEventListener("click", addUserHandler);

// Use map() to double wealth
function doubleHandler() {
  DATA = DATA.map((user) => {
    return { ...user, wealth: user.wealth * 2 };
  });

  setPerson();
}
const doubleMoneyButton = document.querySelector("#double");
doubleMoneyButton.addEventListener("click", doubleHandler);
