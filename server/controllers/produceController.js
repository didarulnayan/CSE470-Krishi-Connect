const Produce = require('../models/Produce');

const getProduceList = async (req, res) => {
  try {
    const produceList = await Produce.find().sort({ _id: -1 });
    res.status(200).json(produceList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch produce.' });
  }
};

module.exports = { getProduceList };
