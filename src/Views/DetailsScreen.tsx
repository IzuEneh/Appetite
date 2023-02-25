import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Image,
	Text,
	Pressable,
	Linking,
	Alert,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Business, RootStackParamList } from "../../App";

type NavProp = NativeStackScreenProps<RootStackParamList, "Details">;

function DetailsScreen({ route }: NavProp) {
	const { businesses } = route.params;
	const [index, setIndex] = useState(0);
	const [business, setBusiness] = useState(businesses[index]);
	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={{
					uri: business.image_url,
				}}
			/>
			<Text>{business.name}</Text>
			<Text>Location: {business.location.address1}</Text>
			<Text>Rating: {business.rating}</Text>
			<View style={{ alignItems: "center" }}>
				<Text>Category</Text>
				<View style={styles.categories}>
					{business.categories.map((cat, index) => (
						<Text key={index}>{cat.title}</Text>
					))}
				</View>
			</View>
			<View style={styles.buttonContainer}>
				<Pressable
					style={[
						styles.button,
						{
							backgroundColor: "lightblue",
							display: index > 0 ? "flex" : "none",
						},
					]}
					onPress={() => {
						// new stuff
						const newIndex = index - 1;
						setIndex(newIndex);
						setBusiness(businesses[newIndex]);
					}}
				>
					<Text>Previous</Text>
				</Pressable>
				<Pressable
					style={[styles.button, { backgroundColor: "orange" }]}
					onPress={() => goToMaps(business.coordinates)}
				>
					<Text>Go</Text>
				</Pressable>
				<Pressable
					style={[
						styles.button,
						{
							backgroundColor: "red",
							display: index < businesses.length - 1 ? "flex" : "none",
						},
					]}
					onPress={() => {
						// console.log("pressed " + index);
						const newIndex = index + 1;
						setIndex(newIndex);
						setBusiness(businesses[newIndex]);
					}}
				>
					<Text>Next</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 15,
	},
	image: {
		height: 200,
		width: 200,
	},
	button: {
		height: 25,
		width: 100,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
	},
	categories: {
		flexDirection: "row",
		gap: 10,
	},
});

const goToMaps = async ({ latitude, longitude }: Business["coordinates"]) => {
	const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
	const supported = await Linking.canOpenURL(url);
	if (!supported) {
		Alert.alert("Unable to open url");
		return;
	}

	await Linking.openURL(url);
};

export default DetailsScreen;
