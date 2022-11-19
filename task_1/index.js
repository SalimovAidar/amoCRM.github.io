const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
let stop = false
let timer = false

const createTimerAnimator = () => {
  const duration = 1000;
  const hoursTitles = ['час', 'часа', 'часов'];
  const minutesTitles = ['минута', 'минуты', 'минут'];
  const secondsTitles = ['секунда', 'секунды', 'секунд'];

  function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  }

  function formatTime(totalSeconds) {
    var sec_num = parseInt(totalSeconds, 10)
    var hours   = Math.floor(sec_num / 3600) < 10 ? '0' + Math.floor(sec_num / 3600) : Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60 < 10 ? '0' + Math.floor(sec_num / 60) % 60 : Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60 < 10 ? '0' + sec_num % 60 : sec_num % 60;

    return `${hours}:${minutes}:${seconds} - 
            ${hours} ${declOfNum(hours, hoursTitles)}, 
            ${minutes} ${declOfNum(minutes ,minutesTitles)}, 
            ${seconds} ${declOfNum(seconds ,secondsTitles)}`
  }

  return (seconds) => {
    timer = true
    function timeout() {
        setTimeout(function () {
            if (seconds <= 0) return;
            if (stop) {
              stop = false;
              return
            };
            seconds -= 1;
            timerEl.textContent = formatTime(seconds);
            if (seconds > 0) timeout();
        }, duration);
    }
    timeout()
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  if (e.target.value.match(/[^0-9]/g)) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
  }
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  if (timer) {
    stop = true
    timer = false
  }
  animateTimer(seconds);
  
  inputEl.value = '';
});
