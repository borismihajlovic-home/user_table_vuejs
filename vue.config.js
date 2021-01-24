module.exports = {
    css: {
      loaderOptions: {
        scss: {
          prependData: `
            @import "@/styles/normalize.scss";
            @import "@/styles/variables.scss";
            @import "@/styles/general.scss";
          `
        }
      }
    }
  }