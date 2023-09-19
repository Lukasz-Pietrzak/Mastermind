
document.addEventListener("DOMContentLoaded", function () {
    var canvas2 = document.getElementById("myCanvas2");
    var context2 = canvas2.getContext("2d");


    //contents - CTRL + F
    // 1. Responsive for web size

    // 2. Loop to draw rectangles and store positions
    // 2.1 - Creating the "popraw" rectangle resposible for restoring previous clicked rectangle

    // 3. Resposible for giving cursor:pointer in correct position

    // 4. Responsible for drawing rectangle in canvas1 with the same color which user has clicked in canvas2

    var color = ["red", "green", "blue", "saddlebrown", "yellow", "fuchsia", "grey"];


    //1. Responsive for web size
    var rectWidth = 100;
    var rectHeight = 100;


    var canvasHeight = canvas2.height;

    //Resizing rectangles for smaller resolution
        if (window.innerWidth >= 1400) {
            rectWidth = 100;
            rectHeight = 100;
            var startX = 0;
        } else if (window.innerWidth < 1400 && window.innerHeight + 139 > 600) {
            let canvasWidth = canvas2.width;
            rectWidth = 70;
            rectHeight = 70;
            startX = (canvasWidth - rectWidth * 8 - 140) / 2 - 90;
        }

        else if (window.innerHeight + 139 === 600){
            let canvasWidth = canvas2.width;
            rectWidth = 50;
            rectHeight = 50;
            startX = (canvasWidth - rectWidth * 8 - 140) / 2 - 70;
        }

    var startY = (canvasHeight - rectHeight) / 4;

// Store rectangle positions for hit testing
    var rectangles = [];


    //Reset game if it's won
    window.addEventListener("message", function (event) {
        if (event.data.action === "gameWin") {
            console.log("Game Win!");
            document.getElementById("tekst2").innerHTML = "Wygrałeś! <span id='Jeszcze-raz' onclick='location.reload()'>Jeszcze raz?</span>"


            //Clear rectangles
            context2.clearRect(0, 0, 1110, 120);

            //Turn off pointer
            let disabledElements = document.querySelectorAll(".disabled");

// Iterate through the elements and set the "pointer-events" rule to "none"
            for (let i = 0; i < disabledElements.length; i++) {
                disabledElements[i].style.pointerEvents = "none";
            }
        }
    });


    // 2. Loop to draw rectangles and store positions
    for (let i = 0; i < color.length + 1; i++) {

        context2.fillStyle = color[i];

        //Spaces between rectangles for smaller resolution
        if (window.innerWidth >= 1400) {
            startX = startX + 120;
        }else if (window.innerWidth < 1400 && window.innerHeight + 139 > 600) {
            startX = startX + 90;
        }
        else if (window.innerHeight <= 1280 && window.innerHeight + 139 === 600) {
            startX = startX + 70;
        }

        //Drawing rectangles
        context2.fillRect(startX, startY, rectWidth, rectHeight);

        //Saving rectangles positions for pointer
        rectangles.push({x: startX, y: startY, width: rectWidth, height: rectHeight});

        //2.1 - Creating the "popraw" rectangle resposible for restoring previous clicked rectangle
        if (i === color.length) {
            context2.fillStyle = "#2A292B";
            context2.fillRect(startX, startY, rectWidth, rectHeight);

            // Adding a border to the last rectangle
            context2.strokeStyle = "gray"; // Set the border color
            context2.lineWidth = 1; // Set the border width
            context2.strokeRect(startX, startY, rectWidth, rectHeight);

            // Adding text inside the last rectangle
            context2.fillStyle = "gray"; // Set the text color
            const text = "popraw"; // The text to display
            const textX = startX + rectWidth / 2; // X coordinate for text centering
            const textY = startY + rectHeight / 2; // Y coordinate for text centering

            //Setting the proper font size for resolution
            if (window.innerHeight <= 1280 && window.innerHeight + 139 === 600){
                context2.font = "12px Arial"; // Set the font size and type
            }
            else {
                context2.font = "17px Arial"; // Set the font size and type
            }

            context2.textAlign = "center"; // Center the text horizontally
            context2.textBaseline = "middle"; // Center the text vertically
            context2.fillText(text, textX, textY);
        }
    }


//3. Resposible for giving cursor:pointer in correct position
    canvas2.addEventListener("mousemove", function (event){



        var rect = canvas2.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        var cursorStyle = "default";

        for (let i = 0; i < rectangles.length; i++) {
            if (
            mouseX >= rectangles[i].x && mouseX <= rectangles[i].x + rectangles[i].width &&
            mouseY >= rectangles[i].y && mouseY <= rectangles[i].y + rectangles[i].height
        ){
                cursorStyle = "pointer";

            }

        }


        canvas2.style.cursor = cursorStyle;

    })

    //4. Responsible for drawing rectangle in canvas1 with the same color which user has clicked in canvas2
    let positionX = 60;
    canvas2.addEventListener("click", function(event) {
        const clickX = event.clientX - canvas2.getBoundingClientRect().left;
        const clickY = event.clientY - canvas2.getBoundingClientRect().top;
        for (let i = 0; i < rectangles.length; i++) {
            const rect = rectangles[i];
            if (clickX >= rect.x && clickX <= rect.x + rectWidth &&
                clickY >= rect.y && clickY <= rect.y + rectHeight) {
                const selectedColor = color[i];
                context2.fillStyle = selectedColor;
                // Send message with color and position
                if (i < 7 && positionX < 60 + 150 * 5) {
                    positionX = positionX + 150;
                    window.addEventListener("message", function (event) {
                        if (event.data.action === "counter5"){
                            positionX = 60;
                        }
                    })
                    window.parent.postMessage({
                        action: "paintRectangle",
                        x: positionX - 150,
                        color: selectedColor
                    }, "*");
                }
                else {
                    if (positionX > 60){
                        positionX = positionX - 150;
                        window.parent.postMessage({
                            action: "deleteRectangle",
                            x: positionX,
                            color: selectedColor
                        }, "*");
                    }

                }
break;
            }
        }
    });




});

