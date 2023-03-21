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
import { AntDesign } from "@expo/vector-icons";

import { RootStackParamList } from "../../App";
import BottomBar from "../Modules/BottomBar/BottomBar";
import Reviews from "../Modules/Reviews/Reviews";

type NavProp = NativeStackScreenProps<RootStackParamList, "Details">;

function Details({ route }: NavProp) {
	const { business, reviews } = route.params;

	return (
		<ScrollView>
			<Image
				source={{ uri: business.image_url }}
				style={{ width: "100%", height: 200 }}
			/>
			<View style={{ padding: 16 }}>
				<Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
					{business.name}
				</Text>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginBottom: 8,
					}}
				>
					<Text style={{ fontSize: 16, marginRight: 8 }}>
						{business.rating}
					</Text>
					<AntDesign name="star" size={24} color="black" />
				</View>
				<Text style={{ fontSize: 16, marginBottom: 8 }}>
					Price: {business.price}
				</Text>
				<Reviews reviews={reviews} style={styles.reviews} />
				<Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
					Photos
				</Text>
				<View style={{ flexDirection: "row" }}>
					{business.photos.slice(0, 3).map((photo) => (
						<Image
							source={{ uri: photo }}
							style={{ width: 100, height: 100, marginRight: 8 }}
							key={photo}
						/>
					))}
				</View>
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
