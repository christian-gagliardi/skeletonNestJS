import * as mongoose from 'mongoose';

const QrSchema = new mongoose.Schema(
  {
    shortUrl      : {type: String, required: true, unique: true},
    redirectUrl   : {type: String, required: true, unique: true},
    note          : {type: String},
    isPhaRedirect : {type: Boolean},
    storeOwner    : {type: mongoose.Schema.Types.ObjectId, ref: 'stores', required: true, unique: true},
    qrImage       : {type: String, required: true, unique: true},
    code          : {type: String, required: true, unique: true},
    locked        : {type: Boolean, default: false}
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
  }
);

QrSchema.index({code: 1});

export default QrSchema;
