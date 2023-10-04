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
      required: [true, 'Number of tasks cannot be set'],
    },
  },

  { versionKey: false, timestamps: { currentTime: ()=> Date.now().toDateString() } }
);

categorySchema.post('save', handleMongooseError);

const addOrUpdateSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Missing required name field',
  }),
});

const schemas = {
  addOrUpdateSchema,
};

const Category = model('category', categorySchema);

module.exports = {
  Category,
  schemas,
};
