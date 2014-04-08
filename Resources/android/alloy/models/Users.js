exports.definition = {
    config: {
        columns: {
            _id: "text",
            firstName: "text",
            lastName: "text",
            fullName: "text"
        },
        adapter: {
            type: "sql",
            collection_name: "users",
            idAttribute: "_id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("users", exports.definition, []);

collection = Alloy.C("users", exports.definition, model);

exports.Model = model;

exports.Collection = collection;