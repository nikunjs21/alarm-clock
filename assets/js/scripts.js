var timeInterval = setInterval(function () {
    let date = new Date();
    // H:i:s AM/PM
    let time = date.toLocaleTimeString();
    document.getElementById("current-timer").innerHTML = time;
}, 1000);
