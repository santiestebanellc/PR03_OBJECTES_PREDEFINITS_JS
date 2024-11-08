document.getElementById('startButton').addEventListener('click', function() {
    
    let countdown = 30;
    const countdownDisplay = document.getElementById('countdownDisplay');

    const countdownInterval = setInterval(() => {
        countdownDisplay.textContent = countdown;
        countdown--;
        if (countdown === 27) {
            startGame();
        }
        if (countdown < 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
    
    const colors = ["AZUL", "AMARILLO", "VERDE", "ROJO"];
    const colorHex = {
        "AZUL": "#0000FF",
        "AMARILLO": "#FFFF00",
        "VERDE": "#008000",
        "ROJO": "#FF0000"
    };

    let firstClickWindow = null;
    let firstClickColor = null;
    let firstWindows = true;
    let windowsId = 0;
    let windowsCounter = 0;

    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const windowWidth = 300;
    const windowHeight = 200;

    function startGame(){
        for (let i = 1; i <= 7; i++) {
            openWindows();
        }
    }

    function openWindows() {

        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        const left = firstWindows ? (screenWidth - windowWidth) / 2 : Math.floor(Math.random() * (screenWidth - windowWidth));
        const top = firstWindows ? (screenHeight - windowHeight) / 2 : Math.floor(Math.random() * (screenHeight - windowHeight));
        if (firstWindows){ firstWindows = false;}

        const newWindow = window.open('', `Window${windowsId}`, `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`);
        windowsId++;
        windowsCounter++;
        document.getElementById("windows_counter").textContent = `Active windows: ${windowsCounter}`;
        document.getElementById("windows_total_counter").textContent = `Total windows created: ${windowsId}`;

        if (newWindow) {
            newWindow.document.write(`
                <body style="margin: 0; display: flex; align-items: center; justify-content: center; background-color: ${colorHex[randomColor]};">
                    <h1 style="color: black;">${randomColor}</h1>
                </body>
            `);
            newWindow.document.body.onclick = function() {
                if (!firstClickWindow) {
                    firstClickWindow = newWindow;
                    firstClickColor = randomColor;
                } else {
                    if (newWindow !== firstClickWindow && randomColor === firstClickColor) {
                        newWindow.close();
                        firstClickWindow.close();
                        firstClickWindow = null;
                        firstClickColor = null;
                        windowsCounter = windowsCounter - 2;
                        document.getElementById("windows_counter").textContent = `Active windows: ${windowsCounter}`;
                        if (windowsCounter == 0){
                            clearInterval(countdownInterval);
                            document.getElementById("message").textContent = "CONGRATULATIONS, YOU WON!";
                        }
                    }else if (newWindow === firstClickWindow) {
                        randomColor = colors.filter(color => color !== randomColor)[Math.floor(Math.random() * (colors.length - 1))];
                        newWindow.document.body.setAttribute("style",`margin: 0; display: flex; align-items: center; justify-content: center; background-color: ${colorHex[randomColor]};`)
                        newWindow.document.querySelector('h1').textContent = randomColor;
                        firstClickWindow = null;
                        firstClickColor = null;
                        openWindows();
                    }else{
                        firstClickWindow = null;
                        firstClickColor = null;
                    }
                }
            };
        }
    }

});
