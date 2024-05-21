/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
	theme: {
		extend: {
			colors: {
				backgroundColor: 'var(--background-color)',
				sideBarBackgroundColor: 'var(--sidebar-background-color)',
				messageBackgroundSent: 'var(--message-background-sent)',
				messageBackgroundReceived:
					'var(--message-background-received)',
				primaryTextColor: 'var(--primary-text-color)',
				secondaryTextColor: 'var(--secondary-text-color)',
				highlightColor: 'var(--highlight-color)',
				linkColor: 'var(--link-color)',
			},
		},
	},
	plugins: [],
});
