import mongoose, {Schema} from "mongoose";

const transactionSchema = new Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
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