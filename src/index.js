let bannerImg = document.querySelector(".bannerImg");
let imagesAll = document.querySelector(".imagesAll")

async function initialLoad() {
    const response = await axios.get("https://registry.dog/api/v1");
    console.log(response.data.data);
    let images = response.data.data;
    images.forEach(data => {
        const img = document.createElement("img")
        img.setAttribute("src", data.images.small.indoors)
        imagesAll.appendChild(img)
    });
}

async function createBody() {
    const response = await axios.get("https://registry.dog/api/v1");
    const img = document.createElement("img")
    img.setAttribute("src", response.data.data[2].images.small.indoors)
    img.classList.add("img-fluid")
    bannerImg.appendChild(img)
}


createBody()

