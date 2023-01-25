
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{html,ts}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
        primary: colors.yellow,
        secondary: colors.amber,
        info: colors.blue,
        warning: colors.amber,
        success: colors.green,
        danger: colors.red,
      },
			objectPosition: {
				'avatar': 'center -0.5rem',
			},
			flex: {
				'2': '2 2 0%'
			},
			aspectRatio: {
				'poster': '2 / 3',
			},
      keyframes: {
        heartbeat: {
          '0%, 28%, 70%': { transform: 'scale(1)' },
          '14%, 42%': { transform: 'scale(1.2)' },
        }
      },
      animation: {
        heartbeat: 'heartbeat calc(1s * 1.3) ease-in-out',
      }
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		plugin(function ({ addVariant }) {
            addVariant('tiny', '&[size=tiny]')
			addVariant('small', '&[size=small]')
            addVariant('medium', '&[size=medium]')
            addVariant('large', '&[size=large]')
            addVariant('primary', '&[design=primary]')
            addVariant('secondary', '&[design=secondary]')
            addVariant('tertiary', '&[design=tertiary]')
            addVariant('danger', '&[color=danger]')
            addVariant('info', '&[color=info]')
            addVariant('warning', '&[color=warning]')
            addVariant('success', '&[color=success]')
        }),
	],
};
