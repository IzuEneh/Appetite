import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View, StyleSheet, ActivityIndicator } from "react-native";

import { RootStackParamList } from "App";
import BottomBar from "./BottomBar";
import Reviews from "./Reviews";
import BusinessHeader from "./BusinessHeader";
import ImageSlider from "./ImageSlider";
import { useRestaurant } from "Modules/Common/hooks/";
import {
	useSavedRestaurants,
	useSavedRestaurantsDispatch,
} from "Modules/Common/api/SavedState";
import { Business } from "Modules/Common/api/types";

type NavProp = NativeStackScreenProps<RootStackParamList, "Details">;

function Details({ route }: NavProp) {
	const { id } = route.params;
	const business = useRestaurant(id);
	const dispatch = useSavedRestaurantsDispatch();
	const { selectedIDs } = useSavedRestaurants();

	if (!business) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<>
			<ScrollView>
				<ImageSlider images={business.photos} />
				<View style={styles.details}>
					<BusinessHeader business={business} />
					<Reviews reviews={business.reviews} style={styles.reviews} />
				</View>
			</ScrollView>
			<BottomBar
				isSelected={selectedIDs.has(id)}
				coordinates={business.coordinates}
				phone={business.phone}
				style={styles.bottomBar}
				onSave={() =>
					dispatch({
						type: "toggleSaved",
						data: {
							categories: business.categories,
							id: business.id,
							image_url: business.image_url,
							name: business.name,
						},
					})
				}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	reviews: {
		width: "100%",
	},
	bottomBar: {
		paddingHorizontal: 16,
		paddingBottom: 32,
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: "grey",
	},
	details: {
		padding: 16,
		gap: 16,
	},
});

export default Details;
