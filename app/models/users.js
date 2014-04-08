exports.definition = {
	config: {
		columns: {
		    "_id": "text",
		    "firstName": "text",
		    "lastName": "text",
		    "fullName": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "users",
			idAttribute: "_id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};