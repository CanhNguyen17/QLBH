const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
//
const Schema = mongoose.Schema;

const ProductCart = new Schema({
    productId: { type: String, require: true },
    name: { type: String, require: true },
    image: { type: String, maxLength: 255 },
    newPrice: { type: String, require: true },
    quantity: {type: Number, default: 1, min: [1]},
    slug: { type: String, slug: "name", unique: true },
}, {
    timestamps: true
})

module.exports = mongoose.model('ProductCart', ProductCart);