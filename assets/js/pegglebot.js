(function(d) {
	var quoteContainers = d.getElementsByClassName('pegglebot-quotes');

	if (!quoteContainers) {
		return;
	}

	var fetchJSONFile = function (path, callback) {
		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (request.readyState === 4 && request.status === 200) {
				var data = JSON.parse(request.responseText);

				if (callback) {
					callback(data);
				}
			}
		};

		request.open('GET', path);
		request.send(); 
	}

	fetchJSONFile('/quotes.json', function(data){
		var entityMap = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': '&quot;',
			"'": '&#39;',
			"/": '&#x2F;'
		};

		Array.prototype.forEach.call(quoteContainers, function(each) {
			var showMeQuotes = function() {
				var quote = data[Math.floor(Math.random()*data.length)];

				var escapedQuote = quote.replace(/[&<>"'\/]/g, function (s) {
					return entityMap[s];
				});

				each.innerHTML = escapedQuote;
			};

			showMeQuotes();

			setInterval(showMeQuotes, 5000);
		});
	});
})(document);
