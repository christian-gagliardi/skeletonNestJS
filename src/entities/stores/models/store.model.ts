import * as mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
    location        : { type: { type: String, default: 'Point' }, coordinates: { type: [Number], required: true }},
    description     : {type: String, default: null},
    note            : {type: String, default: null},
    phone           : {type: String, required: true},
    email           : {type: String, required: true},
    active          : {type: Boolean, default: true},
    code            : {type: String, required: true, unique: true },
    name            : {type: String, required: true},
    address         : {type: String, required: true},
    city            : {type: String, required: true},
    cap             : {type: String, required: true, min: 5, max: 5},
    isVirtual       : {type: Boolean, default: false},
    whatsapp        : {type: String, default: null},
    doctor          : {type: String, default: null},
    pro             : {type: Boolean, default: false},
    display_name    : {type: String, default: null},
    region          : {type: String, default: null},
    whatsapp_prefix : {type: String, default: '+39'},
});

StoreSchema.index({location: '2dsphere'});
StoreSchema.index({ name: 'text', city: 'text' }, {
    weights: {city: 5,name: 10},
    default_language: 'italian',
    background: true
})
export default StoreSchema