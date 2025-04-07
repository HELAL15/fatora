// tailwind.config.js
module.exports = {
  theme: {
    container: {
      center: true,
      padding: '1rem',
      maxWidth: {
        DEFAULT: '100%',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      fontFamily: {
        custom: ['sh-hello', 'sans-serif'], 
      },
      maxHeight: {
        0: "0",
        full: "100dvh",
      },

      borderRadius: {
        rounded: '10px', 
      },

      colors: {
        body: {
          DEFAULT: "#F9FAFE",
          secondary: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#333333",
          hover: "#141414",
          white: "#FFFFFF",
        },

        yellow:{
          DEFAULT:" #F2C343"
        },

        secondary:{
          DEFAULT:'#292D32',
        },

        userIo:{
          DEFAULT:'#0000000D',
        },
        p:{
          DEFAULT:'#00000080'
        },
        
        accent: {
          DEFAULT: "#333333",
          hover: "#141414",
        },
        light: "#F5F5F5",
        green: " #00841D",
        star: "#FFAD33",
      },
      keyframes: {
        shake: {
          "10%, 90%": { transform: "translate3d(-1px, 0,0 )" },
          "20%, 80%": { transform: "translate3d(2px, 0,0 )" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0,0 )" },
          "40%, 60%": { transform: "translate3d(4px, 0,0 )" },
        },
      },
      animation: {
        shake: "shake 1s ease-in-out",
      },
      boxShadow: {
        shadow: "0px 0px 6px 0px #A0A0A00D",
      },
    },
  },
  variants: {
    float: ["responsive", "direction"],
    margin: ["responsive", "direction"],
    padding: ["responsive", "direction"],
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container-fluid': {
          width: '100%',
          maxWidth: '100%',
          paddingLeft: '30px',
          paddingRight: '30px',
        
        },
      });
    },
    require("tailwindcss-dir")(),
  ],
}