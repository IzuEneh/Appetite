import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App";
import { useRestaurants } from "../Modules/Common/hooks/useRestaurants";
import CardSwiper from "../Modules/CardSwiper/CardSwiper";
import { Business } from "../types";

type NavProp = NativeStackScreenProps<RootStackParamList, "Home">;

function HomeScreen({ navigation }: NavProp) {
	const { restaurants, error, loading } = useRestaurants();

	const handleLike = (business: Business) => {
		navigation.navigate("Details", { business });
	};

	const handleDislike = (business: Business) => {
		// console.log("Disliked: " + business.name);
	};

	if (loading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (error) {
		return <Text>error</Text>; // TODO: Add No Location Component
	}

	return (
		<View style={styles.container}>
			<CardSwiper
				businesses={restaurants}
				onLike={handleLike}
				onDislike={handleDislike}
			/>
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
