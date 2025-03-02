let countdown;
let timeRemaining;

document.getElementById('startButton').addEventListener('click', function () {
    let inputTime = parseInt(document.getElementById('timeInput').value);
    if (isNaN(inputTime) || inputTime <= 0) {
        alert("Lütfen geçerli bir süre girin!");
        return;
    }

    clearInterval(countdown);
    timeRemaining = inputTime;
    document.getElementById('countdownDisplay').innerText = `Süre: ${timeRemaining}`;

    countdown = setInterval(function () {
        timeRemaining--;
        if (timeRemaining <= 0) {
            clearInterval(countdown);
            document.getElementById('countdownDisplay').innerText = "Süre doldu!";
        } else {
            document.getElementById('countdownDisplay').innerText = `Süre: ${timeRemaining}`;
        }
    }, 1000);
});

document.getElementById('resetButton').addEventListener('click', function () {
    clearInterval(countdown);
    document.getElementById('countdownDisplay').innerText = "Süre: 0";
    document.getElementById('timeInput').value = 10;
});
