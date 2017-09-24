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


exports.synthesizeAudio = function(message, locale) {

	return this.getToken()
		.then((token) => {
			this.token = token;
			console.log(this.token);
			let font = voiceFont(locale, 'female');
			if (!font) {
				throw new Error(`No voice font for lang ${locale} and gender ${gender}`);
			}

			//let ssml = `<speak version='1.0' xml:lang='${locale}'><voice name='${font}' xml:lang='${locale}' xml:gender='female'>${message}</voice></speak>`;
			let ssml = `<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='Microsoft Server Speech Text to Speech Voice (en-US, ZiraRUS)'>Microsoft Bing Voice Output API</voice></speak>`
			let optionsToSpeech = {
				url: 'https://speech.platform.bing.com/synthesize',
				headers: {
					'Authorization': `Bearer ${this.token}`,
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': ssml.length,
					'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
					'X-Search-AppId': '7e5fab05-44d6-4c53-8458-b24cae9a679c',
					'X-Search-ClientId': 'e324777d-8ea3-4de2-8455-33291d4ac51d',
					'User-Agent': 'Elle Chat Application',
				},
			};
			console.log(ssml);
			request.post(
				{url: 'https://speech.platform.bing.com/synthesize',
					body : ssml,
					headers: {
						'Authorization': `Bearer ${this.token}`,
						'Content-Type': 'application/ssml+xml',
						//'Content-Length': ssml.length,
						'X-Microsoft-OutputFormat': 'riff-8khz-8bit-mono-mulaw',//'audio-16khz-128kbitrate-mono-mp3',
						//'X-Search-AppId': '7e5fab05-44d6-4c53-8458-b24cae9a679c',
						//'X-Search-ClientId': 'e324777d-8ea3-4de2-8455-33291d4ac51d',
						//'User-Agent': 'Elle Chat Application',
					},
				},
				function (error, response, body) {
					console.log("RETURNED");
					//console.log(error);
					console.log(response.status);
					//console.log(body);
					console.log("FINISH RETURNED");
					if (!error && response.statusCode == 200) {
						console.log(body + 'here')
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