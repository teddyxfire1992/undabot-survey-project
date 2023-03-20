const getSurvey = (req, res) => {
	res.json({
		data: {
			type: 'surveys',
			id: '2660dd24-e2db-42c1-8093-284b1df2664c',
			attributes: {
				title: 'Film feedback form',
				description:
					'<p>Thank you for participating in the film festival!</p><p>Please fill out this short survey so we can record your feedback.</p>',
				questions: [
					{
						questionId: 'film',
						questionType: 'text',
						label: 'What film did you watch?',
						required: true,
						attributes: null,
					},
					{
						questionId: 'review',
						questionType: 'rating',
						label: 'How would you rate the film? (1 - Very bad, 5 - Very good)',
						required: true,
						attributes: {
							min: 1,
							max: 5,
						},
					},
				],
			},
		},
	});
};

const processAnswer = (req, res) => {
	const errors = [];
	if (
		!req.body.data ||
		!req.body.data.attributes ||
		!req.body.data.attributes.answers
	) {
		return res.status(500).json({
			errors: [
				{
					title: 'Internal Server Error',
					detail: `Something went wrong. We're working on it!`,
				},
			],
		});
	}

	const { answers } = req.body.data.attributes;

	if (answers.length === 0) {
		errors.push(
			{
				source: { pointer: 'data/attributes/answers/film' },
				detail: 'The value is required',
			},
			{
				source: { pointer: 'data/attributes/answers/review' },
				detail: 'The value is required',
			}
		);
	} else {
		const isFilmQuestionAnswered = answers.some(
			(answer) => answer.questionId === 'film'
		);
		const isReviewQuestionAnswered = answers.some(
			(answer) => answer.questionId === 'review'
		);

		if (!isFilmQuestionAnswered) {
			errors.push({
				source: { pointer: 'data/attributes/answers/film' },
				detail: 'The value is required',
			});
		}

		if (!isReviewQuestionAnswered) {
			errors.push({
				source: { pointer: 'data/attributes/answers/review' },
				detail: 'The value is required',
			});
		}
	}

	if (errors.length > 0) {
		return res.status(422).json({
			errors,
		});
	}

	res.status(201).json({
		data: {
			type: 'surveyAnswers',
			id: '9c7160a4-e9ad-499e-92f6-07d7cdb0382c',
			attributes: {
				answers,
			},
			relationships: {
				survey: {
					data: {
						type: 'surveys',
						id: '2660dd24-e2db-42c1-8093-284b1df2664c',
					},
				},
			},
		},
	});
};

module.exports = {
	getSurvey,
	processAnswer,
};
