const { StatusCodes } = require('http-status-codes');
const { dummyData } = require('../dummyData');
const getAllChartsData = async (req, res) => {
  res.status(StatusCodes.OK).json({
    data: dummyData,
  });
};

module.exports = { getAllChartsData };
