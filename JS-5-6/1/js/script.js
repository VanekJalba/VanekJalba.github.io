var secondsCounter = null;
var timerBox = document.getElementById('timerBox');
var timerTable = timerBox.getElementsByClassName('main-timer')[0];
var miliSeconds = timerBox.getElementsByClassName('miliSeconds')[0];
//
timerBox.onclick = function(e) {
    var target = e.target;
    var action = target.getAttribute('data-action');
    if (action == 'start') {
      target.value = 'Pause';
      target.classList.toggle('btn-info');
      target.classList.toggle('btn-success');
      target.setAttribute('data-action', 'pause');
      timer.start()
    };
    if (action == 'pause') {
      target.value = 'Start';
      target.classList.toggle('btn-info');
      target.classList.toggle('btn-success');
      target.setAttribute('data-action', 'start');
      timer.pause()
    };
    if (action == 'stop') {
      var clearButton = timerBox.querySelector("[data-action='pause']");
      if (clearButton) {
        clearButton.value = 'Start';
        clearButton.classList.toggle('btn-info');
        clearButton.classList.toggle('btn-success');
        clearButton.setAttribute('data-action', 'start');
      }
      timer.stop()
    };
  }
  // 
var timer = {
  h: 0,
  m: 0,
  s: 0,
  ms: 0,
  startTrigger: 0, 
  // 

  start: function() {
    if (timer.startTrigger == 0) {
      secondsCounter = setInterval(function() {
        // 
        miliSeconds.innerHTML = timer.ms;
        // 
        timer.ms += 25;
        // 
        if (timer.ms == 1000) {
          timer.ms = 0;
          timer.s += 1;
          if (timer.s == 60) {
            timer.m += 1;
            timer.s = 0
          };
          if (timer.m == 60) {
            timer.h += 1;
            timer.m = 0
          };
          timer._refreshTimeTable(timer.h, timer.m, timer.s, timer.ms);
        }
      }, 25);
      timer.startTrigger = 1;
    }
  },

  pause: function() { // 
    if (timer.startTrigger === 1) {
      clearInterval(secondsCounter);
      timer.startTrigger = 0;
    }
  },

  stop: function() {
    clearInterval(secondsCounter);
    timer.h = 0;
    timer.m = 0;
    timer.s = 0;
    timer.ms = 0;
    timer._refreshTimeTable(timer.h, timer.m, timer.s, timer.ms);
    timer.startTrigger = 0;
  },
  // 
  _refreshTimeTable(h, m, s, ms) {
    timerTable.innerHTML = timer._getRightFormat(h, m, s);
    miliSeconds.innerHTML = ms;
  },

  // 
  _getRightFormat: function(hours, minutes, seconds) {
    if (hours < 10) {
      hours = '0' + hours
    };
    if (minutes < 10) {
      minutes = '0' + minutes
    };
    if (seconds < 10) {
      seconds = '0' + seconds
    };
    return (hours + ':' + minutes + ':' + seconds);
  }
}
