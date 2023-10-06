const { Category } = require('../models/category');
const { Task } = require('../models/task');
const { HttpError, ctrlWrapper } = require('../helpers');

const listCategories = async (req, res) => {
  const resultCaregories = await Category.find();
  const totalNumberCategories = resultCaregories.length;

  res.json({
    totalCategories: totalNumberCategories,
    categories: resultCaregories,
  });
};

const addCategory = async (req, res) => {
  const result = await Category.create({ ...req.body });
  res.status(201).json(result);
};

const removeCategory = async (req, res) => {
  const { id } = req.params;
  const resultCategory = await Category.findByIdAndRemove(id);
  if (!resultCategory) {
    throw HttpError(404, 'Not found');
  }

  const resultTasks = await Task.find({ categoryId: id });
  const arrayOfTaskPromises = resultTasks.map(async task => {
    const response = await Task.findByIdAndRemove(task._id);
    return response;
  });
  await Promise.all(arrayOfTaskPromises);

  res.status(200).json(resultCategory);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const result = await Category.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = {
  listCategories: ctrlWrapper(listCategories),
  removeCategory: ctrlWrapper(removeCategory),
  addCategory: ctrlWrapper(addCategory),
  updateCategory: ctrlWrapper(updateCategory),
};
