/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['luxury', 'cupcake'],
		darkTheme: 'luxury',
		base: true,
		styled: true,
		utils: true,
		prefix: '',
		logs: true,
		themeRoot: ':root'
	}
};

