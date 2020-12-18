module.exports = {
	extends: [
		'@namics/eslint-config/configurations/es8-node.js',
		'@namics/eslint-config/configurations/es8-node-disable-styles.js',
	].map(require.resolve),
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'@namics/eslint-config/configurations/typescript-react.js',
				'@namics/eslint-config/configurations/typescript-react-disable-styles.js',
			].map(require.resolve),
			rules: {
				'new-cap': 0,
				'@typescript-eslint/no-explicit-any': 2,
				complexity: 0,
				'react/sort-comp': 0,
				'valid-jsdoc': 0,
			},
			settings: {
				react: {
					version: '16',
				},
			},
		},
	],
};
