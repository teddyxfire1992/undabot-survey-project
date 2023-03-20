import { createServer, Response } from 'miragejs';
import { MOCK_API_URL } from '../utils/constants';

export const mockServer = () => {
	createServer({
		routes() {
			this.urlPrefix = MOCK_API_URL;
			this.get('/survey', () => ({
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
								label:
									'How would you rate the film? (1 - Very bad, 5 - Very good)',
								required: true,
								attributes: {
									min: 1,
									max: 5,
								},
							},
						],
					},
				},
			}));
			this.post('/survey/:id/answers', (schema, request) => {
				const body = JSON.parse(request.requestBody);

				// simulate internal server error
				if (
					!body.data ||
					!body.data.attributes ||
					!body.data.attributes.answers
				) {
					return new Response(
						500,
						{},
						{
							errors: [
								{
									title: 'Internal Server Error',
									detail: `Something went wrong. We're working on it!`,
								},
							],
						}
					);
				}

				return {
					data: {
						type: 'surveyAnswers',
						id: '9c7160a4-e9ad-499e-92f6-07d7cdb0382c',
						attributes: {
							answers: body.data.attributes.answers,
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
				};
			});
			this.passthrough('http://localhost:5000/***');
		},
	});
};
