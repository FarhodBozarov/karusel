const API_KEY = "563492ad6f91700001000001655b3dcd6ee44b8c9bb3116140e09fc1";
const allImages = [];
const container = document.getElementById("container");
const left = document.getElementById("left");
const right = document.getElementById("right");
const slidesToView = 3;
const slideSize = 400;
const massiv = [];
let counter = 0;

container.style.width = slidesToView * slideSize + "px";
async function getImages(perPage = 20, page = 1) {
  const result = await fetch(
    `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    }
  );
  const images = await result.json();
  images.photos.forEach((image) => {
    allImages.push(image.src.landscape);
  });
  render();
}

function render() {
  allImages.map((url) => {
    let img = document.createElement("img");
    img.src = url;
    img.width = slideSize / 2;
    img.height = slideSize / 2;
    img.style.objectFit = "cover";
    massiv.push(img);
    container.appendChild(img);
  });
  massiv[counter + 1].width = slideSize;
  massiv[counter + 1].height = slideSize;
  massiv[counter + 1].style.margin = 0;
}
getImages();

left.onclick = () => {
  if (counter > -1) {
    counter -= 1;
    massiv[counter + 1].height = slideSize;
    massiv[counter + 1].width = slideSize;
    massiv[counter + 1].style.margin = 0;
    massiv[counter + 2].width = slideSize / 2;
    massiv[counter + 2].height = slideSize / 2;
    massiv[counter + 2].style.margin = 100 + "px";
    container.style.transform = `translateX(${-counter * slideSize}px)`;
  }
};

right.onclick = () => {
  if (counter < allImages.length - 2) {
    counter += 1;
    massiv[counter + 1].height = slideSize;
    massiv[counter + 1].width = slideSize;
    massiv[counter + 1].style.margin = 0;
    massiv[counter].height = slideSize / 2;
    massiv[counter].width = slideSize / 2;
    massiv[counter].style.margin = 100 + "px";
    container.style.transform = `translateX(${-counter * slideSize}px)`;
  }
};

// const API_KEY = "563492ad6f91700001000001655b3dcd6ee44b8c9bb3116140e09fc1";
// const allImages = [];
// const container = document.getElementById("container");
// const left = document.getElementById("left");
// const right = document.getElementById("right");
// const slidesToView = 3;
// const slideSize = 400;
// let counter = 0;

// container.style.width =
//   slidesToView * slideSize + (slidesToView - 1) * 10 + "px";
// async function getImages(perPage = 33, page = 2) {
//   const result = await fetch(
//     `https://api.pexels.com/v1/curated?per_page=${perPage}&page=${page}`,
//     {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization: API_KEY,
//       },
//     }
//   );
//   const images = await result.json();
//   images.photos.forEach((image) => {
//     allImages.push(image.src.landscape);
//   });
//   render();
// }

// function render() {
//   allImages.map((url) => {
//     let img = document.createElement("img");
//     img.src = url;
//     img.width = slideSize;
//     img.height = slideSize;
//     img.style.objectFit = "cover";
//     container.appendChild(img);
//   });
// }
// getImages();

// left.onclick = () => {
//   if (counter < 0) {
//     counter += 1;
//     container.style.transform = `translateX(${counter * (slideSize + 10)}px)`;
//   }
// };

// right.onclick = () => {
//   if (counter > -allImages.length + 3) {
//     counter -= 1;
//     container.style.transform = `translateX(${counter * (slideSize + 10)}px)`;
//   }
// };
