import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { CardIntro } from '../../components/card-intro';
import { CardText } from '../../components/card-text';
import { CardRating } from '../../components/card-rating';
import { Button } from '../../components/button';
import { genericErrorMessage } from '../../utils/constants';
import { Notification } from '../../components/notification';

export const Home = () => {
	const [surveyData, setSurveyData] = useState(null);
	const [answers, setAnswers] = useState([]);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [generalErrorMessage, setGeneralErrorMessage] = useState({
		title: '',
		message: '',
	});
	const [fieldErrors, setFieldErrors] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/survey`);
			setSurveyData(res.data.data);
		} catch (e) {
			if (e.message) {
				setGeneralErrorMessage({
					title: 'Error',
					message: e.message,
				});
			} else {
				setGeneralErrorMessage(genericErrorMessage);
			}
			setIsAlertOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmitErrorResponse = (errorData) => {
		if (errorData.errors) {
			const { errors } = errorData;
			const newFieldErrors = {};
			let newGenericError = null;

			errors.forEach((error) => {
				if (error.detail && error.source) {
					const { pointer } = error.source;
					const questionId = pointer.split('/').pop();

					if (fieldErrors[questionId]) {
						newFieldErrors[questionId] = [
							...fieldErrors[questionId],
							error.detail,
						];
					} else {
						newFieldErrors[questionId] = [error.detail];
					}
				} else if (error.title && error.detail) {
					newGenericError = {
						title: error.title,
						message: error.detail,
					};
				}
			});

			if (Object.keys(newFieldErrors).length > 0) {
				setFieldErrors(newFieldErrors);
			}

			if (newGenericError) {
				setGeneralErrorMessage(newGenericError);
				setIsAlertOpen(true);
			}
		} else {
			setGeneralErrorMessage(genericErrorMessage);
			setIsAlertOpen(true);
		}
	};

	const handleSubmit = async () => {
		const { questions } = surveyData.attributes;
		let newFieldErrors = {};

		questions.forEach((question) => {
			const isQuestionAnswered =
				answers.findIndex(
					(answer) => answer.questionId === question.questionId
				) !== -1;

			if (question.required && !isQuestionAnswered) {
				newFieldErrors[question.questionId] = ['Required'];
			}
		});

		if (Object.keys(newFieldErrors).length > 0) {
			return setFieldErrors(newFieldErrors);
		}

		try {
			setIsLoading(true);
			const payload = {
				data: {
					type: 'surveyAnswers',
					attributes: {
						answers,
					},
				},
			};

			await axios.post(
				`${process.env.REACT_APP_API_URL}/survey/${surveyData.id}/answers`,
				payload
			);

			navigate('result', { state: { surveyData, answers } });
		} catch (e) {
			if (e.response) {
				const { data } = e.response;
				handleSubmitErrorResponse(data);
			} else {
				setGeneralErrorMessage(genericErrorMessage);
				setIsAlertOpen(true);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const getRatings = (min, max) => {
		const ratings = [];

		for (let i = min; i <= max; i++) {
			ratings.push(i);
		}

		return ratings;
	};

	const handleAlertClose = () => {
		setIsAlertOpen(false);
	};

	const handleChange = (e, questionId) => {
		const value = e.target.value.trim();
		const newAnswers = [...answers];
		const index = newAnswers.findIndex((a) => a.questionId === questionId);

		if (index !== -1) {
			if (value === '') {
				newAnswers.splice(index, 1);
			} else {
				newAnswers[index].answer = value;
			}
		} else if (value !== '') {
			newAnswers.push({
				questionId,
				answer: value,
			});
		}

		setAnswers(newAnswers);
	};

	if (isLoading) {
		return <Loading />;
	}

	if (!isLoading && !surveyData) {
		return (
			<>
				<CardIntro description="Nothing to see here ... :(" title="No data" />
				<Notification
					onClose={handleAlertClose}
					isOpen={isAlertOpen}
					title={generalErrorMessage.title}
					message={generalErrorMessage.message}
				/>
			</>
		);
	}

	return (
		<>
			<CardIntro
				title={surveyData.attributes?.title || ''}
				description={surveyData.attributes?.description || ''}
			/>
			{surveyData.attributes.questions.map((question) => {
				if (question.questionType === 'text') {
					return (
						<CardText
							key={question.questionId}
							label={question.label}
							isRequired={question.required}
							isError={question.questionId in fieldErrors}
							errors={fieldErrors[question.questionId]}
							onChange={(e) => handleChange(e, question.questionId)}
						/>
					);
				} else if (question.questionType === 'rating') {
					return (
						<CardRating
							key={question.questionId}
							values={getRatings(
								question.attributes.min,
								question.attributes.max
							)}
							label={question.label}
							isError={question.questionId in fieldErrors}
							isRequired={question.required}
							onChange={(e) => handleChange(e, question.questionId)}
							errors={fieldErrors[question.questionId]}
						/>
					);
				}
			})}
			<Button onClick={handleSubmit} isLoading={isLoading}>
				{isLoading ? 'SUBMITTING...' : 'SUBMIT'}
			</Button>
			<Notification
				onClose={handleAlertClose}
				isOpen={isAlertOpen}
				title={generalErrorMessage.title}
				message={generalErrorMessage.message}
			/>
		</>
	);
};
