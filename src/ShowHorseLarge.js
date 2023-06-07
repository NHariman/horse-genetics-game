import "./styles.css";
import { GenerateOverlays } from "./Overlays";

export const ShowMainHorse = ({ horse }) => {
  if (typeof horse === "undefined") {
    return;
  } else {
    return (
      <>
        <div className="description">{horse.description}</div>
        {/* this generates the horse, it has the description box too,
            it's basically anything you find on the left side of the site */}
        <div className="horse">
          <div className="leg-overlay">
            <img src={require("./img/template-horse.png")} alt="a horse" />
          </div>
          {/* this is a react component that takes the props for the body images
              and then generates html overlays for them based on how many there are
              (you can find the code in Overlay.js) */}
          <GenerateOverlays overlays={horse.bodyOverlays} />
        </div>
      </>
    );
  }
};
