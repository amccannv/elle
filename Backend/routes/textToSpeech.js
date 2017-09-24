const request = require('request');

const VOICES = {
	'ar-eg female': 'Microsoft Server Speech Text to Speech Voice (ar-EG, Hoda)',
	'de-de female': 'Microsoft Server Speech Text to Speech Voice (de-DE, Hedda)',
	'en-ca female': 'Microsoft Server Speech Text to Speech Voice (en-CA, Linda)',
	'es-es female': 'Microsoft Server Speech Text to Speech Voice (es-ES, Laura, Apollo)',
	'fr-fr female': 'Microsoft Server Speech Text to Speech Voice (fr-FR, Julie, Apollo)',
	'it-it male': 'Microsoft Server Speech Text to Speech Voice (it-IT, Cosimo, Apollo)',
	'ja-jp female': 'Microsoft Server Speech Text to Speech Voice (ja-JP, Ayumi, Apollo)',
	'pt-br male': 'Microsoft Server Speech Text to Speech Voice (pt-BR, Daniel, Apollo)',
	'ru-ru female': 'Microsoft Server Speech Text to Speech Voice (ru-RU, Irina, Apollo)',
	'zh-cn female': 'Microsoft Server Speech Text to Speech Voice (zh-CN, Yaoyao, Apollo)',
};


var languageCodes = {'en':{code: 'en-CA', voice: "Microsoft Server Speech Text to Speech Voice (en-CA, Linda)"}};

// Send request to Bing to convert text to speech in chosen language.
exports.getToken = function(message, toLang) {

	var optionsForToken = {
		url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
		headers: {
			"Ocp-Apim-Subscription-Key": "b0fe2e083d5d41169da9f6fb7eae829d"
		}
	};

	var callbackToken = (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var token = body;;
		} else {
			console.log(response);
		}
	};



	return new Promise((resolve, reject) => {
		request.post(optionsForToken, (err, res, body) => {
			if (err) {
				return reject(err);
			}
			if (res.statusCode !== 200) {
				return reject(new Error(`Wrong status code ${res.statusCode} in Bing Speech API / token`));
			}
			resolve(body);
		});
	});
};


exports.synthesizeAudio = function(message, locale, res) {

	return this.getToken()
		.then((token) => {
			this.token = token;

			let font = voiceFont(locale, 'female');
			if (!font) {
				throw new Error(`No voice font for lang ${locale} and gender ${gender}`);
			}

			let ssml = `<speak version='1.0' xml:lang='${locale}'><voice name='${font}' xml:lang='${locale}' xml:gender='female'>${message}</voice></speak>`;
			let optionsToSpeech = {
				url: 'https://speech.platform.bing.com/synthesize',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'text/xml',
					'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
					'User-Agent': 'Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405'
				},
				body: ssml
			};
			return request.post(
				optionsToSpeech,
				function (error, response, body) {
					if (!error && response.statusCode == 200) {
						//console.log(body)
						res.send(body);
					} else {
						console.log(error);
					}
				}
			);
		})
		.catch((err) => {
			throw new Error(`Voice synthesis failed miserably: ${err.message}`);
		});
};

function voiceFont(locale, gender) {
	let voiceKey = (locale + ' ' + gender).toLowerCase();
	return VOICES[voiceKey];
}