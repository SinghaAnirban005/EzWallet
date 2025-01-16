import mongoose, {Schema} from "mongoose";

const accountSchema = new Schema({
    balance: {
        type: Number,
    },
    owner: {
        type: mongoose.Types.ObjectId
    },
    currency: {
        type: String
    }
},{
    timestamps: true
}) 

export const Account = mongoose.model('Account', accountSchema)