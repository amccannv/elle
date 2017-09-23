const request = require('request');
var parseString = require('xml2js').parseString;

// Send request to Microsoft Translation for individual message.
exports.translateMessage = function(message, fromLang, toLang) {

	var subscrID = '0b418bf5-69eb-4095-87b1-d8a149b4aa26';
	var headers = {"Ocp-Apim-Subscription-Key": '0b418bf5-69eb-4095-87b1-d8a149b4aa26'};
	var translateUrl = 'http://api.microsofttranslator.com/v2/http.svc/translate?text=' +
		message + '&from=' + fromLang + '&to=' + toLang;

	var options = {
		url: translateUrl,
		headers: {
			"Ocp-Apim-Subscription-Key": "89e428375f9449e2bd49d91127e5f203"
		}
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = body;
			parseString(info, function (err, result) {
				console.dir(result);
			});
			//console.log(info);
		} else {
			console.log(body);
		}
	}

	request.get(options, callback);
	//console.log(request(translateUrl));
};