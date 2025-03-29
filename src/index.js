let bannerImg = document.querySelector(".bannerImg");
let imagesAll = document.querySelector(".imagesAll");
const favoriteBreeds = document.querySelector(".favoriteBreeds");
const spotlight = document.querySelector(".spotlight");
const availablePets = document.querySelector(".availablePets");

async function initialLoad() {
  const response = await axios.get("https://registry.dog/api/v1");
  console.log(response.data.data);
  let images = response.data.data;
  images.forEach((data) => {
    const img = document.createElement("img");
    img.setAttribute("src", data.images.small.indoors);
    imagesAll.appendChild(img);
  });
}

async function createBody() {
  const response = await axios.get("https://registry.dog/api/v1");
  const img = document.createElement("img");
  img.setAttribute("src", response.data.data[2].images.small.indoors);
  img.classList.add("img-fluid");
  bannerImg.appendChild(img);
}

async function createBreeds() {
  const response = await axios.get("https://registry.dog/api/v1");
  let breeds = response.data.data;

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
      favoriteBreeds.append(breedDiv);
    }
  });

  console.log(breeds);
}

async function createSpotlight() {
  const response = await axios.get("https://registry.dog/api/v1");
  let breeds = response.data.data;

  breeds.forEach((data) => {
    if (data.id === "maltipoo") {
      const spotlightImg = document.createElement("div");
      spotlightImg.classList.add("spotlightImg");
      const img = document.createElement("img");
      img.setAttribute("src", data.images.small.indoors);
      img.classList.add("img-fluid");
      spotlightImg.append(img);
      spotlight.append(spotlightImg);
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
      const text = document.createTextNode("Adopt Now")
      adoptBtn.append(text)
      adoptBtn.classList.add("adoptBtn")
      spotlightIntro.append(adoptBtn)
    }
  });
}

async function createAvailablePets () {
  const response = await axios.get("https://registry.dog/api/v1");
  let breeds = response.data.data;

  breeds.forEach((data) => { 
    if (
      data.id === "siberian-husky" ||
      data.id === "rottweiler" ||
      data.id === "pembroke-welsh-corgi"
    ) {
      const availablePet = document.createElement("div");
      availablePet.classList.add("availablePet")
      availablePets.appendChild(availablePet)
      const img = document.createElement("img");
      img.setAttribute("src", data.images.small.indoors);
      availablePet.append(img)
    }
    
  });

}

createSpotlight();
createBody();
createBreeds();
// initialLoad()
createAvailablePets()
