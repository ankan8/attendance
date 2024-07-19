import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    RegistrationNumber: String,
});

const User = mongoose.model('attendance_records', UserSchema);

export default User;
