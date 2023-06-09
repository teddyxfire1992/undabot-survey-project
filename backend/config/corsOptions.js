const whitelist = [
	'http://localhost:3000',
	'https://undabot-survey-project-9tdq9y9kw-teddyxfire1992.vercel.app',
	'https://undabot-survey-project.vercel.app',
];

const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;
