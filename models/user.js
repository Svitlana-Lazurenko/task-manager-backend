const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    role: {
      type: String,
      required: [true, 'Set role for user'],
    },
    token: String,
  },

  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  role: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

// const emailSchema = Joi.object({
//   email: Joi.string().required(),
// });

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const schemas = {
  registerSchema,
  //   emailSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
