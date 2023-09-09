const { Category } = require('../models/category');
const { HttpError, ctrlWrapper } = require('../helpers');

const listCategories = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const resultTotal = await Category.find({ $and: [{ owner }] });
  const totalNumber = resultTotal.length;
  const result = await Category.find({ $and: [{ owner }] }, '', {
    skip,
    limit,
  }).populate('owner', 'role');

  res.json({
    total: totalNumber,
    currentPage: page,
    perPage: limit,
    categories: result,
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

const addCategory = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Category.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeCategory = async (req, res) => {
  const { id } = req.params;
  const result = await Category.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({
    message: 'Category deleted',
  });
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
  //   getContactById: ctrlWrapper(getContactById),
  removeCategory: ctrlWrapper(removeCategory),
  addCategory: ctrlWrapper(addCategory),
  updateCategory: ctrlWrapper(updateCategory),
};
