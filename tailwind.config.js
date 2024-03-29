/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			backdropBlur: {
				3: '3px',
			},
      boxShadow: {
        '3xl': '0 0 60px -15px rgba(0, 0, 0, 0.3)',
        '4xl': '0 0 70px -20px rgba(0, 0, 0, 0.4)',
        '5xl': '0 0 100px -25px rgba(0, 0, 0, 0.5)',
        '6xl': '0 0 120px -30px rgba(0, 0, 0, 0.6)',
        '7xl': '0 0 140px -35px rgba(0, 0, 0, 0.7)',
        '8xl': '0 0 160px -40px rgba(0, 0, 0, 0.8)',
        '9xl': '0 0 180px -45px rgba(0, 0, 0, 0.9)',
        '10xl': '0 0 200px -50px rgba(0, 0, 0, 1.0)',
        '11xl': '0 0 220px -55px rgba(0, 0, 0, 1.1)',
      }
    }
	},
	plugins: [require("daisyui")],
    daisyui: {
      themes: [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
      ],
    },
};



// 		"light",
//       "dark",
//       "cupcake",
//       "bumblebee",
//       "emerald",
//       "corporate",
//       "synthwave",
//       "retro",
//       "cyberpunk",
//       "valentine",
//       "halloween",
//       "garden",
//       "forest",
//       "aqua",
//       "lofi",
//       "pastel",
//       "fantasy",
//       "wireframe",
//       "black",
//       "luxury",
//       "dracula",
//       "cmyk",
//       "autumn",
//       "business",
//       "acid",
//       "lemonade",
//       "night",
//       "coffee",
//       "winter",
//       "dim",
//       "nord",
//       "sunset",
