const all = document.querySelector(".all");
const searchForm = document.querySelector("#searchForm");

async function initialLoad() {
  const response = await axios.get("https://registry.dog/api/v1");
  console.log(response.data.data);
  let images = response.data.data;
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

  images.forEach((data) => {
    let randomName =
      randomnames[Math.floor(Math.random() * randomnames.length)];
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("imgDiv");
    const img = document.createElement("img");
    img.setAttribute("src", data.images.small.indoors);
    img.classList.add("img-fluid")
    imgDiv.append(img);
    const dogName = document.createElement("h5");
    dogName.innerHTML = `${randomName}`;
    imgDiv.append(dogName);
    const childFriendly = document.createElement("p");
    childFriendly.innerHTML =`<strong>Child Friendly:</strong> ${data.behavior.childFriendly}`;
    imgDiv.append(childFriendly)
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


initialLoad();
