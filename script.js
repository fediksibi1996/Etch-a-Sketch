// Set container to draw squares
const padContainer = document.querySelector(".container");
// To display current dimension
const sqDimensions = document.querySelector(".current-square-size");

// Button and event listener to generate new board
const generateNew = document.querySelector(".generate-new");
generateNew.addEventListener("click", generateNewPad);

function generateSketchPad(size = 16) {
  // Get squares dimensions
  const totalSquares = size * size;
  const padWidth = padContainer.clientWidth / size;
  const padHeight = padContainer.clientHeight / size;

  // Display pad dimensions
  sqDimensions.textContent = `(${size} x ${size})`;

  // Draw squares to DOM
  for (i = totalSquares; i > 0; i--) {
    const square = document.createElement("div");
    square.style.width = padWidth + "px";
    square.style.height = padHeight + "px";
    square.style.backgroundColor = "rgba(0,0,0,0)";
    square.addEventListener("mouseover", highlightSquare);
    padContainer.appendChild(square);
  }
}

function highlightSquare(e) {
  // Generate new color if square current color is white
  if (e.target.style.backgroundColor === "rgba(0, 0, 0, 0)") {
    let redValue = getRandomInt(0, 251);
    let greenValue = getRandomInt(0, 251);
    let blueValue = getRandomInt(0, 251);
    let alphaValue = 0.1;

    e.target.style.backgroundColor = `rgba(${redValue}, ${greenValue}, ${blueValue}, ${alphaValue})`;
  } else {
    // Increase opacity of color if square is colored

    // Get square current color details
    let currentColor = e.target.style.backgroundColor;
    let currentColorLessAlpha = currentColor.slice(0, -4);
    let currentAlphaValue = parseFloat(currentColor.slice(-4, -1));

    // Updates the current color alpha value until it reaches 1
    if (currentAlphaValue < 1) {
      let newAlphaValue = currentAlphaValue + 0.1;

      let updateSquareColor = currentColorLessAlpha + newAlphaValue + ")";
      e.target.style.backgroundColor = updateSquareColor;
    }
  }
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function generateNewPad() {
  const newBoardSize = prompt(
    "How many squares per side do you want? (Min-Max: 1-100)"
  );

  if (newBoardSize > 100 || newBoardSize <= 0 || !newBoardSize) {
    alert("Please input a value between 1 - 100");
  } else {
    padContainer.innerHTML = "";
    generateSketchPad(newBoardSize);
  }
}

generateSketchPad();