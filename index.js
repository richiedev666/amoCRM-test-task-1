class Timer {
  constructor() {
    this.inputEl = document.querySelector("input");
    this.buttonEl = document.querySelector("button");
    this.timerEl = document.querySelector("span");

    this.seconds = 0;

    this.status = "stopped";
  }

  init() {
    this.initInputEventListener();
    this.initButtonEventListener();
  }

  initInputEventListener() {
    this.inputEl.addEventListener("input", (event) => {
      const value = parseInt(event.target.value);

      if (isNaN(value)) this.clearInputValue();

      if (value) {
        this.inputEl.value = value;

        this.seconds = value;
      }
    });
  }

  initButtonEventListener() {
    this.buttonEl.addEventListener("click", (event) => {
      event.preventDefault();

      if (this.status === "stopped") this.startTimer();
      else this.stopTimer();
    });
  }

  startTimer() {
    this.status = "started";

    this.buttonEl.textContent = "Stop";

    this.clearInputValue();

    this.animateTimer();

    this.disableInput();
  }

  stopTimer() {
    this.status = "stopped";

    this.buttonEl.textContent = "Start";

    this.resetTimer();

    this.enableInput();
  }

  animateTimer() {
    this.countDownTimer();

    const interval = setInterval(() => {
      this.countDownTimer();

      if (this.timerIsOver()) {
        this.stopTimer();

        clearInterval(interval);
      }
    }, 1000);
  }

  countDownTimer() {
    this.timerEl.textContent = this.formatTime();

    this.seconds--;
  }

  timerIsOver() {
    return this.seconds < 0;
  }

  formatTime() {
    let hours = Math.floor(this.seconds / 3600);
    if (hours < 10) hours = `0${hours}`;

    let minutes = Math.floor(this.seconds / 60) % 60;
    if (minutes < 10) minutes = `0${minutes}`;

    let seconds = Math.floor(this.seconds % 60);
    if (seconds < 10) seconds = `0${seconds}`;

    return `${hours}:${minutes}:${seconds}`;
  }

  disableInput() {
    this.inputEl.disabled = true;
  }

  enableInput() {
    this.inputEl.disabled = false;
  }

  clearInputValue() {
    this.inputEl.value = "";
  }

  resetTimer() {
    this.seconds = this.inputEl.value;
    this.timerEl.textContent = "hh:mm:ss";
  }
}

const timer = new Timer();
timer.init();
