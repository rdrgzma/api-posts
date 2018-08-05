const mongoose = require('mongoose');

const User = mongoose.model('User');
module.exports = {
  async signup(req, res, next) {
    try {
      const { username, email } = req.body;
      if (await User.findOne({ $or: [{ username }, { email }] })) {
        return res.status(400).json({ error: 'Usuario já existe' });
      }
      const user = await User.create(req.body);

      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
};
