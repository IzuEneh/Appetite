import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import * as Location from "expo-location";
import { RootStackParamList } from "../../App";
import { Business, RemoteReview, SearchResponse } from "../types";

type NavProp = NativeStackScreenProps<RootStackParamList, "Loading">;
const api_key =
	"bearer SPITexu5SDCKyeI3W5v2SRUoXbaJNX2vgjC8F2y_CzCfGt2KHgF2C7HLiUZtMXNOX99_3Z6hx2xoLISH40_J2yhPBYw8Ws3niJljDatcmEV_H7135xFHqSaHLW76Y3Yx";
function LoadingScreen({ navigation }: NavProp) {
	useFocusEffect(
		useCallback(() => {
			(async () => {
				console.log("Getting location...");
				const location = await Location.getCurrentPositionAsync();
				const { latitude, longitude } = location.coords;
				const options = {
					method: "GET",
					headers: {
						accept: "application/json",
						authorization: api_key,
					},
				};
				try {
					const response = await fetch(
						`https://api.yelp.com/v3/businesses/search?sort_by=rating&limit=5&latitude=${latitude}&longitude=${longitude}&term=restaurants&open_now=true&device_platform=mobile-generic`,
						options
					);
					const result = (await response.json()) as SearchResponse;
					const { businesses } = result;
					const topId = businesses[0].id;

					const fullBusinessRequest = fetch(
						`https://api.yelp.com/v3/businesses/${topId}`,
						options
					);

					const reviewRequest = fetch(
						`https://api.yelp.com/v3/businesses/${topId}/reviews?limit=20&sort_by=yelp_sort`,
						options
					);

					const responses = await Promise.all([
						fullBusinessRequest,
						reviewRequest,
					]);
					const [businessResponse, reviewResponse] = responses;
					const business = (await businessResponse.json()) as Business;
					const { reviews } = (await reviewResponse.json()) as RemoteReview;

					navigation.replace("Details", { business, reviews });
				} catch (err) {
					console.log("An error Occured: ", err);
					navigation.goBack();
				}
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
