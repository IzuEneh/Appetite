import React, { useState } from "react";
import {
	View as RNView,
	Pressable as RNPressable,
	Text as RNText,
	ImageBackground as RNImageBackground,
	Linking,
	Alert,
	Image as RNImage,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "nativewind";

import { RootStackParamList } from "../../App";
import { Business, RemoteReview } from "../types";
import BottomBar from "../Modules/BottomBar/BottomBar";

const View = styled(RNView);
const Text = styled(RNText);
const Pressable = styled(RNPressable);
const Image = styled(RNImage);
type NavProp = NativeStackScreenProps<RootStackParamList, "Details">;

function DetailsScreen({ route }: NavProp) {
	const { business, reviews } = route.params;
	return (
		<View className="h-screen relative">
			<View className="items-center bg-red-500 w-screen overflow-scroll h-96">
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
				<View className="h-screen w-full bg-white rounded-t-3xl py-2 px-3">
					<View className="flex-row gap-x-3">
						{business.categories.map((cat, index) => (
							<View className="bg-slate-100 w-24 px-2 py-1 rounded-md justify-center items-center">
								<Text key={index} className="text-base">
									{cat.title}
								</Text>
							</View>
						))}
					</View>
					<View className="flex-row gap-x-4 h-64 w-screen overflow-x-scroll">
						{business.photos.map((pic, index) => (
							<Image
								key={index}
								className="w-32 h-32"
								source={{
									uri: pic,
								}}
							/>
						))}
					</View>
				</View>
			</View>
			<View className="bg-white h-16  py-3 absolute left-0 right-0 bottom-28">
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
