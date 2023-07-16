// set interval to show current time as well as check if any alarm is matched with current time.
setInterval(function () {
    //date minus 10 minutes
  let date = new Date();
  date.setMinutes(date.getMinutes() - 10);
    
  // H:m:s AM/PM
  let time = date.toLocaleTimeString();
  // get alarm list from local storage
  let alarmList = getAlarmList();
  if (alarmList) {
    // check if current time is matched with any of alarm list
    if (alarmList.indexOf(time) > -1) {
      alert("Alarm: " + time);
      // we can also remove after ringing alarm
      // removeAlarm(time);
    }
  }
  // show current time on the page
  document.getElementById("current-timer").innerHTML = time;
}, 1000);

// get alarm list from local storage
function getAlarmList() {
  let alarmList = localStorage.getItem("alarmList");
  if (alarmList) {
    return JSON.parse(alarmList);
  } else {
    return false;
  }
}

// set alarm list to local storage
function setAlarmList(alarmList) {
  localStorage.setItem("alarmList", JSON.stringify(alarmList));
}

// on click of #set-alarm
var setAlarm = document.getElementById("set-alarm");
setAlarm.addEventListener("click", function () {
  let hour = document.getElementById("hour").value;
  let minute = document.getElementById("minute").value;
  let second = document.getElementById("second").value;
  const am_pm = document.getElementById("am-pm").value;

  // validations
  if(hour == "" || minute == "" || second == "") {
    alert("Please fill all fields");
    return;
  }

  if (hour > 12 || hour < 1) {
    alert("Please enter valid hour");
    return;
  }

  if (minute > 59 || minute < 0) {
    alert("Please enter valid minute");
    return;
  }

  if (second > 59 || second < 0) {
    alert("Please enter valid second");
    return;
  }

  // convert values according to LocaleTimeString
  hour = parseInt(hour);
  if(minute < 10){
    minute = `0${minute}`;
  }
  if(second < 10){
    second = `0${second}`;
  }

  const alarmTime = `${hour}:${minute}:${second} ${am_pm}`;
  let alarmList = getAlarmList();
  if (alarmList) {
    alarmList.push(alarmTime);
  } else {
    alarmList = [alarmTime];
  }

  // save alarm list to local storage
  setAlarmList(alarmList);
  // re-render alarm list
  renderAlarmList(alarmList);
});

// listout alarm list
function renderAlarmList(alarmList) {
  if (alarmList) {
    // reset listing first to avaoid duplicate alarm listing
    document.getElementById("alarm-listing").innerHTML = "";
    for (let alarm of alarmList) {
        // create new li element
      let li = document.createElement("li");

      // set some bootstrap classes
      li.classList.add("list-group-item");
      li.classList.add("mt-1");
      li.classList.add("d-flex");
      li.classList.add("justify-content-between");

      // UI which will be inside of li element. used ion-icons to make it look better
      li.innerHTML = `${alarm} <button class="btn btn-danger btn-sm" onclick="removeAlarm('${alarm}')"><ion-icon name="trash-outline"></ion-icon></button>`;

      // append the li element to the ul element
      document.getElementById("alarm-listing").appendChild(li);
    }
  }
}

// remove alarm from list saved at local storage
function removeAlarm(alarm) {
  let alarmList = getAlarmList();
  if (alarmList) {
    // find index to remove alarm from array
    let index = alarmList.indexOf(alarm);
    //remove alarm by using splice method
    alarmList.splice(index, 1);
    // save alarm list to local storage
    setAlarmList(alarmList);
    // re-render alarm list
    renderAlarmList(alarmList);
  }
}

// initially render alarm list when page is loaded
(function () {
  let alarmList = getAlarmList();
  renderAlarmList(alarmList);
})();
