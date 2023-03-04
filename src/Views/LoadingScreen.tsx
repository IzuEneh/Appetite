import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import * as Location from "expo-location";
import { RootStackParamList } from "../../App";

type NavProp = NativeStackScreenProps<RootStackParamList, "Loading">;
const api_key =
	"bearer SPITexu5SDCKyeI3W5v2SRUoXbaJNX2vgjC8F2y_CzCfGt2KHgF2C7HLiUZtMXNOX99_3Z6hx2xoLISH40_J2yhPBYw8Ws3niJljDatcmEV_H7135xFHqSaHLW76Y3Yx";
function LoadingScreen({ navigation }: NavProp) {
	useFocusEffect(
		useCallback(() => {
			(async () => {
				console.log("Getting location...");
				const location = await Location.getCurrentPositionAsync();
				console.log(location);
				const { latitude, longitude } = location.coords;
				const options = {
					method: "GET",
					headers: {
						accept: "application/json",
						authorization: api_key,
					},
				};
				fetch(
					`https://api.yelp.com/v3/businesses/search?sort_by=rating&limit=5&latitude=${latitude}&longitude=${longitude}&term=food&open_now=true&device_platform=mobile-generic`,
					options
				)
					.then((response) => response.json())
					.then((response) => {
						const { businesses } = response;
						navigation.replace("Details", { businesses });
					})
					.catch((err) => console.error(err));
			})();
		}, [])
	);
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
