const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;
const CountrySchema = new mongoose.Schema({
    countries: {
        id: ObjectId,
        country: []
    }
})
module.exports = mongoose.model("Country", CountrySchema);