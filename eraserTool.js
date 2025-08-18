function EraserTool() {
	this.name = "eraserTool";
	this.icon = "assets/eraser.jpg"; 

	this.select = function () {
		select("#options").html(`
			<div class="option-group">
				<label>Eraser Size: ${this.size}</label>
				<input type="range" min="1" max="50" value="${this.size}"
					oninput="toolbox.selectedTool.size=parseInt(this.value);
							 this.previousElementSibling.textContent='Eraser Size: ' + this.value;">
			</div>
		`);
	};

	this.draw = function () {
		if (mouseIsPressed) {
			noStroke();
			fill(255); 
			ellipse(mouseX, mouseY, 20, 20);
		}

		
		noFill();
		stroke(150);
		strokeWeight(1);
		ellipse(mouseX, mouseY, this.size);
	};
}
