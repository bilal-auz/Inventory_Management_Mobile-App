const addEgg = async (req, res) => {
  //   const { count, id } = req.id;

  const data = { _id: req._id, body: req.body };

  res.status(200).send(data);
};

const getEggs = async (req, res) => {};

module.exports = { addEgg };
