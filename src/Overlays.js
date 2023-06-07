import "./styles.css";
import { bodyOverlays, legOverlays, faceOverlays } from "./Images";

export const GenerateOverlays = ({ overlays }) => {
  if (typeof overlays === "undefined") {
    return;
  } else {
    let filteredOverlays = [];
    for (const overlay of overlays) {
      if (typeof overlay !== "undefined") {
        filteredOverlays.push(overlay);
      }
    }
    return (
      <>
        {filteredOverlays.map((overlay, index) => (
          <div key={index} className="leg-overlay">
            <img src={overlay.image} alt="" />
          </div>
        ))}
      </>
    );
  }
};

export const ShowColours = ({ horse }) => {
  if (typeof horse === "undefined") {
    return;
  } else {
    return (
      <>
        <div className="settings-horse-colours">
          <p style={{ backgroundColor: horse.hoofColour }}>
            Hoof colour: <br /> {horse.hoofColour}
          </p>
          <p style={{ backgroundColor: horse.eyeColour }}>
            Eye colour: <br />
            {horse.eyeColour}
          </p>
          <p style={{ backgroundColor: horse.facialMarkings }}>
            Facial markings: <br />
            {horse.facialMarkings}
          </p>
        </div>
      </>
    );
  }
};

// these collect the images belonging to each gene
// for the body image, leg image and face image
// from the Images.js "database"
export const findBody = (gene) => {
  const result = bodyOverlays.find(({ pattern }) => pattern === gene);
  return result;
};

export const findLegs = (gene) => {
  return legOverlays.find(({ pattern }) => pattern === gene);
};

export const findFace = (gene) => {
  return faceOverlays.find(({ pattern }) => pattern === gene);
};

export const findOverlays = (gene) => {
  let overlays = {
    foundLegs: {},
    foundBody: {},
    foundFace: {}
  };

  overlays.foundLegs = findLegs(gene);
  overlays.foundBody = findBody(gene);
  overlays.foundFace = findFace(gene);
  return overlays;
};

export const mergeOverlays = (oldOverlays, newOverlays) => {
  let overlays = {
    foundBody: [],
    foundLegs: [],
    foundFace: []
  };

  overlays.foundBody = oldOverlays.foundBody;
  overlays.foundLegs = oldOverlays.foundLegs;
  overlays.foundFace = oldOverlays.foundFace;
  overlays.foundBody.push(newOverlays.foundBody);
  overlays.foundLegs.push(newOverlays.foundLegs);
  overlays.foundFace.push(newOverlays.foundFace);

  return overlays;
};
