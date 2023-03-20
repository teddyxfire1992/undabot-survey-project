const express = require('express');
const surveyRouter = express.Router();
const surveyController = require('../../controllers/survey');

surveyRouter.route('/').get(surveyController.getSurvey);

surveyRouter.route('/:id/answers').post(surveyController.processAnswer);

module.exports = surveyRouter;
