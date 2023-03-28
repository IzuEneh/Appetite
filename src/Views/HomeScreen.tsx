import React, { useState, useEffect } from "react";
import {
	View as RNView,
	Pressable as RNPressable,
	Text as RNText,
	Image as RNImage,
	StyleSheet,
	TouchableHighlight,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { styled } from "nativewind";

import { RootStackParamList } from "../../App";

const View = styled(RNView);
const Image = styled(RNImage);
const Text = styled(RNText);
const Pressable = styled(RNPressable);
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
		<View className="flex-1 items-center justify-center px-8 bg-white gap-4 pb-5">
			<View className="flex-1 items-center justify-center w-full">
				<Image source={require("../../assets/utensils2.png")} />
				<View className="w-full justify-center items-center gap-3">
					<View className="w-full justify-center items-center">
						<Text className="font-bold text-3xl">Welcome</Text>
						<Text className="text-base">
							Find A Top Rated Restaurant Near You
						</Text>
					</View>
					<TouchableHighlight
						style={styles.button}
						underlayColor="#f87171"
						onPress={() => {
							navigation.navigate("Loading");
						}}
					>
						<Text className="font-medium text-white text-lg">Click Here</Text>
					</TouchableHighlight>
				</View>
			</View>
			<Text>Illustration by Icons 8 from Ouch! </Text>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#ED4337",
		borderRadius: 8,
		padding: 8,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default HomeScreen;
