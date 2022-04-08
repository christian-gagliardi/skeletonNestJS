import * as mongoose from 'mongoose';

const ContractSchema = new mongoose.Schema(
  {
    store   : {type: mongoose.Schema.Types.ObjectId, ref: 'stores', required: true, unique: true},
    qr      : {type: mongoose.Schema.Types.ObjectId, ref: 'qr', required: true, unique: true},
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
  }
);

ContractSchema.index({code: 1});

export default ContractSchema;
