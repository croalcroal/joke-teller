const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// disable/enable button
function toggleButton() {
	button.disabled = !button.disabled;
}

// Passing joke to our voice rss api
function tellMe(joke) {
	VoiceRSS.speech({
		// would normally be served from backend and not be front facing. this is a fun project, key is public. nbd
		key: '3b3cf3d9388846fea7aab679af571433',
		src: joke,
		hl: 'en-us',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false
	});
}

// Get jokes fromn joke API
async function getJokes() {
	let joke = '';
	const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		// Text-to speech
		tellMe(joke);
		// Disable button
		toggleButton();

	} catch (error) {
		// catch errors
		console.log('Whoops, Joke api -', error);
	}
}

// Add event listener to button to launch joke
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);