const mongoose = require('mongoose');

// set advertisement schema
const advertSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minlength: [1, 'Name must contain at least 1 character'],
        index: true
        },

    sell: {
        type: Boolean, 
        required: true,
        index: true
        },

    price: { 
        type: Number, 
        required: true, 
        //to accept >0 prices
        min: [0.01, 'Price must be greater than zero'],
        //validation to accept only 2 decimal
        validate: {
            validator: function(value) {
                return /^\d+(\.\d{1,2})?$/.test(value);
            },
            message: props => `${props.value} is not a valid price. Price must have up to 2 decimal places.`
        },
        index: true
        },

    photo: {
        type: String, 
        required: true,
        //format validation of photos
        validate: {
            validator: function(value) {
                return /\.(jpg|jpeg|png)$/.test(value);
            },
            message: props => `${props.value} is not a valid photo format. Photo must be in .jpg or .png format.`
        }
        },

    tags: [{
        type: String, 
        required: true,
        enum: {
            values: ['work', 'lifestyle', 'motor', 'house', 'clothes', 'sports', 'tech' ,'other'],
            message: 'Only this tags are allowed: Work, Lifestyle, Motor, House, Clothes, Sports, Tech, Other' 
        },
        index: true
    }],
    owner: { ref: 'User', type: mongoose.Schema.ObjectId },
});

// Middleware pre to convert tags to lowercase
advertSchema.pre('validate', function(next) {
    this.tags = this.tags.map(tag => tag.toLowerCase());
    next();
});


// Used in API filters (adverts.js)
advertSchema.statics.list = function(filter, skip, limit, sort, fields){
    const query = Advert.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.sort(sort);
    query.select(fields);
    return query.exec();
}

// create advert model
const Advert = mongoose.model('Advert', advertSchema)

// (optional) export model
module.exports = Advert;