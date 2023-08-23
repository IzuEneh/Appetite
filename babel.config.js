module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            Modules: "./src/Modules",
            assets: "./src/assets",
            App: "./App.tsx",
          },
        },
      ],
    ],
  };
};
