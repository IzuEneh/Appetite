import React, { useState, useEffect } from "react";
import {
	View as RNView,
	Pressable as RNPressable,
	Text as RNText,
	Image as RNImage,
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
		<View className="flex-1 items-center justify-center px-8 bg-slate-300 gap-4 pb-5">
			<View className="flex-1 items-center justify-center w-full">
				<Image source={require("../../assets/utensils.png")} />
				<View className="w-full justify-center items-center gap-3">
					<View className="w-full justify-center items-center">
						<Text className="font-bold text-3xl">Welcome</Text>
						<Text className="text-base">
							Find A Top Rated Restaurant Near You
						</Text>
					</View>
					<Pressable
						className="w-full h-10 items-center justify-center bg-sky-500 rounded-md active:bg-sky-600 active:scale-95"
						onPress={() => {
							navigation.navigate("Loading");
						}}
					>
						<Text className="font-medium text-white text-lg">Click Here</Text>
					</Pressable>
				</View>
			</View>
			<Text>Illustration by Icons 8 from Ouch!</Text>
		</View>
	);
}

export default HomeScreen;
