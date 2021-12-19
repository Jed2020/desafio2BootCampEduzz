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
	"audio/simonSound1.mp3",
	"audio/simonSound2.mp3",
	"audio/simonSound3.mp3",
	"audio/simonSound4.mp3"
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

	_options.led.classList.remove("optoions_led--active")
});

_options.strict.addEventListener("click", () => {
	if (!_data.gameOn)
		return;
	_data.strict = _options.led.classList.toggle("optoions_led--active");

});

_options.start.addEventListener("click", () => {

});

const padListener = (e) => {

}

_options.pads.forEach(pad => {
	pad.addEventListener("click", padListener);
});

const startGame = () => {

}

const setScore = () => {

}

const newColor = () => {

}

const playSequence = () => {

}

const blink = (text, callback) => {

}

const waitForPlayerClick = () => {

}

const resetOrPlayAgain = () => {

}

const changePadCursor = (cursorType) => {

}

const disablePads = () => {
	_options.pads.forEach(pad => {
		pad.classList.remove("game_color--active");
	});

}