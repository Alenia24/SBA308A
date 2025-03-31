import { getApiResponse } from "./apiResponse.js";
import { apiUrl } from "./index.js";

const all = document.querySelector(".all");
const searchForm = document.querySelector("#searchForm");

const randomnames = [
  "Amaya",
  "Beatrix",
  "Brynn",
  "Camila",
  "Effie",
  "Evee",
  "June Bug",
  "Kiva",
  "Lil Bit",
  "Marnie",
  "Maude",
  "Maxi",
  "Memphis",
  "Nylah",
  "Palmer",
  "Selena",
  "Simba",
  "Snoopy",
  "Tequila",
  "Valentine",
  "Vixen",
];

async function initialLoad() {
  const response = await getApiResponse(apiUrl);
  const images = await response.data;

  images.forEach((data) => {
    let randomName =
      randomnames[Math.floor(Math.random() * randomnames.length)];
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("imgDiv");
    const img = document.createElement("img");
    img.setAttribute("src", data.images.small.indoors);
    img.classList.add("img-fluid");
    imgDiv.append(img);

    const dogName = document.createElement("h5");
    dogName.innerHTML = `${randomName}`;
    imgDiv.append(dogName);

    const dogBreed = document.createElement("p");
    dogBreed.innerHTML = `<strong>Breed:</strong> ${data.general.name}`;
    imgDiv.append(dogBreed);

    const childFriendly = document.createElement("p");
    childFriendly.innerHTML = `<strong>Child Friendly:</strong> ${data.behavior.childFriendly}`;
    imgDiv.append(childFriendly);

    const personality = document.createElement("p");
    personality.innerHTML = `<strong>Personality:</strong> ${data.general.personalityTraits}`;
    imgDiv.append(personality);

    const adoptBtn = document.createElement("button");
    const text = document.createTextNode("Adopt Now");
    adoptBtn.append(text);
    adoptBtn.classList.add("adoptBtn");
    imgDiv.append(adoptBtn);

    all.append(imgDiv);
  });
}

const inputField = document.getElementById("searchInput");
const suggestionsList = document.getElementById("suggestions");

async function autocomplete() {
  const response = await getApiResponse(apiUrl);
  const data = await response.data;

  const breedsArr = [];
  data.forEach((data) => {
    let breed = data.general.name;
    breedsArr.push(breed);
  });

  const inputValue = inputField.value.toLowerCase();

  if (!inputValue) {
    suggestionsList.style.display = "none";
    return;
  }

  const filteredData = breedsArr.filter((item) =>
    item.toLowerCase().startsWith(inputValue)
  );

  suggestionsList.innerHTML = "";

  filteredData.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    suggestionsList.appendChild(listItem);
  });

  suggestionsList.style.display = "block";
}

inputField.addEventListener("input", autocomplete);

document.addEventListener("click", function (event) {
  if (
    event.target.tagName === "LI" &&
    event.target.parentNode === suggestionsList
  ) {
    inputField.value = event.target.textContent;
    displaySelected(inputField.value);
    suggestionsList.style.display = "none";
  } else if (
    !inputField.contains(event.target) &&
    !suggestionsList.contains(event.target)
  ) {
    suggestionsList.style.display = "none";
  }
});

async function displaySelected(input) {
  const response = await getApiResponse(apiUrl);
  const images = await response.data;

  all.innerHTML = "";

  images.forEach((data) => {
    if (data.general.name === input) {
      let randomName =
        randomnames[Math.floor(Math.random() * randomnames.length)];
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("imgDiv");
      const img = document.createElement("img");
      img.setAttribute("src", data.images.small.indoors);
      img.classList.add("img-fluid");
      imgDiv.append(img);

      const dogName = document.createElement("h5");
      dogName.innerHTML = `${randomName}`;
      imgDiv.append(dogName);

      const childFriendly = document.createElement("p");
      childFriendly.innerHTML = `<strong>Child Friendly:</strong> ${data.behavior.childFriendly}`;
      imgDiv.append(childFriendly);

      const personality = document.createElement("p");
      personality.innerHTML = `<strong>Personality:</strong> ${data.general.personalityTraits}`;
      imgDiv.append(personality);

      const adoptBtn = document.createElement("button");
      const text = document.createTextNode("Adopt Now");
      adoptBtn.append(text);
      adoptBtn.classList.add("adoptBtn");
      imgDiv.append(adoptBtn);

      all.append(imgDiv);
    }
  });
}

initialLoad();
