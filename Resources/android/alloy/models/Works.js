exports.definition = {
    config: {
        columns: {
            title: "text",
            attachments: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "works",
            idAttribute: "_id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            initialize: function(data) {
                data && data.cover && data.cover.thumbs && data.cover.thumbs.m && this.set("cover_m", data.cover.thumbs.m);
                return this;
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("works", exports.definition, []);

collection = Alloy.C("works", exports.definition, model);

exports.Model = model;

exports.Collection = collection;