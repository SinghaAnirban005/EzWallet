import mongoose, {Schema} from "mongoose";

const transactionSchema = new Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ['success', 'failed', 'pending']
    }
},{
    timestamps: true
}) 

export const Transactions = mongoose.model('Transactions', transactionSchema)