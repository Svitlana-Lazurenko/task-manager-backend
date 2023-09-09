const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for category'],
    },
    numberOfTasks: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

categorySchema.post('save', handleMongooseError);

const addOrUpdateSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Missing required name field',
  }),
  numberOfTasks: Joi.number(),
});

const schemas = {
  addOrUpdateSchema,
};

const Category = model('category', categorySchema);

module.exports = {
  Category,
  schemas,
};
