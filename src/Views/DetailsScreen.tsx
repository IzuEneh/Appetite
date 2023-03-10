import React, { useState } from "react";
import {
	View as RNView,
	Pressable as RNPressable,
	Text as RNText,
	ImageBackground as RNImageBackground,
	Linking,
	Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "nativewind";

import { RootStackParamList } from "../../App";
import { Business, Review } from "./types";
import BottomBar from "../Modules/BottomBar/BottomBar";

const View = styled(RNView);
const ImageBackground = styled(RNImageBackground);
const Text = styled(RNText);
const Pressable = styled(RNPressable);
type NavProp = NativeStackScreenProps<RootStackParamList, "Details">;

function DetailsScreen({ route }: NavProp) {
	const { business, reviews } = route.params;
	return (
		<View className="flex-1 items-center bg-red-500">
			<View className="basis-1/2 w-full justify-center items-center ">
				<View className="h-1/3 justify-center items-center bg-amber-400 w-1/3 rounded-xl my-5">
					<Text className="text-4xl text-slate-100 font-bold">
						{business.rating} / 5
					</Text>
				</View>
				<Text className="text-4xl font-bold text-slate-100">
					{business.name}
				</Text>
			</View>
			<View className="basis-1/2 w-full bg-white flex-col-reverse pb-7">
				<BottomBar />
			</View>
		</View>
	);
}


const goToMaps = async ({ latitude, longitude }: Business["coordinates"]) => {
	const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
	const supported = await Linking.canOpenURL(url);
	if (!supported) {
		Alert.alert("Unable to open url");
		return;
	}

	await Linking.openURL(url);
};

export default DetailsScreen;
