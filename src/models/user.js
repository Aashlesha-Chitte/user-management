import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required']
        },
        phone: {
            type: String,
            required: false
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        role_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
            required: false
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema, 'User');

export default User;
