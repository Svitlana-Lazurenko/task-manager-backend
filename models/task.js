const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for task'],
    },
    description: {
      type: String,
      required: [true, 'Set description for task'],
    },
    dateStart: {
      type: String,
      required: [true, 'Set date of start for task'],
    },
    dateEnd: {
      type: String,
      required: [true, 'Set date of end for task'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post('save', handleMongooseError);

const addOrUpdateSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Missing required name field',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Missing required description field',
  }),
  dateStart: Joi.string().required().messages({
    'any.required': 'Missing required start date field',
  }),
  dateEnd: Joi.string().required().messages({
    'any.required': 'Missing required end date field',
  }),
});

const schemas = {
  addOrUpdateSchema,
};

const Task = model('task', taskSchema);

module.exports = {
  Task,
  schemas,
};
