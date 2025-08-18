function ShapesTool() {
	this.name = "shapesTool";
	this.icon = "assets/shapes.jpg";

	this.shapeType = null;
	this.startX = 0;
	this.startY = 0;
	this.drawing = false;

	this.draw = function () {
		console.log("ShapesTool draw() called");
		if (this.shapeType && this.drawing) {
			loadPixels(); // Clear any trails while dragging
			fill(colourP.selectedColour);
			stroke(colourP.selectedColour);
			strokeWeight(helpers ? helpers.getStrokeWeight() : 1);

			switch (this.shapeType) {
				case "rectangle":
					rect(this.startX, this.startY, mouseX - this.startX, mouseY - this.startY);
					break;
				case "ellipse":
					let ellipseW = mouseX - this.startX;
					let ellipseH = mouseY - this.startY;
					ellipse(this.startX + ellipseW / 2, this.startY + ellipseH / 2, abs(ellipseW), abs(ellipseH));
					break;
				case "triangle":
					triangle(
						this.startX, this.startY,
						mouseX, mouseY,
						this.startX * 2 - mouseX, mouseY
					);
					break;
			}
		}
	};

	this.mousePressed = function () {
		console.log("mousePressed in ShapesTool");
		if (this.shapeType) {
			this.startX = mouseX;
			this.startY = mouseY;
			this.drawing = true;
			loadPixels(); // Save canvas state
		}
	};

	this.mouseReleased = function () {
		console.log("mouseReleased in ShapesTool");
		if (this.drawing) {
			updatePixels(); // Finalize shape
			this.drawing = false;
		}
	};

	this.populateOptions = function () {
		console.log("ShapesTool.populateOptions() called"); // Debug log
		select(".options").html(`
			<div class="shape-options">
				<button class="shape-btn" data-shape="rectangle">Rectangle</button>
				<button class="shape-btn" data-shape="ellipse">Ellipse</button>
				<button class="shape-btn" data-shape="triangle">Triangle</button>
			</div>
		`);

		// Safe loop over shape buttons
		let buttons = selectAll(".shape-btn");
		for (let i = 0; i < buttons.length; i++) {
			let btn = buttons[i];
			btn.mouseClicked(() => {
				this.shapeType = btn.attribute("data-shape");
				this.drawing = false;
				console.log("Shape selected:", this.shapeType);
			});
		}
	};

	this.unselectTool = function () {
		select(".options").html(""); // Clear UI
	};
}
