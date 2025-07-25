
    // DOM reference elements
    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById('seconds');
    const millisecondsDisplay = document.getElementById('milliseconds');
    const startButton = document.getElementById('startBtn');
    const pauseButton = document.getElementById('pauseBtn');
    const resetButton = document.getElementById('resetBtn');
    const lapButton = document.getElementById('lapBtn');
    const lapList = document.getElementById('lap');

    // stopwatch varaibles
    let milliseconds = 0;
    let minutes = 0;
    let seconds = 0;
    let timeInterval;
    let lapCounter = 0;

    // function to formattime
    const formatTime = (unit, lenght) => String(unit).padStart(lenght, '0')
    

    // function to updatestopwatch display
    const updateDisplay = () =>{
        millisecondsDisplay.textContent = formatTime(milliseconds, 3);
        secondsDisplay.textContent = formatTime(seconds, 2);
        minutesDisplay.textContent = formatTime(minutes, 2);
    }

    // function to start stopwatch
    const startStopWatch = () => {
        clearInterval(timeInterval)

        timeInterval = setInterval(() => {
            milliseconds += 10

            if(milliseconds === 1000){
                milliseconds = 0;
                seconds++;
            }
            if(seconds === 60){
                seconds = 0;
                minutes++
            }

            updateDisplay();
        }, 10)

        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;

    }

    //  functuon to pause the stopWatch
    const pauseStopWatch = () =>{
        clearInterval(timeInterval)

        startButton.disabled = false;
        pauseButton.disabled = true;

    }

    //  function to reset StopWatch

    const resetStopWatch = () =>{
        clearInterval(timeInterval)

        milliseconds = 0;
        seconds = 0;
        minutes = 0;
        lapCounter = 0;

        updateDisplay()

        lapList.innerHTML = " ";

        startButton.disabled = false;
        pauseButton.disabled = true;
        resetButton.disabled = true;
        lapButton.disabled = true;

    }

    const recordLap = () =>{
        if(timeInterval){
            lapCounter++;

            const currentLapTime = `${formatTime(minutes, 2)}:${formatTime(seconds, 2)}.${formatTime(milliseconds, 3)}`

            const listItem = document.createElement('li')

            listItem.className = 'lap-item';
            listItem.innerHTML = `
            <span>lap : ${lapCounter}</span>
            <span class = 'lap-time-value'>${currentLapTime}</span>`

            lapList.prepend(listItem)
        }
    }

    startButton.addEventListener('click', startStopWatch )
    pauseButton.addEventListener('click', pauseStopWatch )
    resetButton.addEventListener('click', resetStopWatch )
    lapButton.addEventListener('click', recordLap)

    updateDisplay();