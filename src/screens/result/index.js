import {
	Box,
	Card,
	TextField,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
	Radio,
	Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../components/header';
import { theme } from '../../utils/theme';

export const Result = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const {
		state: { data, answers },
	} = location;

	const checkIfChecked = (questionId, rating) => {
		const question = answers.find((answer) => answer.questionId === questionId);
		const answer = Number(question.answer);

		return answer === rating;
	};

	return (
		<Box
			maxWidth={{ xs: '100%', md: '800px' }}
			padding="15px"
			margin="0 auto"
			display="flex"
			flexDirection="column"
			gap="12px"
		>
			<Header />
			<Card>
				<Box height="10px" backgroundColor={theme.palette.blue} />
				<Box padding="0 15px">
					<h1>Survey completed!</h1>
					<p>Thank you for your feedback.</p>
				</Box>
			</Card>
			{data?.attributes?.questions.map((question) => {
				if (question.questionType === 'text') {
					return (
						<Card key={question.questionId}>
							<Box padding="15px">
								<TextField
									disabled={true}
									InputLabelProps={{ shrink: true }}
									label={question.label}
									variant="standard"
									value={
										answers.find(
											(answer) => answer.questionId === question.questionId
										).answer
									}
								/>
							</Box>
						</Card>
					);
				} else if (question.questionType === 'rating') {
					const ratings = [];

					for (
						let i = question.attributes.min;
						i <= question.attributes.max;
						i++
					) {
						ratings.push(i);
					}

					return (
						<Card key={question.questionId}>
							<Box padding="15px">
								<FormControl>
									<FormLabel>{question.label}</FormLabel>
									<RadioGroup row={true}>
										{ratings.map((rating) => (
											<FormControlLabel
												key={rating}
												value={rating}
												control={
													<Radio
														disabled={true}
														checked={checkIfChecked(
															question.questionId,
															rating
														)}
													/>
												}
												label={rating}
											/>
										))}
									</RadioGroup>
								</FormControl>
							</Box>
						</Card>
					);
				}
			})}
			<Button
				variant="contained"
				sx={{ height: '50px' }}
				onClick={() => navigate('/')}
			>
				GO BACK
			</Button>
		</Box>
	);
};
