import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
	ScrollView,
	Image,
	View,
	Text,
	StyleSheet,
	Dimensions,
} from "react-native";

import { RootStackParamList } from "../../App";
import BottomBar from "../Modules/BottomBar/BottomBar";
import Reviews from "../Modules/Reviews/Reviews";
import BusinessHeader from "../Modules/Details/components/BusinessHeader";
import ImageSlider from "../Modules/Details/components/ImageSlider";

type NavProp = NativeStackScreenProps<RootStackParamList, "Details">;

function Details({ route }: NavProp) {
	const { business, reviews } = route.params;

	return (
		<ScrollView>
			<ImageSlider images={business.photos} />
			<View style={{ padding: 16, gap: 16 }}>
				<BusinessHeader business={business} />
				<Reviews reviews={reviews} style={styles.reviews} />
				<BottomBar coordinates={business.coordinates} phone={business.phone} />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	reviews: {
		width: "100%",
	},
});

export default Details;
