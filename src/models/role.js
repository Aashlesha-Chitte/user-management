import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Role name is required'],
      unique: true,
      trim: true
    },
    permissions: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Role = mongoose.model('Role', roleSchema, 'Role');

export default Role;
