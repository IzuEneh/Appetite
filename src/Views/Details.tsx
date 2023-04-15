import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, View, StyleSheet, ActivityIndicator } from "react-native";

import { RootStackParamList } from "../../App";
import BottomBar from "../Modules/BottomBar/BottomBar";
import Reviews from "../Modules/Reviews/Reviews";
import BusinessHeader from "../Modules/Details/components/BusinessHeader";
import ImageSlider from "../Modules/Details/components/ImageSlider";
import { useRestaurant } from "../Modules/Common/hooks/useRestaurant";

type NavProp = NativeStackScreenProps<RootStackParamList, "Details">;

function Details({ route }: NavProp) {
	const { id } = route.params;
	const business = useRestaurant(id);

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
				coordinates={business.coordinates}
				phone={business.phone}
				style={styles.bottomBar}
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
