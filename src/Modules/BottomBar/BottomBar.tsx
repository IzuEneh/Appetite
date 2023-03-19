import React from "react";
import {
	View as RNView,
	Pressable as RNPressable,
	Text as RNText,
	ImageBackground as RNImageBackground,
} from "react-native";
import { styled } from "nativewind";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const View = styled(RNView);
const Text = styled(RNText);
const Pressable = styled(RNPressable);

function BottomBar() {
	return (
		<View className="w-full flex-row px-2 py-1 gap-4">
			<Pressable className="bg-red-500 basis-2/3 rounded-sm justify-center items-center active:bg-red-700 flex-row gap-x-2 py-1 active:scale-95">
				<Feather name="map-pin" size={24} color="white" />
				<Text className="text-white text-xl font-semibold">Get Directions</Text>
			</Pressable>
			<Pressable className="justify-center items-center flex-1 border-2 rounded-sm border-red-500 active:bg-slate-100 py-1 active:scale-95 flex-row gap-x-2">
				<FontAwesome name="phone" size={24} style={{ color: "red" }} />
				<Text className="text-xl text-red-800 font-semibold">Call</Text>
			</Pressable>
		</View>
	);
}

export default BottomBar;
