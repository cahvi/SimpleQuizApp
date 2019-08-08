const Test = require('../models/Test');
const User = require('../models/User');

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
    User.findById(req.user._id).then(user => {
      if (user.role !== 'admin') {
        res.status(401).send('You do not have access');
      } else {
        test
          .save()
          .then(test => {
            res.status(200).send(test);

            console.log(`${test} created!`);
          })
          .catch(err => {
            res.status(500).send(err);
          });
      }
    });
  },
  show(req, res) {
    Test.findById(req.params.testId)
      .then(test => {
        if (!test) {
          res.status(403).send('Error.');
        }

        res.status(200).send(test);
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },
  access(req, res) {
    const { id, password } = req.body;
    Test.findById(id)
      .then(test => {
        if (!test) {
          res.status(403).send('Error.');
        }

        if (test) {
          const isPasswordValid = test.comparePassword(password);
          if (!isPasswordValid) {
            return res.status(403).send({
              error: 'Invalid password'
            });
          }
        }

        res.status(200).send({
          message: 'Access granted',
          test
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({
          error: 'Enter a password'
        });
      });
  },
  sendanswer(req, res) {
    let questionIndex = req.body.question;
    let answerIndex = req.body.answer;
    let testId = req.params.testId;

    Test.findById(testId)
      .then(test => {
        if (
          test.questions[questionIndex].answers[answerIndex].correct === true
        ) {
          res.status(200).send('Correct answer!');
        } else {
          res.status(200).send('Wrong answer.');
        }
      })
      .catch(err => {
        res.status(500).send({
          error: err
        });
      });
  },
  testprogress(req, res) {
    console.log('hep');

    //TODO: get user test progress
  },
  testprogress_post(req, res) {
    console.log(req.body);

    //TODO: save progress to current user
  }
};
