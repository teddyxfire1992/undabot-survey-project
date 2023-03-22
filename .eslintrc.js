module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:import/recommended',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'prettier'],
	rules: {
		'prettier/prettier': 'error',
		'linebreak-style': ['error', 'unix'],
		'react/react-in-jsx-scope': 'off',
		'import/order': [
			'error',
			{
				groups: [
					'external',
					'builtin',
					'internal',
					'sibling',
					'parent',
					'index',
				],
			},
		],
		'import/no-default-export': 'error',
		indent: ['error', 'tab'],
		quotes: [
			'error',
			'single',
			{
				allowTemplateLiterals: true,
			},
		],
		semi: ['error', 'always'],
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
