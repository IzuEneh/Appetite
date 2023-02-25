import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import * as Location from "expo-location";
import { RootStackParamList } from "../../App";

type NavProp = NativeStackScreenProps<RootStackParamList, "Loading">;

function LoadingScreen({ navigation }: NavProp) {
	useEffect(() => {
		(async () => {
			console.log("Getting location...");
			const location = await Location.getCurrentPositionAsync();
			console.log(location);
		})();
	}, []);
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default LoadingScreen;
