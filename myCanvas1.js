let DOMContentLoaded = false;
document.addEventListener("DOMContentLoaded", function() {
    if (!DOMContentLoaded) {
        DOMContentLoaded = true;

        //contents - CTRL + F
        // 1. Function to draw the arrow

        // 2. The condition is responsible for draw and counting turn of the game

        // 3. The condition is responsible for drawing 5 rectangles with white lines

        // 4. Function getAlgorithmColor

        // 5. Window addEventListener from myCanvas2.js connecting click-event rectangles from
        // that file with the
        // rectangles from this file

        //6. Paint rectangle event start
        //6.1 The previous array will be wiped-out
        //6.2 - Clear all the rectangles generated from previous round
        //6.3 Alghoritm color which is the main engine the entire game
        //6.4 Alghoritm color adding ok face under rectangles
        //6.5 Alghoritm color adding blue face under rectangles
        //6.6 Alghoritm color adding red face under rectangles - 276/300

        // 7. Draw rectangles with suitable color from the previous turn, reset alghoritmColor2, detaling

        //8. Delete previous color of rectangle after click the rectangle which has name "popraw",
        // in addition to delete the previous record in alghoritmColor2 array.

        // 9. Function clear arrow


        let canvas1 = document.getElementById("myCanvas1");
        let context1 = canvas1.getContext("2d");

        let rectWidth1 = 100;
        let rectHeight1 = 100;
        let startX1 = 60;
        let startY1 = 10;

        canvas1.style.width = "123%";



// 1. Function to draw the arrow
        function drawArrow(initialStartX, initialStartY, rectWidth, rectHeight) {
            context1.beginPath();
            context1.strokeStyle = "white";
            //Drawing arrow to the next position
            initialStartX = initialStartX + 150;

            // Draw the arrow shape
            context1.moveTo(initialStartX + rectWidth / 2, initialStartY + rectHeight + 12);
            context1.lineTo(initialStartX + rectWidth / 2 + 8, initialStartY + rectHeight + 25);
            context1.lineTo(initialStartX + rectWidth / 2 - 8, initialStartY + rectHeight + 25);
            context1.closePath();

            context1.lineWidth = 6;
            context1.moveTo(initialStartX + rectWidth / 2, initialStartY + rectHeight + 15);
            context1.lineTo(initialStartX + rectWidth / 2, initialStartY + rectHeight + 40);
            context1.stroke();
        }


//Drawing arrow under the first rectangle
        drawArrow(startX1 - 150, startY1, rectWidth1, rectHeight1);

        var turnCounter = 1;

        for (let i = 0; i <= 5; i++) {

            if (i === 5) {
                //2. The condition is responsible for draw and counting turn of the game
                startX1 = startX1 + 60;
                startY1 = 43;
                const radius = 40;
                const fillColor = "black";
                const borderColor = "gold"; // Border color
                const borderWidth = 2;      // Border width
                context1.arc(startX1, startY1, radius, 0, 2 * Math.PI, false);
                context1.fillStyle = fillColor;
                context1.fill();

                context1.strokeStyle = borderColor;
                context1.lineWidth = borderWidth;
                context1.stroke();

                context1.fillStyle = "gold";

                context1.font = "40px Arial";
                context1.textAlign = "center";
                context1.textBaseline = "middle";

                //If there's next round increase turnCounter by 1
                window.addEventListener("message", function (event) {
                    if (event.data.action === "counter5"){
                        turnCounter++;

                        //Cleaning the previous round
                        context1.clearRect(850, 24, 50, 36)

                        //Drawing another turn counter
                        context1.fillStyle = "gold";
                        context1.font = "40px Arial";
                        context1.fillText(turnCounter, startX1, startY1);
                    }
                })

                //Drawing first turnCounter
                context1.fillText(turnCounter, startX1, startY1);

                context1.fillStyle = "gold";
                const text2 = "RUNDA";
                context1.font = "20px Arial";
                context1.textAlign = "center";
                context1.textBaseline = "middle";
                context1.fillText(text2, startX1, startY1 + radius + 25);


            } else {
//3. The condition is responsible for drawing 5 rectangles with white lines
                context1.beginPath();
                context1.fillStyle = "#2A292B";
                context1.fillRect(startX1, startY1, rectWidth1, rectHeight1);

                context1.fillStyle = "black";
                context1.fillRect(startX1, startY1, rectWidth1, rectHeight1);

                context1.strokeStyle = "white";
                context1.lineWidth = 2;
                context1.strokeRect(startX1, startY1, rectWidth1, rectHeight1);
                context1.closePath();

                //Generating rectangles in suitable positions
                startX1 = startX1 + 150;

            }
        }

        //Color responsible for algorithm
        var color = ["red", "green", "blue", "saddlebrown", "yellow", "fuchsia", "grey"];


        let counter = 0;

        let algorithmColor = [];

        //4. Function getAlgorithmColor
        function getAlgorithmColor(algorithm, max) {
            for (let i = 0; i < 5; i++) {
                let randomNumber;
                //Generating random number
                randomNumber = Math.floor(Math.random() * max);
                //Put random number into the array
                algorithm.push(color[randomNumber]);
            }
        }

        //Algorithm color has been generated until the end of the game
        getAlgorithmColor(algorithmColor, 7);
        console.log(algorithmColor);


        //saving algorithmColor
        const algorithmColorSafe = JSON.stringify(algorithmColor);
        localStorage.setItem('algorithmColor', algorithmColorSafe);

        let getAlgorithmColors = false;

        //Array saving colors that the user selected
        let alghoritmColor2 = [];

        let initialStartY = 10;

        let okFace = 0;
        let blueFace = 0;
        let redFace = 0;

        // 5. Window addEventListener from myCanvas2.js connecting click-event rectangles from myCanvas2.js with the
        //rectangles from this file
        window.addEventListener("message", function (event) {
            if (event.data.action === "paintRectangle") {
                //6. Paint rectangle event start
                counter++;

                //6.1 The previous arrow will be wiped-out
                clearArrow();


                if (counter <= 5 && counter >= 1) {
                    //6.2 - Clear all the rectangles generated from previous round
                    context1.clearRect(0, 190, 132, 175);

                    // Clear all the colors saved in array by user from previous round
                    if (counter === 1){
                        alghoritmColor2 = [];
                    }

                    let initialStartX = event.data.x;

                    //Retrieving color from user
                    context1.fillStyle = event.data.color;
                    alghoritmColor2.push(event.data.color);

                    //6.3 Alghoritm color which is the main engine the entire game
                    if (counter === 5){

                        //Restoring algorithmColor - Give possibility playing in next rounds
                        if (getAlgorithmColors === true){
                            var restoringAlgorithmColor = localStorage.getItem('algorithmColor');
                            algorithmColor = JSON.parse(restoringAlgorithmColor);
                            getAlgorithmColors = false;
                        }

                        //Game win
                        if (algorithmColor.every((color, index) => color === alghoritmColor2[index])) {
                            window.parent.postMessage({
                                action: "gameWin"
                            }, "*")
                    }

                        //Faces getting closer to victory
                        else{
                            const alghoritmColor2Save = JSON.stringify(alghoritmColor2);
                            localStorage.setItem('alghoritmColor2', alghoritmColor2Save);



                            let image = new Image();
                                image.src = "zdjecia/ok.png";

                            let image2 = new Image();
                            image2.src = "zdjecia/elsewhere.png";

                            let image3 = new Image();
                            image3.src = "zdjecia/none.png";

                                let initialStartX2 = 80;
                                let initialStartX3 = 80;
                                let initialStartX4 = 80;

                            // 6.4 Alghoritm color adding ok face under rectangles
                            for (let i = algorithmColor.length - 1; i >= 0; i--) {

                                if (algorithmColor[i] === alghoritmColor2[i]) {

                                    okFace++;

                                    image.onload = function () {
                                        for (let j = 0; j < okFace; j++) {
                                            context1.drawImage(image, initialStartX2, initialStartY + 290, 60, 60);
                                            initialStartX2 = initialStartX2 + 150;
                                        }

                                    }
                                            algorithmColor.splice(i, 1);
                                            alghoritmColor2.splice(i, 1);
                                }
                            }

                            //6.5 Alghoritm color adding blue face under rectangles - 218/262
                            for (let i = 0; i < 5; i++) {
                                if (algorithmColor.includes(alghoritmColor2[i])) {
                                        blueFace++;

                                    image2.onload = function () {
                                        for (let j = 0; j < blueFace; j++) {
                                            if(j === 0) {
                                                //Counting in which position the last okFace is and set one field more
                                                initialStartX3 = 80 + 150 * okFace;

                                                //drawing
                                            context1.drawImage(image2, initialStartX3, initialStartY + 290, 60, 60);
                                                }
                                            else {
                                                context1.drawImage(image2, initialStartX3, initialStartY + 290, 60, 60);
                                            }


                                            initialStartX3 = initialStartX3 + 150;
                                        }

                                    }
                                    //Delete the proper color from algorithmColor
                                        algorithmColor.splice(algorithmColor.indexOf(alghoritmColor2[i]),1);
                                }

                            }

                            var restoringAlgorithmColor2 = localStorage.getItem('alghoritmColor2');
                            alghoritmColor2 = JSON.parse(restoringAlgorithmColor2);

                            //6.6 Alghoritm color adding red face under rectangles - 276/300
                            for (let i = 0; i < 5; i++) {

                                    if (okFace + blueFace + redFace === 5){
                                        break;
                                    }

                                    redFace++;

                                    image3.onload = function () {
                                        for (let j = 0; j < redFace; j++) {
                                            if(j === 0) {
                                                //Counting in which position the last blueFace is and set one field more
                                                initialStartX4 = 80 + 150 * blueFace + 150 * okFace;
                                                context1.drawImage(image3, initialStartX4, initialStartY + 290, 60, 60);
                                            }
                                            else {
                                                context1.drawImage(image3, initialStartX4, initialStartY + 290, 60, 60);
                                            }


                                            initialStartX4 = initialStartX4 + 150;
                                        }
                                }

                            }
                            getAlgorithmColors = true;



                        }

                    }

                    //Painting rectangles
                    context1.clearRect(initialStartX - 5, initialStartY - 7, rectWidth1 + 30, rectHeight1 + 30);
                    context1.fillRect(initialStartX, initialStartY, rectWidth1, rectHeight1);

                    if (counter !== 5) {
                        //Faces must be reset
                        okFace = 0;
                        blueFace = 0;
                        redFace = 0;

                        //Moving arrow to one field
                        drawArrow(initialStartX, initialStartY, rectWidth1, rectHeight1);
                    }

                    else if (counter === 5) {
                        //7. Draw rectangles with suitable color from the previous turn, reset alghoritmColor2
                        //detaling
                        counter = 0;

                        for (let i = 4; i >= 0; i--) {

                            context1.fillStyle = "black";
                            context1.fillRect(initialStartX, initialStartY, rectWidth1, rectHeight1);
                            context1.strokeStyle = "white";
                            context1.lineWidth = 2;
                            context1.strokeRect(initialStartX, initialStartY, rectWidth1, rectHeight1);

                            context1.beginPath();
                            context1.fillStyle = alghoritmColor2[i];
                            context1.fillRect(initialStartX, initialStartY + 180, rectWidth1, rectHeight1);
                            initialStartX = initialStartX - 150;
                            alghoritmColor2.pop();

                        }
                        //Moving arrow at the beginning of the first rectangle
                        drawArrow(-90, initialStartY, rectWidth1, rectHeight1);
                        window.parent.postMessage({
                            action: "counter5"
                        }, "*");
                    }
                }

            } else if (event.data.action === "deleteRectangle") {
                //8. Delete previous color of rectangle after click the rectangle which has name "popraw",
                // in addition to delete the previous record in alghoritmColor2 array.
                if (counter >= 1) {
                    counter--;
                    let initialStartX = event.data.x;
                    context1.fillStyle = "black";
                    context1.fillRect(initialStartX, initialStartY, rectWidth1, rectHeight1);
                    alghoritmColor2.pop();
                    context1.strokeStyle = "white";
                    context1.lineWidth = 2;
                    context1.strokeRect(initialStartX, initialStartY, rectWidth1, rectHeight1);

                    //moving the arrow back one field
                    clearArrow();
                    drawArrow(initialStartX - 150, initialStartY, rectWidth1, rectHeight1);
                } else {
                    counter = 0;
                }

            }

        });

        //9. Function clear arrow
        function clearArrow() {
            context1.clearRect(90, 115, canvas1.width, canvas1.height);
        }

    }
});
