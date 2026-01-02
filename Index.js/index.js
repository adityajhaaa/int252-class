// Array of image URLs
const images = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/200",
  "https://via.placeholder.com/250"
];

// Function to display images using map
// function displayImages() {
//   const card = document.querySelector(".card");

//   // Use map to create image elements
//   const imageElements = images.map((src) => {
//     const img = document.createElement("img");
//     img.src = src;
//     img.alt = "Sample Image";
//     img.style.margin = "10px";
//     img.style.borderRadius = "8px";
//     img.style.width = "150px";
//     return img;
//   });

//   // Append all images to the card
//   imageElements.forEach((img) => card.appendChild(img));
// }

// // Call the function when the page loads
// window.onload = displayImages;

// const numbers = [8,12,18,28,34,62,128,218,517,810];
// let sum = 0;

// for (let i = 0; i < numbers.length; i++) {
//   sum += numbers[i];
// }

// console.log("Sum:", sum);

// const numbers = [10, 20, 30, 40];

// const sum = numbers.reduce((acc, curr) => acc + curr, 0);
// console.log(sum); // Output: 100

// let fruits = ["apple", "banana", "cherry", "date", "elderberry"];
// console.log(...fruits,...numbers);
// let[a,b,c,d,e]=fruits;
// console.log(a,b,c,d,e);

const name = document.getElementById("input");
const email = document.getElementById("input");
const phone = document.getElementById("input");
const button = document.getElementById("button");
const output = document.getElementById("output");

button.addEventListener("click", () => {
  output.innerHTML = `Name: ${name.value}, Email: ${email.value}, Phone: ${phone.value}`;
});