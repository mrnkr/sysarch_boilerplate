import * as db from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new db.Schema({
  email: String,
  password: String
}, { timestamps: true });

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePasswords = function(password) {
  return bcrypt.compare(password, this.password);
}

userSchema.methods.toDto = function() {
  return {
    id: this._id,
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
}

export default db.model('User', userSchema);
