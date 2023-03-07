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

import { Business, RootStackParamList } from "../../App";

const View = styled(RNView);
const ImageBackground = styled(RNImageBackground);
const Text = styled(RNText);
const Pressable = styled(RNPressable);
type NavProp = NativeStackScreenProps<RootStackParamList, "Details">;

function DetailsScreen({ route }: NavProp) {
	const { businesses } = route.params;
	const [index, setIndex] = useState(0);
	const [business, setBusiness] = useState(businesses[index]);
	return (
		<View className="flex-1 items-center justify-center">
			<ImageBackground
				className="w-full basis-2/3"
				resizeMode="contain"
				source={{
					uri: business.image_url,
				}}
			/>
			<View className="w-full basis-1/3 pb-10 px-6 pt-3">
				<View className="basis-2/3 w-full">
					<Text>{business.name}</Text>
					<Text>
						{business.categories.map((cat, index) => (
							<Text key={index}>{cat.title} </Text>
						))}
					</Text>
					<Text>{business.rating} / 5</Text>
				</View>
				<View className="w-full basis-1/3">
					<Pressable
						onPress={() => goToMaps(business.coordinates)}
						className="bg-sky-400 active:bg-sky-500 w-full h-10 rounded-md justify-center items-center"
					>
						<Text className="text-lg font-medium text-white">GO</Text>
					</Pressable>
				</View>
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
