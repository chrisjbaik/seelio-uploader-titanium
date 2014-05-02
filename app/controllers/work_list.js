var args = arguments[0] || {};

var works = Alloy.Collections.works;
works.reset([]);

function retrieveWorksFromServer(works, _user) {
	var url = 'http://stagingapi.seelio.com/v1/users/' + _user + '/works?api_key=seelio';
	var xhr = Ti.Network.createHTTPClient({
		onload: function (e) {
			var result = JSON.parse(this.responseText);
			result.forEach(function (workData) {
				var work = Alloy.createModel('works', workData);
				works.add(work);
			});
		},
		onerror: function(e) {
			console.log(e.error);
		},
		timeout: 5000
	});
	xhr.open("GET", url);
	xhr.send();
}
		
retrieveWorksFromServer(works, args._user);

function showWork(event) {
	var work = event.source;
	var args = {
		title: work.title,
		attachments: work.attachments
	};
	var workView = Alloy.createController("work_view", args).getView();
	workView.open();
}

$.window.addEventListener("close", function(){
    $.destroy();
});