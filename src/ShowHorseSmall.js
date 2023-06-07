import "./styles.css";
import { GenerateOverlays } from "./Overlays";

export const ShowHorseLegs = ({ horse }) => {
  if (typeof horse === "undefined") {
    return;
  } else {
    return (
      <>
        {/* the below section shows the leg overlays and text */}
        <div className="settings-horse-image-legs">
          <div className="leg-overlay">
            <img src={require("./img/horse-body.png")} alt="horse" />
          </div>
          <GenerateOverlays overlays={horse.legOverlays} />
        </div>

        <div className="settings-horse-text-legs">
          <div className="settings-horse-text-legs-sub">
            <p>
              {/* you don't change this, you change what's in horse.rightFrontLeg */}
              R: {horse.rightFrontLeg}
              <br />
              L: {horse.leftFrontLeg}
            </p>
          </div>
          <div className="settings-horse-text-legs-sub">
            <p>
              R: {horse.rightBackLeg}
              <br />
              L: {horse.leftBackLeg}
            </p>
          </div>
        </div>
      </>
    );
  }
};

export const ShowHorseFace = ({ horse }) => {
  if (typeof horse === "undefined") {
    return;
  } else {
    return (
      <>
        <div className="settings-horse-head">
          <div className="leg-overlay">
            <img src={require("./img/horse-head.png")} alt="horse head" />
          </div>
          <GenerateOverlays overlays={horse.faceOverlays} />
        </div>
      </>
    );
  }
};
