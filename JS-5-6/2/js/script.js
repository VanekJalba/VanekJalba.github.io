var secondsCounter = null;
var timeStop = { 
  h: 0,
  m: 0,
  s: 0,
  ms: 0
};
var timerBox = document.getElementById('timerBox');
var timerTable = timerBox.getElementsByClassName('main-timer')[0];
var miliSeconds = timerBox.getElementsByClassName('miliSeconds')[0];

// 
timerBox.onclick = function(e) {
    var target = e.target;
    var action = target.getAttribute('data-action');
    if (action == 'start') {
      target.value = 'Stop';
      target.setAttribute('data-action', 'stop');
      timer.start()
    };
    if (action == 'stop') {
      target.value = 'Start';
      target.setAttribute('data-action', 'start');
      timer.stop()
    };
    if (action == 'reset') {
      var clearButton = timerBox.querySelector("[data-action='stop']");
      if (clearButton) {
        clearButton.value = 'Start';
        clearButton.setAttribute('data-action', 'start');
      };
      timer.reset()
    };
    if (action == 'split') {
      timer.split()
    }

  }
  // 
var timer = {
  h: 0,
  m: 0,
  s: 0,
  ms: 0,
  recNum: 0,
  timingBox: [], 
  startTrigger: 0, 

  start: function() {
    if (timer.startTrigger == 0) {
      secondsCounter = setInterval(function() {
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
        miliSeconds.innerHTML = timer._getRightFormatMs(timer.ms);
      }, 25);
      timer.startTrigger = 1;
    }
  },

  stop: function() { // Чт
    if (timer.startTrigger === 1) { 
      clearInterval(secondsCounter);
      if (timer.ms < timeStop.ms) {
        timeStop.ms = timer.ms + (1000 - timeStop.ms);
        timeStop.s += 1;
      } else {
        timeStop.ms = (timer.ms - timeStop.ms);
      };
      if (timer.s < timeStop.s) {
        timeStop.s = timer.s + (100 - timeStop.s);
        timeStop.m += 1;
      } else {
        timeStop.s = (timer.s - timeStop.s);
      };
      if (timer.m < timeStop.m) {
        timeStop.m = timer.m + (100 - timeStop.m);
        timeStop.h += 1;
      } else {
        timeStop.m = (timer.m - timeStop.m);
      };
      if (timer.h < timeStop.h) {
        timeStop.h = timer.h + (100 - timeStop.h);
      } else {
        timeStop.h = (timer.h - timeStop.h);
      };
      var timerStop = (timer._getRightFormat(timeStop.h, timeStop.m, timeStop.s) + timer._getRightFormatMs(timeStop.ms));
      var stopRec = new timer.Timing('Stop', timerStop);
      stopRec.returnTimeRec();
      timeStop.h = timer.h;
      timeStop.m = timer.m;
      timeStop.s = timer.s;
      timeStop.ms = timer.ms;
      timer.startTrigger = 0;
    }
  },

  split: function() {
    if (timer.startTrigger === 1) {
      var timerSplit = (timer._getRightFormat(timer.h, timer.m, timer.s) + timer._getRightFormatMs(timer.ms));
      var splitRec = new timer.Timing('Split', timerSplit);
      splitRec.returnTimeRec();
    }
  },

  reset: function() {
    timer._clearTimings();
    clearInterval(secondsCounter);
    timer.h = 0;
    timer.m = 0;
    timer.s = 0;
    timer.ms = 0;
    timeStop.h = 0;
    timeStop.m = 0;
    timeStop.s = 0;
    timeStop.ms = 0;
    timer.startTrigger = 0;
    timer._refreshTimeTable(timer.h, timer.m, timer.s, timer.ms);
  },
  
  _refreshTimeTable(h, m, s, ms) {
    timerTable.innerHTML = timer._getRightFormat(h, m, s);
    if (timer.startTrigger === 0) {
      miliSeconds.innerHTML = timer._getRightFormatMs(ms);
    }
  },

  
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
  },
  _getRightFormatMs: function(ms) { 
    if (ms === 0) {
      return ('.000');
    }
    if (ms < 10) {
      ms = '.00' + ms;
      return ms;
    };
    if (ms < 100) {
      ms = '.0' + ms;
      return ms;
    };
    return '.' + ms;
  },
  Timing: function(eventType, timeRec) { 
    this.number = ++timer.recNum;
    this.eventType = eventType;
    this.timeRec = timeRec;
    this.returnTimeRec = function() { 
      var insertPoint = document.getElementById('timingBox');
      var insertElem = document.createElement('p');
      insertElem.innerHTML = (this.number + ' ' + this.eventType + ': ' + this.timeRec);
      insertPoint.appendChild(insertElem);
      timer.timingBox.push(this);
    }
  },
  _clearTimings: function() { 
    timer.timingBox = [];
    timer.recNum = 0;
    var timingBox = document.getElementById('timingBox');
    timingBox.innerHTML = '';
  }
}
