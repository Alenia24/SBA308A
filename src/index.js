let bannerImg = document.querySelector(".bannerImg");
let imagesAll = document.querySelector(".imagesAll");
const favoriteBreeds = document.querySelector(".favoriteBreeds");

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
      breedDiv.classList.add("breedDiv")
      const img = document.createElement("img");
      img.classList.add("img-fluid")
      img.setAttribute("src", data.images.small.indoors);
      const breedHeader = document.createElement("h4");
      breedHeader.textContent=`${data.general.name}`
      breedDiv.appendChild(img);
      breedDiv.appendChild(breedHeader)
      favoriteBreeds.append(breedDiv);
    }
  });

  console.log(breeds);
}

createBody();
createBreeds();
