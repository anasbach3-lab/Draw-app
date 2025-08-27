function TextTool() {
  this.name = "textTool";
  this.icon = "assets/text.jpg";

  let x, y, w, h;
  let selecting = false;
  let inputBox = null;
  let fontSize = 20;

  this.draw = () => {
    if (selecting) {
      updatePixels();
      noFill();
      stroke(0);
      rect(x, y, w, h);
    }
  };

  this.mousePressed = () => {
    if (mouseButton === LEFT && !inputBox) {
      selecting = true;
      x = mouseX;
      y = mouseY;
      loadPixels();
    }
  };

  this.mouseDragged = () => {
    if (selecting) {
      w = mouseX - x;
      h = mouseY - y;
    }
  };

  this.mouseReleased = () => {
    if (!selecting) return;
    selecting = false;

    if (Math.abs(w) < 10 || Math.abs(h) < 10) {
      updatePixels();
      return;
    }

    // Create textarea directly in page coords
    inputBox = createElement('textarea');
    inputBox.position(x, y);  // <-- use p5 canvas coords directly
    inputBox.size(w, h);

    // Style
    inputBox.style('font-size', fontSize + 'px');
    inputBox.style('color', colourP ? colourP.selectedColour : '#000');
    inputBox.style('background', 'rgba(255,255,255,0.9)');
    inputBox.style('border', '1px solid #000');
    inputBox.style('outline', 'none');
    inputBox.style('resize', 'none');
    inputBox.elt.focus();

    // Commit text on Enter
    inputBox.elt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        commitText();
      }
    });

    inputBox.elt.addEventListener('blur', commitText);
  };

  function commitText() {
    if (!inputBox) return;
    const txt = inputBox.value();
    inputBox.remove();
    inputBox = null;

    updatePixels();
    if (txt && txt.trim().length) {
      push();
      fill(colourP ? colourP.selectedColour : '#000');
      noStroke();
      textSize(fontSize);
      text(txt, x, y, w, h);
      pop();
      loadPixels();
    }
  }

  this.unselectTool = () => {
    if (inputBox) {
      inputBox.remove();
      inputBox = null;
    }
    updatePixels();
  };

  this.populateOptions = () => {
    select("#options").html("");

    const sizeLabel = createDiv("Font Size:");
    sizeLabel.parent("#options");

    const sizeInput = createInput(fontSize, "number");
    sizeInput.parent("#options");
    sizeInput.input(() => {
      fontSize = int(sizeInput.value());
    });
  };
}
