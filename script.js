const currentTime = document.querySelector("h1");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");

let alarmTime, isAlarmSet = false;
const ringTone = new Audio("unstopable.mp3");

// Populate options for hours
for (let i = 12; i > 0; i--) {
    let value = i < 10 ? "0" + i : i;
    let option = `<option value="${value}">${value}</option>`;
    selectMenu[0].insertAdjacentHTML("afterbegin", option);
}

// Populate options for minutes
for (let i = 59; i > 0; i--) {
    let value = i < 10 ? "0" + i : i;
    let option = `<option value="${value}">${value}</option>`;
    selectMenu[1].insertAdjacentHTML("afterbegin", option);
}

// Populate options for AM/PM
for (let i = 2; i > 0; i--) {
    let ampm = i === 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].insertAdjacentHTML("afterbegin", option);
}

// Function to update the current time
function updateTime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }

    h = h === 0 ? 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if (alarmTime === `${h}:${m} ${ampm}`) {
        ringTone.play();
        ringTone.loop = true;
}
}

// Update time every second
setInterval(updateTime, 1000);

// Function to set the alarm
function setAlarm() {

    if(isAlarmSet)
    {
        alarmTime ="";
        ringTone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please select time to set Alarm!!!");
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");
    setAlarmBtn.innerText = "clear Alarm";
}

// Event listener for setting the alarm
setAlarmBtn.addEventListener("click", setAlarm);
