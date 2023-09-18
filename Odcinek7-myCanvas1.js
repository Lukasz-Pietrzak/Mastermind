let DOMContentLoaded = false;
document.addEventListener("DOMContentLoaded", function() {
    if (!DOMContentLoaded) {
        DOMContentLoaded = true;

        //This is my modificaction and problem
        //contents - CTRL + F
        // 1. Function to draw the arrow

        // 2. The condition is responsible for draw and counting turn of the game

        // 3. The condition is responsible for drawing 5 rectangles with white lines

        // 4. Function getAlgorithmColor

        // 5. Window addEventListener from Odcinek7-myCanvas2.js connecting click-event rectangles from
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


        let canvas = document.getElementById("myCanvas1");
        let context = canvas.getContext("2d");

        let rectWidth = 100;
        let rectHeight = 100;
        let startX = 60;
        let startY = 10;

        canvas.style.width = "123%";



// 1. Function to draw the arrow
        function drawArrow(initialStartX, initialStartY, rectWidth, rectHeight) {
            context.beginPath();
            context.strokeStyle = "white";
            initialStartX = initialStartX + 150;

            // Draw the arrow shape
            context.moveTo(initialStartX + rectWidth / 2, initialStartY + rectHeight + 12);
            context.lineTo(initialStartX + rectWidth / 2 + 8, initialStartY + rectHeight + 25);
            context.lineTo(initialStartX + rectWidth / 2 - 8, initialStartY + rectHeight + 25);
            context.closePath();

            context.lineWidth = 6;
            context.moveTo(initialStartX + rectWidth / 2, initialStartY + rectHeight + 15);
            context.lineTo(initialStartX + rectWidth / 2, initialStartY + rectHeight + 40);
            context.stroke();
        }



        drawArrow(startX - 150, startY, rectWidth, rectHeight);

        var text = 1;

        for (let i = 0; i <= 5; i++) {

            if (i === 5) {
                //2. The condition is responsible for draw and counting turn of the game
                startX = startX + 60;
                startY = 43;
                const radius = 40;
                const fillColor = "black";
                const borderColor = "gold"; // Border color
                const borderWidth = 2;      // Border width
                context.arc(startX, startY, radius, 0, 2 * Math.PI, false);
                context.fillStyle = fillColor;
                context.fill();

                context.strokeStyle = borderColor;
                context.lineWidth = borderWidth;
                context.stroke();

                context.fillStyle = "gold";

                context.font = "40px Arial";
                context.textAlign = "center";
                context.textBaseline = "middle";
                window.addEventListener("message", function (event) {
                    if (event.data.action === "brameczka5"){
                        text++;
                        context.clearRect(850, 24, 50, 36)
                        context.fillStyle = "gold";
                        context.font = "40px Arial";
                        context.fillText(text, startX, startY);
                    }
                })
                context.fillText(text, startX, startY);

                context.fillStyle = "gold";
                const text2 = "RUNDA";
                context.font = "20px Arial";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillText(text2, startX, startY + radius + 25);


            } else {
//3. The condition is responsible for drawing 5 rectangles with white lines
                context.beginPath();
                const initialStartY = startY;
                context.fillStyle = "#2A292B";
                context.fillRect(startX, startY, rectWidth, rectHeight);

                context.fillStyle = "black";
                context.fillRect(startX, startY, rectWidth, rectHeight);

                context.strokeStyle = "white";
                context.lineWidth = 2;
                context.strokeRect(startX, startY, rectWidth, rectHeight);
                context.closePath();


                startX = startX + 150;

            }
        }
        var color = ["red", "green", "blue", "saddlebrown", "yellow", "fuchsia", "grey"];


        //next modification here
        let brameczka = 0;

        let algorithmColor = [];

        //4. Function getAlgorithmColor
        function getAlgorithmColor(algoritm, max) {
            for (let i = 0; i < 5; i++) {
                let randomNumber;
                randomNumber = Math.floor(Math.random() * max);
                algoritm.push(color[randomNumber]);
            }
        }


        getAlgorithmColor(algorithmColor, 7);
        console.log(algorithmColor);
        const algorithmColorSafe = JSON.stringify(algorithmColor);
        localStorage.setItem('algorithmColor', algorithmColorSafe);

        let getAlgorithmColors = false;
        let alghoritmColor2 = [];
        let initialStartY = 10;
        let okFace = 0;
        let blueFace = 0;
        let redFace = 0;

        // 5. Window addEventListener from Odcinek7-myCanvas2.js connecting click-event rectangles from that file with the
        //rectangles from this file
        window.addEventListener("message", function (event) {
            if (event.data.action === "paintRectangle") {
                //6. Paint rectangle event start
                brameczka++;

                //6.1 The previous array will be wiped-out
                clearArrow();


                if (brameczka <= 5 && brameczka >= 1) {
                    //6.2 - Clear all the rectangles generated from previous round
                    context.clearRect(0, 190, 132, 175);

                    if (brameczka === 1){
                        alghoritmColor2 = [];
                    }

                    let initialStartX = event.data.x;
                    context.fillStyle = event.data.color;

                    alghoritmColor2.push(event.data.color);

                    //6.3 Alghoritm color which is the main engine the entire game
                    if (brameczka === 5){

                        //Restoring algorithmColor - Give possibility playing in next rounds
                        if (getAlgorithmColors === true){
                            var string = localStorage.getItem('algorithmColor');
                            algorithmColor = JSON.parse(string);
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
                            const OkFaceSafe = JSON.stringify(alghoritmColor2);
                            localStorage.setItem('alghoritmColor2', OkFaceSafe);



                            let image = new Image();
                                image.src = "zdjęcia/ok.png";

                            let image2 = new Image();
                            image2.src = "zdjęcia/elsewhere.png";

                            let image3 = new Image();
                            image3.src = "zdjęcia/none.png";

                                let initialStartX2 = 80;
                                let initialStartX3 = 80;
                                let initialStartX4 = 80;

                            // 6.4 Alghoritm color adding ok face under rectangles 201/216
                            for (let i = algorithmColor.length - 1; i >= 0; i--) {

                                if (algorithmColor[i] === alghoritmColor2[i]) {

                                    okFace++;

                                    image.onload = function () {
                                        for (let j = 0; j < okFace; j++) {
                                            context.drawImage(image, initialStartX2, initialStartY + 290, 60, 60);
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
                                                initialStartX3 = 80 + 150 * okFace;
                                            context.drawImage(image2, initialStartX3, initialStartY + 290, 60, 60);
                                                }
                                            else {
                                                context.drawImage(image2, initialStartX3, initialStartY + 290, 60, 60);
                                            }


                                            initialStartX3 = initialStartX3 + 150;
                                        }

                                    }

                                        algorithmColor.splice(algorithmColor.indexOf(alghoritmColor2[i]),1);
                                }

                            }
                            var string2 = localStorage.getItem('alghoritmColor2');
                            alghoritmColor2 = JSON.parse(string2);

                            //6.6 Alghoritm color adding red face under rectangles - 276/300
                            for (let i = 0; i < 5; i++) {

                                    if (okFace + blueFace + redFace === 5){
                                        break;
                                    }
                                    redFace++;

                                    image3.onload = function () {
                                        for (let j = 0; j < redFace; j++) {
                                            if(j === 0) {
                                                initialStartX4 = 80 + 150 * blueFace + 150 * okFace;
                                                context.drawImage(image3, initialStartX4, initialStartY + 290, 60, 60);
                                            }
                                            else {
                                                context.drawImage(image3, initialStartX4, initialStartY + 290, 60, 60);
                                            }


                                            initialStartX4 = initialStartX4 + 150;
                                        }
                                }

                            }
                            getAlgorithmColors = true;



                        }

                    }


                    context.clearRect(initialStartX - 5, initialStartY - 7, rectWidth + 30, rectHeight + 30);
                    context.fillRect(initialStartX, initialStartY, rectWidth, rectHeight);

                    if (brameczka !== 5) {
                        okFace = 0;
                        blueFace = 0;
                        redFace = 0;
                        drawArrow(initialStartX, initialStartY, rectWidth, rectHeight);
                    }

                    else if (brameczka === 5) {
                        //7. Draw rectangles with suitable color from the previous turn, reset alghoritmColor2
                        //detaling
                        brameczka = 0;

                        for (let i = 4; i >= 0; i--) {

                            context.fillStyle = "black";
                            context.fillRect(initialStartX, initialStartY, rectWidth, rectHeight);
                            context.strokeStyle = "white";
                            context.lineWidth = 2;
                            context.strokeRect(initialStartX, initialStartY, rectWidth, rectHeight);

                            context.beginPath();
                            context.fillStyle = alghoritmColor2[i];
                            context.fillRect(initialStartX, initialStartY + 180, rectWidth, rectHeight);
                            initialStartX = initialStartX - 150;
                            alghoritmColor2.pop();

                        }

                        drawArrow(-90, initialStartY, rectWidth, rectHeight);
                        window.parent.postMessage({
                            action: "brameczka5"
                        }, "*");
                    }
                }

            } else if (event.data.action === "deleteRectangle") {
                //8. Delete previous color of rectangle after click the rectangle which has name "popraw",
                // in addition to delete the previous record in alghoritmColor2 array.
                if (brameczka >= 1) {
                    brameczka--;
                    let initialStartX = event.data.x;
                    context.fillStyle = "black";
                    context.fillRect(initialStartX, initialStartY, rectWidth, rectHeight);
                    alghoritmColor2.pop();
                    context.strokeStyle = "white";
                    context.lineWidth = 2;
                    context.strokeRect(initialStartX, initialStartY, rectWidth, rectHeight);
                    clearArrow();
                    drawArrow(initialStartX - 150, initialStartY, rectWidth, rectHeight);
                } else {
                    brameczka = 0;
                }

            }

        });

        //9. Function clear arrow
        function clearArrow() {
            context.clearRect(90, 115, canvas.width, canvas.height);
        }

    }
});
