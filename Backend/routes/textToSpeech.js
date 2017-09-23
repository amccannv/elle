const request = require('request');

// Send request to Bing to convert text to speech in chosen language.
exports.textToSpeech = function(message, fromLang, toLang) {

	var optionsForToken = {
		url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
		headers: {
			"Ocp-Apim-Subscription-Key": "b0fe2e083d5d41169da9f6fb7eae829d"
		}
	};

	var callback = (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var token = body;
			console.log(token);
		} else {
			console.log(response);
		}
	};
	request.post(optionsForToken, callback);

	//
	//
	//
	// var subscrID = '0b418bf5-69eb-4095-87b1-d8a149b4aa26';
	// var headers = {"Ocp-Apim-Subscription-Key": '0b418bf5-69eb-4095-87b1-d8a149b4aa26'};
	// var translateUrl = 'http://api.microsofttranslator.com/v2/http.svc/translate?text=' +
	// 	encodeURIComponent(message) + '&from=' + fromLang + '&to=' + toLang;
	//
	// var optionsToSpeech = {
	// 	url: translateUrl,
	// 	headers: {
	// 		'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3',
	// 		'X-Search-AppId': '7e5fab05-44d6-4c53-8458-b24cae9a679c',
	// 		'X-Search-ClientId': 'e324777d-8ea3-4de2-8455-33291d4ac51d',
	// 		'User-Agent': 'Elle Chat Application',
	// 		'Authorization':
	// 	}
	// };
	//
	// request.get(optionsToSpeech, callback);
};