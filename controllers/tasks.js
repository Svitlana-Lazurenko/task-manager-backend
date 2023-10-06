const { Task } = require('../models/task');
const { Category } = require('../models/category');
const { HttpError, ctrlWrapper } = require('../helpers');

const listTasks = async (req, res) => {
  const { id } = req.params;

  const result = await Task.find({ categoryId: id });
  const totalNumber = result.length;

  res.json({
    total: totalNumber,
    tasks: result,
  });
};

const addTask = async (req, res) => {
  const { id } = req.params;

  const resultCategory = await Category.findById(id);
  if (!resultCategory) {
    throw HttpError(404, 'Not found');
  }

  await Category.findByIdAndUpdate(id, {
    numberOfTasks: (resultCategory.numberOfTasks += 1),
  });

  const resultTask = await Task.create({ ...req.body, categoryId: id });
  res.status(201).json(resultTask);
};

const removeTask = async (req, res) => {
  const { id } = req.params;

  const resultTask = await Task.findByIdAndRemove(id);
  if (!resultTask) {
    throw HttpError(404, 'Not found');
  }

  const resultCategory = await Category.findById(resultTask.categoryId);
  if (!resultCategory) {
    throw HttpError(404, 'Not found');
  }
  await Category.findByIdAndUpdate(resultTask.categoryId, {
    numberOfTasks: (resultCategory.numberOfTasks -= 1),
  });

  res.status(200).json(resultTask);
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = {
  listTasks: ctrlWrapper(listTasks),
  removeTask: ctrlWrapper(removeTask),
  addTask: ctrlWrapper(addTask),
  updateTask: ctrlWrapper(updateTask),
};
