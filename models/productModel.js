const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
 
    description:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    category: {
        type :String,
        default: false
    },
    checked:{
        type: Boolean,
        default: false
    },

},{
    timestamps: true
})

module.exports = mongoose.model("Products", productSchema)