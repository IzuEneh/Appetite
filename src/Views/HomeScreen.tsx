import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Dimensions, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import * as Location from "expo-location";
import { RootStackParamList } from "../../App";

type NavProp = NativeStackScreenProps<RootStackParamList, "Home">;

function HomeScreen({ navigation }: NavProp) {
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
		})();
	}, []);

	return (
		<View style={styles.container}>
			<Pressable
				style={styles.button}
				onPress={() => {
					navigation.navigate("Loading");
				}}
			>
				<Text>Click Me</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		height: Dimensions.get("screen").width / 2,
		width: Dimensions.get("screen").width / 2,
		borderRadius: 100,
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default HomeScreen;
