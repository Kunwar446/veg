import mongoose from "mongoose";

// Pesticide Model
const pesticideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // description: {
    //     type: String,
    //     required: true
    // },
    // activeIngredients: [{
    //     ingredient: String,
    //     concentration: Number
    // }],
    formulation: {
        type: String,
        required:true,
        
    },
    targetPests: [String],
    availableQuantity: {
        type: Number,
        default: 0
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        default: 'default.jpg' // Default image
    },
    safetyDataSheet: {
        type: String, // URL to the SDS document
        required: true
    },
    regulatoryInformation: {
        type: String,
        required: true
    }
});

const Pesticide = mongoose.model('Pesticide', pesticideSchema);

export default Pesticide;