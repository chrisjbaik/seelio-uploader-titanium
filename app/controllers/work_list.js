var args = arguments[0] || {};

var works = Alloy.Collections.works;

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
		

function showWork(e) {
	var section = $.workList.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	var args = {
		title: item.properties.title,
		attachments: item.properties.attachments,
		cover: item.properties.cover
	};
	var workView = Alloy.createController("work_view", args).getView();
	workView.open();
}

function uploadPhotoToWork(e) {
	var section = $.workList.sections[e.sectionIndex];
	var item = section.getItemAt(e.itemIndex);
	var url = 'http://stagingapi.seelio.com/v1/works/' + item.properties._id + '/attachments?api_key=l5GufyCpYPaRoQB4wzZXeP%2BjZj6sT83b';
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

function itemClickHandler(e) {
	switch (args.clickHandler) {
		case "uploadPhotoToWork":
			uploadPhotoToWork(e);
			break;
		case "showWork":
		default:
			showWork(e);
	}
}

$.window.addEventListener("open", function(){
	works.reset([]);	
	retrieveWorksFromServer(works, args._user);
	
	if (Ti.Platform.osname === "android") {
		if ($.window.activity) {
			$.window.activity.actionBar.title = args.actionBarTitle;
			if (args.profile_photo_url) {
				$.window.activity.actionBar.setIcon(args.profile_photo_url);
			}
			$.window.activity.actionBar.setDisplayHomeAsUp(true);
			$.window.activity.actionBar.onHomeIconItemSelected = function () {
				$.window.close();
			};
		}
	}
});

$.window.addEventListener("close", function(){
    $.destroy();
});