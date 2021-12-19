const _data = {
	gameOn: false,
	timeout: undefined,
	sounds: [],

	strict: false,
	playerCanPlay: false,
	score: 0,
	gameSequence: [],
	playerSequence: []
};

const _options = {
	counter: document.querySelector(".options_counter"),
	switch: document.querySelector(".options_btn--switch"),
	led: document.querySelector(".options_led"),
	strict: document.querySelector(".options_btn--strict"),
	start: document.querySelector(".options_btn--start"),
	pads: document.querySelectorAll(".game_color")
}

const _soundUrls = [
	"sounds/sound1.mp3",
	"sounds/sound2.mp3",
	"sounds/sound3.mp3",
	"sounds/sound4.mp3"
];

_soundUrls.forEach(sndPath => {
	const audio = new Audio(sndPath);
	_data.sounds.push(audio);
});

_options.switch.addEventListener("click", () => {
	_data.gameOn = _options.switch.classList.toggle("options_btn--switch--on");
	
	_options.counter.classList.toggle("options_counter--on");
	_options.counter.innerHTML = "--";

	_data.strict = false;
	_data.startGame = false;
	_data.playerCanPlay = false;
	_data.score = 0;
	_data.gameSequence = [];
	_data.playerSequence = [];

	disablePads();
	changePadCursor("auto");

	_options.led.classList.remove("options_led--active")
});

_options.strict.addEventListener("click", () => {
	if (!_data.gameOn)
		return;
	_data.strict = _options.led.classList.toggle("options_led--active");

});

_options.start.addEventListener("click", () => {
	startGame();
});

const padListener = (e) => {
	if (!_data.playerCanPlay)
		return;

	let soundId;
	_options.pads.forEach((pad, key) => {
		if (pad === e.target)
			soundId = key;
	});

	e.target.classList.add("game_color--active");

	_data.sounds[soundId].play();
	_data.playerSequence.push(soundId);

	setTimeout(() => {
		e.target.classList.remove("game_color--active");

		const currentMove = _data.playerSequence.length - 1;

		if (_data.playerSequence[currentMove] !== _data.gameSequence[currentMove]) {
			_data.playerCanPlay = false;
			disablePads();
			resetOrPlayAgain();
		}
		else if (currentMove === _data.gameSequence.length - 1) {
			newColor();
		}

		waitForPlayerClick();
	}, 250);
}

_options.pads.forEach(pad => {
	pad.addEventListener("click", padListener);
});

const startGame = () => {
	blink("--", () => {
		newColor();
		playSequence();
	});
}

const setScore = () => {
	const score = _data.score.toString();
	const display = "00".substring(0, 2 - score.length) + score;
	_options.counter.innerText = display;
}

const newColor = () => {
	if (_data.score === 20) {
		blink("**", startGame);
		return;
	}
	
	_data.gameSequence.push(Math.floor(Math.random() * 4));
	_data.score++;

	setScore();
	playSequence();
}

const playSequence = () => {
	let counter = 0,
		padOn = true;

	_data.playerSequence = [];
	_data.playerCanPlay = false;

	changePadCursor("auto");

	const interval = setInterval(() => {
		if (!_data.gameOn) {
			clearInterval(interval);
			disablePads();
			return;
		}

		if (padOn) {
			if (counter === _data.gameSequence.length) {
				clearInterval(interval);
				disablePads();
				waitForPlayerClick();
				changePadCursor("pointer");
				_data.playerCanPlay = true;
				return;
			}

			const sndId = _data.gameSequence[counter];
			const pad = _options.pads[sndId];

			_data.sounds[sndId].play();
			pad.classList.add("game_color--active");
			counter++;
		}
		else {
			disablePads();
		}

		padOn = !padOn;
	}, 750);
}

const blink = (text, callback) => {
	let counter = 0,
		on = true;

	_options.counter.innerText = text;

	const interval = setInterval(() => {
		if (!_data.gameOn) {
			clearInterval(interval);
			_options.counter.classList.remove("options_counter--on");
			return;
		}

		if (on) {
			_options.counter.classList.remove("options_counter--on");
		}
		else {
			_options.counter.classList.add("options_counter--on");

			if (++counter === 3) {
				clearInterval(interval);
				callback();
			}
		}

		on = !on;
	}, 250);
}

const waitForPlayerClick = () => {
	clearTimeout(_data.timeout);

	_data.timeout = setTimeout(() => {
		if (!_data.playerCanPlay)
			return;

		disablePads();
		resetOrPlayAgain();
	}, 5000);
}

const resetOrPlayAgain = () => {
	_data.playerCanPlay = false;

	if (_data.strict) {
		blink("!!", () => {
			_data.score = 0;
			_data.gameSequence = [];
			startGame();
		});
	}
	else {
		blink("!!", () => {
			setScore();
			playSequence();
		});
	}
}

const changePadCursor = (cursorType) => {
	_options.pads.forEach(pad => {
		pad.style.cursor = cursorType;
	});
}

const disablePads = () => {
	_options.pads.forEach(pad => {
		pad.classList.remove("game_color--active");
	});
}