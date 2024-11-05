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

        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const windowWidth = 300;
        const windowHeight = 200;
        const centerLeft = (screenWidth - windowWidth) / 2;
        const centerTop = (screenHeight - windowHeight) / 2;

        for (let i = 1; i <= 7; i++) {
            
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const left = i === 1 ? centerLeft : Math.floor(Math.random() * (screenWidth - windowWidth));
            const top = i === 1 ? centerTop : Math.floor(Math.random() * (screenHeight - windowHeight));

            const newWindow = window.open('', `Window${i}`, `width=${windowWidth},height=${windowHeight},left=${left},top=${top}`);
            if (newWindow) {
                newWindow.document.write(`
                    <body style="margin: 0; display: flex; align-items: center; justify-content: center; background-color: ${colorHex[randomColor]};">
                        <h1 style="color: black;">${randomColor}</h1>
                    </body>
                `);
            }
        }
    }
});
