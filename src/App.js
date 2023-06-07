import "./styles.css";
import React, { useState } from "react";
import { ShowColours, findOverlays, mergeOverlays } from "./Overlays";
import { ShowMainHorse } from "./ShowHorseLarge";
import { ShowHorseLegs, ShowHorseFace } from "./ShowHorseSmall";
import { HexColorPicker } from "react-colorful";
import {
  findTrueColourBooleans,
  findActiveColourSliders,
  setNewOverlays,
  setLegDescription,
  validateCombos,
  generateNewDescription
} from "./CheckPatterns";

// this is where you find the body of the html
// if you see something that looks like a funky html tag, thats react
// also anything between {} is reactive code
export default function App() {
  // this shows the current iteration of the horse
  const [horse, setHorse] = useState({
    description: "This can Change",
    leftFrontLeg: "left front",
    rightFrontLeg: "right front",
    leftBackLeg: "left back",
    rightBackLeg: "right back",
    hoofColour: "#355ab7",
    eyeColour: "#355ab7",
    facialMarkings: "#355ab7",
    bodyBase: {},
    bodyOverlays: [],
    legOverlays: [],
    faceOverlays: []
  });

  // the following functions are Reactive and use a state
  // that instantly changes depending on situations, ie.
  // clicking a button or moving the sliders around

  // these save the changes that will be applied to the horse
  const [buttonSettings, setButtonSettings] = useState({
    champagne: 0,
    cream: 0,
    snowdrop: 0,
    sunshine: 0,
    pearl: 0,
    red: false,
    black: false,
    agouti: false,
    bay: false,
    flaxen: false,
    mushroom: false,
    silverDrapple: false,
    dun: false
  });

  // this is the default colour for eye, hoof and facial markings
  const [eyeColour, setEyeColour] = useState("#355ab7");
  const [hoofColour, setHoofColour] = useState("#355ab7");
  const [facialMarkings, setfacialMarkings] = useState("#355ab7");

  // these are the various settings that can be toggled on and off
  const [red, setRed] = useState(false);
  const [black, setBlack] = useState(false);
  const [agouti, setAgouti] = useState(false);
  const [bay, setBay] = useState(false);
  const [flaxen, setFlaxen] = useState(false);
  const [mushroom, setMushroom] = useState(false);
  const [silverDrapple, setSilverDrapple] = useState(false);
  const [dun, setDun] = useState(false);
  // these are the sliders
  const [widthChampagne, setWidthChampagne] = useState(0);
  const [widthCream, setWidthCream] = useState(0);
  const [widthSnowdrop, setWidthSnowdrop] = useState(0);
  const [widthSunshine, setWidthSunshine] = useState(0);

  // this function is called when someone clicks Create Horse
  // it then performs a bunch of logic checks,
  // grabs the appropriate images
  // and then the horse is put together automatically
  const generateHorse = () => {
    let newHorse = horse; // copy existing horse
    // checks if gene combos are valid before making the horse
    // if invalid, sets description to bad horse combo
    if (validateCombos(buttonSettings) === false) {
      newHorse.description = "Bad horse combo";
      setHorse({ ...newHorse });
      return;
    }
    let overlays = {
      foundBody: [],
      foundLegs: [],
      foundFace: []
    }; // list of new overlays
    let newOverlays; // temporary variable for merging overlay lists together
    const trueColourBooleans = findTrueColourBooleans(buttonSettings);
    const activeColourSliders = findActiveColourSliders(buttonSettings);

    // these grab the appropriate overlays based on the list of booleans
    // that are true
    for (const colour of trueColourBooleans) {
      newOverlays = findOverlays(colour);
      overlays = mergeOverlays(overlays, newOverlays);
    }

    // this doesn't do anything bc i don't know what to do yet
    // but it prints out the info of any active slider
    // in the terminal
    for (const slider of activeColourSliders) {
      console.log("active sliders: ", JSON.stringify(slider));
    }

    newHorse.description = generateNewDescription(
      trueColourBooleans,
      activeColourSliders
    );
    newHorse = setLegDescription(
      newHorse,
      trueColourBooleans,
      activeColourSliders
    );
    newHorse = setNewOverlays(newHorse, overlays);
    setHorse({ ...newHorse });
    // ^ puts the data of the new horse into
    // the reactive horse component so the layout will change
    return;
  };

  // these change the slider positions and saves the correct value
  const changeWidthChampagne = (event) => {
    let tmp;
    if (event.target.value < 25) {
      setWidthChampagne(0);
      tmp = 0;
    } else if (event.target.value >= 25 && event.target.value < 75) {
      setWidthChampagne(50);
      tmp = 50;
    } else {
      setWidthChampagne(100);
      tmp = 100;
    }
    setButtonSettings((buttonSettings) => ({
      ...buttonSettings,
      champagne: tmp
    }));
  };

  const changeWidthCream = (event) => {
    let tmp;
    if (event.target.value < 25) {
      setWidthCream(0);
      tmp = 0;
    } else if (event.target.value >= 25 && event.target.value < 75) {
      setWidthCream(50);
      tmp = 50;
    } else {
      setWidthCream(100);
      tmp = 100;
    }
    setButtonSettings((buttonSettings) => ({
      ...buttonSettings,
      cream: tmp
    }));
  };

  const changeWidthSnowdrop = (event) => {
    let tmp;
    if (event.target.value < 25) {
      setWidthSnowdrop(0);
      tmp = 0;
    } else if (event.target.value >= 25 && event.target.value < 75) {
      setWidthSnowdrop(50);
      tmp = 50;
    } else {
      setWidthSnowdrop(100);
      tmp = 100;
    }
    setButtonSettings((buttonSettings) => ({
      ...buttonSettings,
      snowdrop: tmp
    }));
  };

  const changeWidthSunshine = (event) => {
    let tmp;
    if (event.target.value < 25) {
      setWidthSunshine(0);
      tmp = 0;
    } else if (event.target.value >= 25 && event.target.value < 75) {
      setWidthSunshine(50);
      tmp = 50;
    } else {
      setWidthSunshine(100);
      tmp = 100;
    }
    setButtonSettings((buttonSettings) => ({
      ...buttonSettings,
      sunshine: tmp
    }));
  };

  // the main html
  return (
    <div className="game-window">
      <div className="App">
        <div className="Parent">
          <div className="horse-zone">
            <ShowMainHorse horse={horse} />
          </div>
          {/*
           ** Below here you find the sliders, buttons and colour pickers
           ** as well as the smaller horses and the text
           ** this is the right side of the screen
           */}
          <div className="settings-window">
            <div className="settings-sub-section">
              {/* the below section are the sliders */}
              <div className="settings-colours-column">
                <p>
                  Champagne <br />{" "}
                  <input
                    type="range"
                    onChange={(event) => {
                      changeWidthChampagne(event);
                    }}
                    min={0}
                    max={100}
                    step={1}
                    value={widthChampagne}
                  ></input>{" "}
                  <br />
                  Cream <br />{" "}
                  <input
                    type="range"
                    onChange={(event) => {
                      changeWidthCream(event);
                    }}
                    min={0}
                    max={100}
                    step={1}
                    value={widthCream}
                  ></input>{" "}
                  <br />
                  Snowdrop <br />{" "}
                  <input
                    type="range"
                    onChange={(event) => {
                      changeWidthSnowdrop(event);
                    }}
                    min={0}
                    max={100}
                    step={1}
                    value={widthSnowdrop}
                  ></input>{" "}
                  <br />
                  Sunshine <br />{" "}
                  <input
                    type="range"
                    onChange={(event) => {
                      changeWidthSunshine(event);
                    }}
                    min={0}
                    max={100}
                    step={1}
                    value={widthSunshine}
                  ></input>{" "}
                  <br />
                </p>
                {/* the below section are the buttons */}
                <p>
                  <button
                    className="button"
                    onClick={() => {
                      if (red === false) {
                        // this is the logic behind what happens after you click the button
                        setRed(true); // this changes the red boolean in the red useState.
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          red: true
                        })); // this changes the red boolean in the ButtonSettings object
                      } else {
                        setRed(false);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          red: false
                        }));
                      }
                    }}
                    style={{
                      // this allows the backgroundcolor, box shadow and transform
                      // to change based on if agouti is true or false
                      backgroundColor: !red ? "#ebebeb" : "#aaa7a9",
                      boxShadow: !red ? "0 9px #999" : "0 5px #666",
                      transform: !red ? "none" : "translateY(4px)"
                    }}
                  >
                    Red
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      if (black === false) {
                        setBlack(true);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          black: true
                        }));
                      } else {
                        setBlack(false);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          black: false
                        }));
                      }
                    }}
                    style={{
                      backgroundColor: !black ? "#ebebeb" : "#aaa7a9",
                      boxShadow: !black ? "0 9px #999" : "0 5px #666",
                      transform: !black ? "none" : "translateY(4px)"
                    }}
                    value={buttonSettings.black}
                  >
                    Black
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      if (agouti === false) {
                        setAgouti(true);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          agouti: true
                        }));
                      } else {
                        setAgouti(false);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          agouti: false
                        }));
                      }
                    }}
                    style={{
                      backgroundColor: !agouti ? "#ebebeb" : "#aaa7a9",
                      boxShadow: !agouti ? "0 9px #999" : "0 5px #666",
                      transform: !agouti ? "none" : "translateY(4px)"
                    }}
                  >
                    Agouti
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      if (bay === false) {
                        setBay(true); // this saves the bay boolean
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          bay: true
                        })); // this saves the bay boolean in the buttons object
                      } else {
                        setBay(false);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          bay: false
                        }));
                      }
                    }}
                    style={{
                      backgroundColor: !bay ? "#ebebeb" : "#aaa7a9",
                      boxShadow: !bay ? "0 9px #999" : "0 5px #666",
                      transform: !bay ? "none" : "translateY(4px)"
                    }}
                  >
                    Bay
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      if (flaxen === false) {
                        setFlaxen(true);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          flaxen: true
                        }));
                      } else {
                        setFlaxen(false);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          flaxen: false
                        }));
                      }
                    }}
                    style={{
                      backgroundColor: !flaxen ? "#ebebeb" : "#aaa7a9",
                      boxShadow: !flaxen ? "0 9px #999" : "0 5px #666",
                      transform: !flaxen ? "none" : "translateY(4px)"
                    }}
                  >
                    Flaxen
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      if (mushroom === false) {
                        setMushroom(true);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          mushroom: true
                        }));
                      } else {
                        setMushroom(false);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          mushroom: false
                        }));
                      }
                    }}
                    style={{
                      backgroundColor: !mushroom ? "#ebebeb" : "#aaa7a9",
                      boxShadow: !mushroom ? "0 9px #999" : "0 5px #666",
                      transform: !mushroom ? "none" : "translateY(4px)"
                    }}
                  >
                    Mushroom
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      if (silverDrapple === false) {
                        setSilverDrapple(true);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          silverDrapple: true
                        }));
                      } else {
                        setSilverDrapple(false);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          silverDrapple: false
                        }));
                      }
                    }}
                    style={{
                      backgroundColor: !silverDrapple ? "#ebebeb" : "#aaa7a9",
                      boxShadow: !silverDrapple ? "0 9px #999" : "0 5px #666",
                      transform: !silverDrapple ? "none" : "translateY(4px)"
                    }}
                  >
                    Silver drapple
                  </button>
                  <button
                    className="button"
                    onClick={() => {
                      if (dun === false) {
                        setDun(true);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          dun: true
                        }));
                      } else {
                        setDun(false);
                        setButtonSettings((buttonSettings) => ({
                          ...buttonSettings,
                          dun: false
                        }));
                      }
                    }}
                    style={{
                      backgroundColor: !dun ? "#ebebeb" : "#aaa7a9",
                      boxShadow: !dun ? "0 9px #999" : "0 5px #666",
                      transform: !dun ? "none" : "translateY(4px)"
                    }}
                  >
                    Dun
                  </button>
                </p>
                {/* Upon clicking this button, the createHorse function will trigger
                and the appropriate layers and such will be applied to create the horse */}
                <p>
                  <button className="button" onClick={generateHorse}>
                    Create Horse
                  </button>
                </p>
              </div>
              {/*
               ** This contains all the code for
               ** the overview images */}
              <div className="settings-horse-overview">
                <div className="settings-horse-choices">
                  <ShowHorseLegs horse={horse} />
                </div>
                <div className="settings-horse-choices">
                  {/* these will change colour with the colour picker choice */}
                  <ShowColours horse={horse} />
                  {/* this is the little horse face */}
                  <ShowHorseFace horse={horse} />
                </div>
              </div>
            </div>
            {/* the below classes are for the colour pickers for the eyes, hooves and markings */}
            <div className="colour-picker">
              <div className="colour-picker-eyes">
                eyes
                <HexColorPicker
                  color={eyeColour}
                  onChange={(eyeColour) => {
                    setEyeColour(eyeColour);
                    setHorse((horse) => ({
                      ...horse,
                      eyeColour: eyeColour
                    }));
                  }}
                />
              </div>
              <div className="colour-picker-hoof">
                hoof
                <HexColorPicker
                  color={hoofColour}
                  onChange={(hoofColour) => {
                    setHoofColour(hoofColour);
                    setHorse((horse) => ({
                      ...horse,
                      hoofColour: hoofColour
                    }));
                  }}
                />
              </div>
              <div className="colour-picker-face">
                facial markings
                <HexColorPicker
                  color={facialMarkings}
                  onChange={(facialMarkings) => {
                    setfacialMarkings(facialMarkings);
                    setHorse((horse) => ({
                      ...horse,
                      facialMarkings: facialMarkings
                    }));
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
