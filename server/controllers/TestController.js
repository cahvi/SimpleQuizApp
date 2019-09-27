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
          })
          .catch(err => {
            console.log(err);
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

        test.questions.map(el => {
          el.answers.map(x => {
            if ((x.correct = true)) {
              x.correct = false;
            }
          });
        });

        res.status(200).send(test);
      })
      .catch(err => {
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
          message: 'Access granted'
        });
      })
      .catch(err => {
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
    User.findOne(req.user)
      .then(user => {
        if (!user) {
          res.status(400).send({
            error: 'User not found'
          });
        }

        let correctTest = user.testprogresses[req.params.testId];
        if (correctTest) {
          res.status(200).send(correctTest);
        } else {
          res.status(200).send('');
        }
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  },
  testprogress_post(req, res) {
    const test = req.body;
    const user = req.user;
    User.findById(user._id)
      .then(user => {
        user.testprogresses[test._id] = test;
        user.markModified('testprogresses');
        user.save();
      })
      .catch(err => {
        res.status(500).send(err);
      });

    res.status(200).send('Ok');
  }
};
