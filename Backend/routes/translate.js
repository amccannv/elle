const request = require('request');

// Send request to Microsoft Translation for individual message.
exports.translateMessage = function(message, fromLang, toLang, callback) {

	var subscrID = '0b418bf5-69eb-4095-87b1-d8a149b4aa26';
	var headers = {"Ocp-Apim-Subscription-Key": '0b418bf5-69eb-4095-87b1-d8a149b4aa26'};
	var translateUrl = 'http://api.microsofttranslator.com/v2/http.svc/translate?text=' +
		encodeURIComponent(message) + '&from=' + fromLang + '&to=' + toLang;

	var options = {
		url: translateUrl,
		headers: {
			"Ocp-Apim-Subscription-Key": "89e428375f9449e2bd49d91127e5f203"
		}
	};

	request.get(options, callback);
};