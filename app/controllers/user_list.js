var users = Alloy.Collections.users;

function retrieveUsersFromServer(users) {
	var url = 'http://stagingapi.seelio.com/v1/users?api_key=seelio';
	var xhr = Ti.Network.createHTTPClient({
		onload: function (e) {
			var result = JSON.parse(this.responseText);
			result.forEach(function (userData) {
				var user = Alloy.createModel('users', userData);
				users.add(user);
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
		
retrieveUsersFromServer(users);

function showUserWorks(event) {
	var user = event.source;
	var args = {
		_user: user._id
	};
	var workListView = Alloy.createController("work_list", args).getView();
	workListView.open();
}