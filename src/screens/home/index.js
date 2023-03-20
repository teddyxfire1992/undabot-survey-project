/* eslint-disable */
import {
	Box,
	Card,
	Snackbar,
	Alert,
	TextField,
	FormControl,
	FormLabel,
	FormControlLabel,
	FormHelperText,
	RadioGroup,
	Radio,
	Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/header';
import { theme } from '../../utils/theme';
import { Loading } from '../../components/loading';

export const Home = () => {
	const [data, setData] = useState(null);
	const [answers, setAnswers] = useState([]);
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [generalErrorMessage, setGeneralErrorMessage] = useState('');
	const [fieldErrors, setFieldErrors] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		// TODO: handle errors, proper API request etc.
		setIsLoading(true);
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/survey`);
			setData(res.data.data);
		} catch (e) {
			if (e?.message) {
				setGeneralErrorMessage(e.message);
				setIsAlertOpen(true);
			} else {
				// TODO: move to constants
				setGeneralErrorMessage('Something went wrong. Please try again later.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	const submit = async () => {
		const { questions } = data.attributes;
		let shouldSubmit = true;
		questions.forEach((question) => {
			const isQuestionAnswered =
				answers.findIndex(
					(answer) => answer.questionId === question.questionId
				) !== -1;
			if (question.required && !isQuestionAnswered) {
				shouldSubmit = false;
				setFieldErrors((prevState) => ({
					...prevState,
					[question.questionId]: 'Required',
				}));
			} else {
				const newFieldErrors = { ...fieldErrors };
				delete newFieldErrors[question.questionId];
				setFieldErrors(newFieldErrors);
			}
		});

		if (shouldSubmit) {
			setIsLoading(true);
			try {
				const payload = {
					data: {
						type: 'surveyAnswers',
						attributes: {
							answers,
						},
					},
				};

				await axios.post(
					`${process.env.REACT_APP_API_URL}/survey/${data.id}/answers`,
					payload
				);
				navigate('result', { state: { data, answers } });
			} catch (e) {
				if (e.response?.data?.errors) {
					const { errors } = e.response.data;
					// TODO: handle errors array, prepare state to handle array of errors
					setGeneralErrorMessage(errors[0].detail);
				} else if (e.message) {
					setGeneralErrorMessage(e.message);
				} else {
					// TODO: move to constants
					setGeneralErrorMessage(
						'Something went wrong. Please try again later.'
					);
				}
				setIsAlertOpen(true);
			} finally {
				setIsLoading(false);
			}
		}
	};

	const handleAlertClose = () => {
		setIsAlertOpen(false);
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
			{isLoading ? (
				<Loading />
			) : (
				<>
					<Card>
						<Box height="10px" backgroundColor={theme.palette.blue} />
						<Box padding="0 15px">
							<h1>{data?.attributes?.title}</h1>
							<div
								dangerouslySetInnerHTML={{
									__html: data?.attributes?.description,
								}}
							/>
						</Box>
					</Card>
					{data?.attributes?.questions.map((question) => {
						if (question.questionType === 'text') {
							return (
								<Card key={question.questionId}>
									<Box padding="15px">
										<TextField
											InputLabelProps={{ shrink: true }}
											label={question.label}
											required={question.required}
											variant="standard"
											error={question.questionId in fieldErrors}
											helperText={fieldErrors[question.questionId]}
											onChange={(e) => {
												const value = e.target.value.trim();
												const newAnswers = [...answers];
												const index = newAnswers.findIndex(
													(a) => a.questionId === question.questionId
												);

												if (index !== -1) {
													if (value === '') {
														newAnswers.splice(index, 1);
													} else {
														newAnswers[index].answer = value;
													}
												} else if (value !== '') {
													newAnswers.push({
														questionId: question.questionId,
														answer: value,
													});
												}

												setAnswers(newAnswers);
											}}
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
										<FormControl
											error={question.questionId in fieldErrors}
											required={question.required}
											onChange={(e) => {
												const newAnswers = [...answers];
												const index = newAnswers.findIndex(
													(answer) => answer.questionId === question.questionId
												);

												if (index !== -1) {
													newAnswers[index].answer = e.target.value;
												} else {
													newAnswers.push({
														questionId: question.questionId,
														answer: e.target.value,
													});
												}

												setAnswers(newAnswers);
											}}
										>
											<FormLabel>{question.label}</FormLabel>
											<RadioGroup row>
												{ratings.map((rating) => (
													<FormControlLabel
														key={rating}
														value={rating}
														control={<Radio />}
														label={rating}
													/>
												))}
											</RadioGroup>
											<FormHelperText>
												{fieldErrors[question.questionId]}
											</FormHelperText>
										</FormControl>
									</Box>
								</Card>
							);
						}
					})}
					<Button variant="contained" sx={{ height: '50px' }} onClick={submit}>
						Submit
					</Button>
				</>
			)}
			<Snackbar
				open={isAlertOpen}
				autoHideDuration={5000}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				onClose={handleAlertClose}
			>
				<Alert
					onClose={handleAlertClose}
					severity="error"
					sx={{ width: '100%' }}
				>
					{generalErrorMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
};
