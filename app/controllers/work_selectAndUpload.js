var args = arguments[0] || {};

var works = Alloy.Collections.works;
works.reset([]);

function retrieveWorksFromServer(works, _user) {
	var url = 'http://stagingapi.seelio.com/v1/users/' + _user + '/works?api_key=seelio';
	$.loading.show();
	var xhr = Ti.Network.createHTTPClient({
		onload: function (e) {
			$.loading.hide();
			var result = JSON.parse(this.responseText);
			result.forEach(function (workData) {
				var work = Alloy.createModel('works', workData);
				works.add(work);
			});
		},
		onerror: function(e) {
			$.loading.hide();
			console.log(e.error);
		},
		timeout: 5000
	});
	xhr.open("GET", url);
	xhr.send();
}

function uploadPhotoToWork(event) {
	var work = event.source;
	var url = 'http://stagingapi.seelio.com/v1/works/' + work._id + '/attachments?api_key=l5GufyCpYPaRoQB4wzZXeP%2BjZj6sT83b';
	var xhr = Ti.Network.createHTTPClient({
		onload: function (e) {
			$.window.close();
			alert('Successfully uploaded attachment!');
		},
		onerror: function(e) {
			console.log(e.error);
		},
		timeout: 5000
	});
	xhr.open("POST", url);
	xhr.send({
		file: args.blob
	});	
}

retrieveWorksFromServer(works, '501bd1a0fca473f97d000017');

$.window.addEventListener("close", function(){
    $.destroy();
});