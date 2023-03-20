require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const surveyRouter = require('./routes/survey');

const PORT = process.env.PORT || 3500;

const app = express();

// handle cors
app.use(cors(corsOptions));

// handle json
app.use(express.json());

// routes (api)
app.use('/api/v1/survey', surveyRouter);

app.all('*', (req, res) => {
	res.status(404).json({
		error: '404 Not Found',
	});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
