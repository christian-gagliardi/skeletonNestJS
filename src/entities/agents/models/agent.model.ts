import * as mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema({
    name            : {type: String, required: true},
    surname         : {type: String, required: true},
    email           : {type: String, required: true},
    phone           : {type: String, required: true},
    note            : {type: String, default: null},
    active          : {type: Boolean, default: true},
    contracts       : {type: mongoose.Schema.Types.ObjectId, ref: 'contracts', required: false, unique: true},
});

AgentSchema.index({ surname: 'text' }, {
    default_language: 'italian',
    background: true
})
export default AgentSchema;
