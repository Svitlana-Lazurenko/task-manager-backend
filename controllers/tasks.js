const { Task } = require('../models/task');
const { HttpError, ctrlWrapper } = require('../helpers');

const listTasks = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const resultTotal = await Task.find({ $and: [{ owner }] });
  const totalNumber = resultTotal.length;
  const result = await Category.find({ $and: [{ owner }] }, '', {
    skip,
    limit,
  }).populate('category');

  res.json({
    total: totalNumber,
    currentPage: page,
    perPage: limit,
    tasks: result,
  });
};

// const getCategoryById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Category.findById(id);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

const addTask = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Task.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    message: 'Task deleted',
  });
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
  //   getContactById: ctrlWrapper(getContactById),
  removeTask: ctrlWrapper(removeTask),
  addTask: ctrlWrapper(addTask),
  updateTask: ctrlWrapper(updateTask),
};
