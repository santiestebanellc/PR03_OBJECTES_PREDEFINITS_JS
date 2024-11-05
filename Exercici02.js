document.getElementById('startButton').addEventListener('click', function() {
    
    let countdown = 30;
    const countdownDisplay = document.getElementById('countdownDisplay');

    const countdownInterval = setInterval(() => {
        countdownDisplay.textContent = countdown;
        countdown--;
        if (countdown < 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);

    openWindows();

    function openWindows() {
        
        const colors = ["AZUL", "AMARILLO", "VERDE", "ROJO"];
        const colorHex = {
            "AZUL": "#0000FF",
            "AMARILLO": "#FFFF00",
            "VERDE": "#008000",
            "ROJO": "#FF0000"
        };

        let firstClickWindow = null;
        let firstClickColor = null;

        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const windowWidth = 300;
        const windowHeight = 200;

        for (let i = 1; i <= 7; i++) {

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const left = i === 1 ? (screenWidth - windowWidth) / 2 : Math.floor(Math.random() * (screenWidth - windowWidth));
            const top = i === 1 ? (screenHeight - windowHeight) / 2 : Math.floor(Math.random() * (screenHeight - windowHeight));

            const newWindow = window.open('', `Window${i}`, `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`);
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
                        } else if (newWindow === firstClickWindow && randomColor === firstClickColor) {
                            const newRandomColor = colors.filter(color => color !== randomColor)[Math.floor(Math.random() * (colors.length - 1))];
                            newWindow.document.body.style.backgroundColor = colorHex[newRandomColor];
                            newWindow.document.body.querySelector('h1').textContent = newRandomColor;
                            firstClickColor = newRandomColor;

                            const newColor = colors[Math.floor(Math.random() * colors.length)];
                            const newLeft = Math.floor(Math.random() * (screenWidth - windowWidth));
                            const newTop = Math.floor(Math.random() * (screenHeight - windowHeight));
                            const extraWindow = window.open('', `ExtraWindow${Date.now()}`, `width=${windowWidth},height=${windowHeight},left=${newLeft},top=${newTop}`);
                            if (extraWindow) {
                                extraWindow.document.write(`
                                    <body style="margin: 0; display: flex; align-items: center; justify-content: center; background-color: ${colorHex[newColor]};">
                                        <h1 style="color: black;">${newColor}</h1>
                                    </body>
                                `);
                            }
                        } else {
                            firstClickWindow = null;
                            firstClickColor = null;
                        }
                    }
                };
            }
        }
    }
});
