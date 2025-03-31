import { getApiResponse } from "./apiResponse.js";

export const apiUrl = "https://registry.dog/api/v1";

let bannerImg = document.querySelector(".bannerImg");
const favoriteBreeds = document.querySelector(".favoriteBreeds");
const spotlight = document.querySelector(".spotlight");
const availablePets = document.querySelector(".availablePets");

async function createBody() {
  try {
    const response = await getApiResponse(apiUrl);
    const data = await response.data;

    if (data && data[2]) {
      const img = document.createElement("img");
      img.setAttribute("src", data[2].images.small.indoors); 
      img.classList.add("img-fluid");

      if (bannerImg) {
        bannerImg.appendChild(img);
      }
    }
  } catch (error) {
    console.log("Error fetching body data:", error);
  }
}

async function createBreeds() {
  try {
    const response = await getApiResponse(apiUrl);
    let breeds = await response.data;

    const breedsArr = [];

    breeds.forEach((data) => {
      let breed = data.id;
      breedsArr.push(breed);
    });

    breeds.forEach((data) => {
      if (
        data.id === "chihuahua" ||
        data.id === "cavapoo" ||
        data.id === "french-bulldog" ||
        data.id === "labrador-retriever"
      ) {
        const breedDiv = document.createElement("div");
        breedDiv.classList.add("breedDiv");
        const img = document.createElement("img");
        img.classList.add("img-fluid");
        img.setAttribute("src", data.images.small.indoors);

        const breedHeader = document.createElement("h4");
        breedHeader.textContent = `${data.general.name}`;
        breedDiv.appendChild(img);
        breedDiv.appendChild(breedHeader);

        if (favoriteBreeds) {
          favoriteBreeds.append(breedDiv);
        }
      }
    });

    console.log(breeds);
  } catch (error) {
    console.log("Error fetching breed data:", error);
  }
}

async function createSpotlight() {
  try {
    const response = await getApiResponse(apiUrl);
    let breeds = await response.data;

    breeds.forEach((data) => {
      if (data.id === "maltipoo") {
        const spotlightImg = document.createElement("div");
        spotlightImg.classList.add("spotlightImg");
        const img = document.createElement("img");
        img.setAttribute("src", data.images.small.indoors);
        img.classList.add("img-fluid");
        spotlightImg.append(img);
        spotlight.appendChild(spotlightImg)

        const spotlightIntro = document.createElement("div");
        spotlightIntro.classList.add("spotlightIntro");
        spotlight.append(spotlightIntro);

        const spotlightHeader = document.createElement("h2");
        spotlightHeader.innerHTML = `Meet Spark`;
        spotlightIntro.append(spotlightHeader);

        const spotlightDesc = document.createElement("p");
        spotlightDesc.innerHTML = `${data.general.shortDescription}`;
        spotlightIntro.append(spotlightDesc);

        const adoptBtn = document.createElement("button");
        const text = document.createTextNode("Adopt Now");
        adoptBtn.append(text);
        adoptBtn.classList.add("adoptBtn");
        spotlightIntro.append(adoptBtn);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function createAvailablePets() {
  try {
    const response = await getApiResponse(apiUrl);
    let breeds = await response.data;

    breeds.forEach((data) => {
      if (
        data.id === "siberian-husky" ||
        data.id === "rottweiler" ||
        data.id === "pembroke-welsh-corgi"
      ) {
        const availablePet = document.createElement("div");
        availablePet.classList.add("availablePet");

        if (availablePets) {
          availablePets.appendChild(availablePet);
        }

        const img = document.createElement("img");
        img.setAttribute("src", data.images.small.indoors);
        availablePet.append(img);
      }
    });
  } catch (error) {
    console.log("Error fetching available pets data:", error);
  }
}

createSpotlight();
createBody();
createBreeds();
createAvailablePets();

