exports.definition = {
	config: {
		columns: {
		    "title": "text",
		    "attachments": "text"
		},
		adapter: {
			type: "sql",
			collection_name: "works",
			idAttribute: "_id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
			initialize: function (data) {
				if (data && data.cover && data.cover.thumbs && data.cover.thumbs.m) {
					this.set('cover_m', data.cover.thumbs.m);
				}
				return this;
			}
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