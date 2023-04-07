import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App";
import { useRestaurants } from "../Modules/Common/hooks/useRestaurants";
import CardSwiper from "../Modules/CardSwiper/CardSwiper";

type NavProp = NativeStackScreenProps<RootStackParamList, "Home">;

function HomeScreen({ navigation }: NavProp) {
	const { restaurants, error, loading } = useRestaurants();

	if (loading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (error) {
		return null; // TODO: Add No Location Component
	}

	return (
		<View style={styles.container}>
			<CardSwiper businesses={restaurants} />
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
