const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");

    config.plugin("html").tap((args) => {
      args[0].title = "SMA MW Library (Non-Official)";
      args[0].meta = {
        description:
          "A SMA Maitreyawira library website (non-official) separately created & modified by Chen Frederick as part of personal portofolio. the original website is 'sma-maitreyawira-library.web.app' which created by Chen Frederick as well.",
        keywords:
          "sma maitreyawira, sma maitreyawira library, batam library, library, perpustakaan, perpustakaan batam, perpustakaan sma maitreyawira, sma maitreya perpustakaan, sma maitreyawira perpustakaan, perpustakaan indonesia",
      };
      return args;
    });
  },

  css: {
    loaderOptions: {
      // did not use sass because got error with vuetify, reference => https://joshuatz.com/posts/2019/vue-mixing-sass-with-scss-with-vuetify-as-an-example/#easy-solution
      scss: {
        data: `@import '@/assets/styles/screenSizeMixin.scss';`,
      },
    },
  },
};
