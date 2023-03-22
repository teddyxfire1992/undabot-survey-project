import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CardIntro } from '../../components/card-intro';
import { CardResult } from '../../components/card-result';
import { Button } from '../../components/button';

export const Result = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { state } = location;
	const surveyData = state?.surveyData ? state.surveyData : null;
	const answers = state?.answers ? state.answers : null;

	const getAnswer = (questionId) => {
		const matchingAnswer = answers.find(
			(answer) => answer.questionId === questionId
		);

		return matchingAnswer.answer;
	};

	const handleBackButtonClick = () => {
		navigate('/');
	};

	if (!surveyData || !answers) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<CardIntro
				title="Survey completed!"
				description="Thank you for your feedback."
			/>
			{surveyData.attributes.questions.map((question) => {
				return (
					<CardResult
						key={question.questionId}
						question={question.label}
						answer={getAnswer(question.questionId)}
					/>
				);
			})}
			<Button onClick={handleBackButtonClick}>GO BACK</Button>
		</>
	);
};
