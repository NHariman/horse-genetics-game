export const validateCombos = (buttonSettings) => {
  if (buttonSettings.dun && buttonSettings.red) {
    return false;
  }
  return true;
};

export const findTrueColourBooleans = (buttonSettings) => {
  let trueBooleans = [];
  if (buttonSettings.red) {
    trueBooleans.push("red");
  }
  if (buttonSettings.black) {
    trueBooleans.push("black");
  }
  if (buttonSettings.agouti) {
    trueBooleans.push("agouti");
  }
  if (buttonSettings.bay) {
    trueBooleans.push("bay");
  }
  if (buttonSettings.flaxen) {
    trueBooleans.push("flaxen");
  }
  if (buttonSettings.mushroom) {
    trueBooleans.push("mushroom");
  }
  if (buttonSettings.silverDrapple) {
    trueBooleans.push("silverdrapple");
  }
  if (buttonSettings.dun) {
    trueBooleans.push("dun");
  }

  return trueBooleans;
};

export const findActiveColourSliders = (buttonSettings) => {
  let activeColourSliders = [];

  if (buttonSettings.champagne > 0) {
    activeColourSliders.push({
      colour: "champagne",
      value: buttonSettings.champagne
    });
  }
  if (buttonSettings.cream > 0) {
    activeColourSliders.push({
      colour: "cream",
      value: buttonSettings.cream
    });
  }
  if (buttonSettings.snowdrop > 0) {
    activeColourSliders.push({
      colour: "snowdrop",
      value: buttonSettings.snowdrop
    });
  }
  if (buttonSettings.sunshine > 0) {
    activeColourSliders.push({
      colour: "sunshine",
      value: buttonSettings.sunshine
    });
  }
  if (buttonSettings.pearl > 0) {
    activeColourSliders.push({
      colour: "pearl",
      value: buttonSettings.pearl
    });
  }

  return activeColourSliders;
};

export const generateNewDescription = (
  trueColourBooleans,
  activeColourSliders
) => {
  if (trueColourBooleans.length === 0 && activeColourSliders.length === 0) {
    return "This horse has no genes active.";
  }
  // depending on what booleans and sliders have been set, generate
  // a description for the horse
  // idk what to do here yet, so this just lists the active sliders
  let newDescription = "This horse has active genes: ";

  console.log(JSON.stringify(trueColourBooleans));

  if (trueColourBooleans.length !== 0) {
    for (const colour of trueColourBooleans) {
      newDescription += colour + " ";
    }
  }
  if (activeColourSliders.length !== 0) {
    for (const slider of activeColourSliders) {
      newDescription += slider.colour + " at value: " + slider.value + " ";
    }
  }

  return newDescription;
};

export const setLegDescription = (
  newHorse,
  trueColourBooleans,
  activeColourSliders
) => {
  // based on the combo of booleans and sliders, set the right names for the legs?
  // use: leftFrontLeg, rightFrontLeg, leftBackLeg, rightBackLeg
  if (trueColourBooleans.length === 0 && activeColourSliders.length === 0) {
    return newHorse;
  }
  // this just does smth random if red is activated for fun
  if (trueColourBooleans.includes("red") === true) {
    newHorse.leftBackLeg = "something else";
    newHorse.leftFrontLeg = "another thing";
    newHorse.rightBackLeg = "third thing";
    newHorse.rightFrontLeg = "fourth thing";
  } else {
    newHorse.leftBackLeg = "left back";
    newHorse.leftFrontLeg = "left front";
    newHorse.rightBackLeg = "right back";
    newHorse.rightFrontLeg = "right front";
  }
  // doesn't do anything right now because idk what it should do yet
  // but it would change the leg descriptions otherwise
  return newHorse;
};

export const setNewOverlays = (horse, overlays) => {
  let newHorse = horse;

  newHorse.bodyOverlays = overlays.foundBody ? overlays.foundBody : [];
  newHorse.legOverlays = overlays.foundLegs ? overlays.foundLegs : [];
  newHorse.faceOverlays = overlays.foundFace ? overlays.foundFace : [];

  return newHorse;
};
