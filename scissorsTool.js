function ScissorsTool() {
    this.name = "scissors";
    this.icon = "assets/scissors.jpg";
    
    // Variables from the example code
    this.selectMode = 0; // 0: idle, 1: selecting, 2: pasting
    this.selectedArea = {x: 0, y: 0, w: 100, h: 100};
    this.selectedPixels = null;
    this.previousMouseX = -1;
    this.previousMouseY = -1;
    
    this.draw = function() {
        // If we're in selection mode and dragging, show selection rectangle
        if (this.selectMode == 1 && mouseIsPressed) {
            updatePixels(); // Restore the canvas
            
            // Draw the selection rectangle
            noStroke();
            fill(255, 0, 0, 100);
            rect(this.selectedArea.x, this.selectedArea.y, this.selectedArea.w, this.selectedArea.h);
        }
        
        // If we have a selection and are in paste mode, show it at mouse position
        if (this.selectMode == 2 && this.selectedPixels) {
            image(this.selectedPixels, mouseX, mouseY);
        }
    };
    
    this.mousePressed = function() {
        if (this.selectMode == 1) {
            // Start selection
            this.selectedArea.x = mouseX;
            this.selectedArea.y = mouseY;
            this.selectedArea.w = 0;
            this.selectedArea.h = 0;
        } 
        else if (this.selectMode == 2 && this.selectedPixels) {
            // Paste the selection
            image(this.selectedPixels, mouseX, mouseY);
        }
    };
    
    this.mouseDragged = function() {
        if (this.selectMode == 1) {
            // Update selection size while dragging
            var w = mouseX - this.selectedArea.x;
            var h = mouseY - this.selectedArea.y;
            
            this.selectedArea.w = w;
            this.selectedArea.h = h;
        }
    };
    
    this.mouseReleased = function() {
        // Reset previous mouse positions
        this.previousMouseX = -1;
        this.previousMouseY = -1;
    };
    
    this.populateOptions = function() {
        select('.options').html(`
            <div class="scissors-options">
                <button id="scissorsActionButton">Select Area</button>
                <div id="scissorsInstructions">
                    <p>1. Click 'Select Area' to start</p>
                    <p>2. Drag to select an area</p>
                    <p>3. Click 'Cut' to extract</p>
                    <p>4. Click to paste selection</p>
                    <p>5. Click 'End Paste' to finish</p>
                </div>
            </div>
        `);
        
        // Add event listener for the action button
        let actionButton = select('#scissorsActionButton');
        actionButton.mouseClicked(() => {
            this.handleButtonPress();
        });
    };
    
    this.handleButtonPress = function() {
        if (this.selectMode == 0) {
            // Start selection mode
            this.selectMode = 1;
            select('#scissorsActionButton').html("Cut");
            loadPixels(); // Store current frame
        } 
        else if (this.selectMode == 1) {
            // Cut the selected area
            this.selectMode = 2;
            select('#scissorsActionButton').html("End Paste");
            
            // Refresh the screen
            updatePixels();
            
            // Store the selected pixels
            this.selectedPixels = get(
                this.selectedArea.x, 
                this.selectedArea.y, 
                this.selectedArea.w, 
                this.selectedArea.h
            );
            
            // Draw a white rectangle over the selected area (cut it out)
            fill(255);
            noStroke();
            rect(
                this.selectedArea.x, 
                this.selectedArea.y, 
                this.selectedArea.w, 
                this.selectedArea.h
            );
        } 
        else if (this.selectMode == 2) {
            // End paste mode
            this.selectMode = 0;
            select('#scissorsActionButton').html("Select Area");
            
            // Reset selection
            loadPixels();
            this.selectedArea = {x: 0, y: 0, w: 100, h: 100};
        }
    };
    
    this.unselectTool = function() {
        // Reset to default state
        this.selectMode = 0;
        this.selectedArea = {x: 0, y: 0, w: 100, h: 100};
        this.selectedPixels = null;
        select('.options').html('');
    };
}