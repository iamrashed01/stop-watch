const hour = document.getElementById('hour'),
  minute = document.getElementById('minute'),
  second = document.getElementById('second'),
  second_counter = document.getElementById('second_counter'),
  minute_counter = document.getElementById('minute_counter'),
  start = document.getElementById('start'),
  stop = document.getElementById('stop'),
  reset = document.getElementById('reset'),
  pause = document.getElementById('pause');

var audioElementGrid = document.createElement('audio');

const date = new Date();

// initial intervel variabls
var h = 0,
  m = 0,
  s = 0,
  paused = false,
  timer = null;

// initial interval
function startTimer() {
  timer = setInterval(() => {
    if (h >= 24) {
      h = 1;
    }

    if (m >= 60) {
      h += 1;
      m = 0;
    }

    if (s >= 60) {
      m += 1;
      s = 0;
    }

    s += 1;
    updateWatch(h, m, s);
  }, 1000)
}

// sad sound
function sadSound() {
  audioElementGrid.setAttribute('src', 'funny.mp3');
  audioElementGrid.removeAttribute('loop');
  audioElementGrid.play();
}

// clear sound
function clearSound() {
  audioElementGrid.setAttribute('src', 'reset.mp3');
  audioElementGrid.removeAttribute('loop');
  audioElementGrid.play();
}

// clock sound
function ticktockSound() {
  audioElementGrid.setAttribute('src', 'clock.mp3');
  audioElementGrid.setAttribute('loop', true);
  audioElementGrid.play();
}

// update watch
function updateWatch(h = 0, m = 0, s = 0) {
  const parsedHour = h > 12 ? h - 12 : h;
  hour.innerHTML = h <= 9 ? `0${parsedHour}` : parsedHour;
  minute.innerHTML = m <= 9 ? `0${m}` : m;
  second.innerHTML = s <= 9 ? `0${s}` : s;

  second_counter.style.transform = `translateX(-50%) rotate(calc(360deg * (${s} / 60)))`;
  minute_counter.style.transform = `translateX(-50%) rotate(calc(360deg * (${m} / 60)))`;
}

// start timer
start.addEventListener('click', function () {
  pause.classList.remove('hidden');
  start.classList.add('hidden');
  startTimer();
  ticktockSound();
})

// pause timer
pause.addEventListener('click', function () {
  pause.classList.add('hidden');
  start.classList.remove('hidden');
  clearInterval(timer);
  timer = null;
  sadSound()
})


// stop timer
stop.addEventListener('click', function () {
  pause.classList.add('hidden');
  start.classList.remove('hidden');
  sadSound()
  clearInterval(timer);
  timer = null;
  h = 0;
  m = 0;
  s = 0;
  updateWatch();
})

// reset timer
reset.addEventListener('click', function () {
  h = 0;
  m = 0;
  s = 0;
  clearSound()
  updateWatch();
})