// these are where you save the img links belonging to each image
// always use the same format as shown here
// bodyOverlays is for the big horse on the left
// leg overlays for the little horse on the right
// face for the horse face on the right
export const bodyOverlays = [
  { pattern: "name", image: require("./img/template-horse.png") },
  { pattern: "red", image: require("./img/horsefullface.png") },
  { pattern: "black", image: require("./img/horsefullmane.png") },
  { pattern: "agouti", image: require("./img/horsefullfrontlegleft.png") },
  { pattern: "name", image: require("./img/horsefullfrontlegright.png") },
  { pattern: "name", image: require("./img/horsefullhindlegleft.png") },
  { pattern: "name", image: require("./img/horsefullhindlegright.png") }
];

export const legOverlays = [
  { pattern: "red", image: require("./img/leftfrontleg.png") },
  { pattern: "black", image: require("./img/rightfrontleg.png") },
  { pattern: "agouti", image: require("./img/leftbackleg.png") },
  { pattern: "name", image: require("./img/rightbackleg.png") }
];

export const faceOverlays = [
  { pattern: "red", image: require("./img/horse-headcheek.png") },
  { pattern: "black", image: require("./img/horse-headforehead.png") },
  { pattern: "agouti", image: require("./img/horse-headmuzzle.png") }
];
