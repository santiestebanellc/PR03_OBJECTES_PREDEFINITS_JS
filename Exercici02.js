document.getElementById("message").textContent = getCookie("lastGame");

document.getElementById("finishButton").disabled = true;

document.getElementById('startButton').addEventListener('click', function() {

    document.getElementById("startButton").disabled = true;

    document.getElementById('finishButton').addEventListener('click', function() {
        clearInterval(countdownInterval);
            document.getElementById("finishButton").disabled = true;
            windows.forEach(win => {
                if (win && !win.closed) {
                    win.close();
                }
            });
            windows.length = 0;
            document.getElementById("message").textContent = "OHHH, YOU LOST, YOU CAN TRY AGAIN!";
            document.getElementById("startButton").disabled = false;
            windowsId = 0;
            windowsCounter = 0;
    });
    
    let countdown = 30;
    const countdownDisplay = document.getElementById('countdownDisplay');
    const windows = [];

    let firstClickWindow = null;
    let firstClickColor = null;
    let firstWindows = true;
    let windowsId = 0;
    let windowsCounter = 0;

    document.getElementById("message").textContent = getCookie("lastGame");

    const countdownInterval = setInterval(() => {
        document.getElementById("finishButton").disabled = false;
        countdownDisplay.textContent = countdown;
        countdown--;
        if (countdown === 27) {
            startGame();
        }
        if (countdown < 0) {
            clearInterval(countdownInterval);
            document.getElementById("finishButton").disabled = true;
            windows.forEach(win => {
                if (win && !win.closed) {
                    win.close();
                }
            });
            windows.length = 0;
            document.getElementById("message").textContent = "OHHH, YOU LOST, YOU CAN TRY AGAIN!";

            setCookie("lastGame", `Ultima partida [PERDIDA]: ${windowsId} ventanas creadas.`,1);

            document.getElementById("startButton").disabled = false;
            windowsId = 0;
            windowsCounter = 0;
        }
    }, 1000);
    
    const colors = ["AZUL", "AMARILLO", "VERDE", "ROJO"];
    const colorHex = {
        "AZUL": "#0000FF",
        "AMARILLO": "#FFFF00",
        "VERDE": "#008000",
        "ROJO": "#FF0000"
    };

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
        windows.push(newWindow);
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
                            document.getElementById("finishButton").disabled = true;
                            document.getElementById("message").textContent = "CONGRATULATIONS, YOU WON!";
                            
                            setCookie("lastGame", `Ultima partida [GANADA]: ${windowsId} ventanas creadas.`,1);

                            document.getElementById("startButton").disabled = false;
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

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(';');
    for (let cookie of cookiesArray) {
        cookie = cookie.trim();
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}
