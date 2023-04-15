import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App";
import { useRestaurants } from "../Modules/Common/hooks/useRestaurants";
import CardSwiper from "../Modules/CardSwiper/CardSwiper";
import { Business } from "../types";

type NavProp = NativeStackScreenProps<RootStackParamList, "Home">;

function HomeScreen({ navigation }: NavProp) {
	const handleLike = (business: Business) => {
		navigation.navigate("Details", { id: business.id });
	};

	const handleDislike = (business: Business) => {
		// console.log("Disliked: " + business.name);
	};

	return (
		<View style={styles.container}>
			<CardSwiper onLike={handleLike} onDislike={handleDislike} />
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

export default HomeScreen;
