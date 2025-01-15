import mongoose, {Schema} from "mongoose";

const accountSchema = new Schema({
    balance: {
        type: Number,
    },
    owner: {
        type: mongoose.Types.ObjectId
    }
}) 

export const Account = mongoose.model('Account', accountSchema)