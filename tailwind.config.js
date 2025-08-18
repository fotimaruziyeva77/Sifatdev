
module.exports = {
  theme: {
    extend: {
      keyframes: {
        bgMove: {
          "0%, 100%": { backgroundPosition: "center" },
          "50%": { backgroundPosition: "top" },
        },
      },
      animation: {
        bgMove: "bgMove 8s ease-in-out infinite",
      },
    },
  },
};
