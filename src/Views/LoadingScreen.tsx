import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import * as Location from "expo-location";
import { RootStackParamList } from "../../App";

type NavProp = NativeStackScreenProps<RootStackParamList, "Loading">;
const api_key = process.env.YELP_KEY;
function LoadingScreen({ navigation }: NavProp) {
	useEffect(() => {
		(async () => {
			console.log("Getting location...");
			const location = await Location.getCurrentPositionAsync();
			console.log(location);
			const { latitude, longitude } = location.coords;
			const options = {
				method: "GET",
				headers: {
					accept: "application/json",
					authorization:
						"bearer SPITexu5SDCKyeI3W5v2SRUoXbaJNX2vgjC8F2y_CzCfGt2KHgF2C7HLiUZtMXNOX99_3Z6hx2xoLISH40_J2yhPBYw8Ws3niJljDatcmEV_H7135xFHqSaHLW76Y3Yx",
				},
			};
			fetch(
				`https://api.yelp.com/v3/businesses/search?sort_by=rating&limit=3&latitude=${latitude}&longitude=${longitude}&term=restaurants&open_now=true&`,
				options
			)
				.then((response) => response.json())
				.then((response) => {
					const { businesses } = response;
					console.log(businesses[0]);
				})
				.catch((err) => console.error(err));
		})();
	}, []);
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" />
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

export default LoadingScreen;
