const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
//
const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, require: true },
    description: { type: String, maxLength: 600 },
    image: { type: String, maxLength: 255 },
    oldPrice: { type: String, require: true },
    newPrice: { type: String, require: true },
    location: { type: String, maxLength: 20 },
    slug: { type: String, slug: "name", unique: true },
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', Product);