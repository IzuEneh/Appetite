module.exports = function(api) {
  api.cache(true);
  return {
		presets: ["babel-preset-expo"],
		plugins: [
			"nativewind/babel",
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
