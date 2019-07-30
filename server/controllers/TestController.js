const Test = require('../models/Test');

module.exports = {
  index(req, res) {
    Test.find()
      .then(test => {
        res.status(200).send(test);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  post(req, res) {
    const test = new Test(req.body);

    test
      .save()
      .then(test => {
        res.status(200).send(test);

        console.log(`${test} created!`);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  show(req, res) {
    Test.findById(req.params.testId)
      .then(test => {
        res.status(200).send(test);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
