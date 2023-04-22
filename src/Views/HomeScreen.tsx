import React from "react";
import { View, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App";
import CardSwiper from "../Modules/CardSwiper/CardSwiper";
import { Business } from "../types";
import CategorySelector from "../Modules/Common/components/CategorySelector";
import BottomSheetComponent from "../Modules/Common/components/BottomSheet";
import Filter from "../Modules/Common/components/Filter";
import { TouchableOpacity } from "react-native-gesture-handler";

type NavProp = NativeStackScreenProps<RootStackParamList, "Home">;

function HomeScreen({ navigation }: NavProp) {
	const [isFilterOpen, setIsFilterOpen] = React.useState(false);
	const handleLike = (business: Business) => {
		navigation.navigate("Details", { id: business.id });
	};

	const handleDislike = (business: Business) => {
		// console.log("Disliked: " + business.name);
	};

	return (
		<View style={[styles.container, styles.screenPadding]}>
			<View>
				<CategorySelector
					onChoose={(category) => {
						setIsFilterOpen(!isFilterOpen);
					}}
				/>
			</View>
			{/* <View style={styles.container}>
				<CardSwiper onLike={handleLike} onDislike={handleDislike} />
			</View> */}
			<BottomSheetComponent isOpen={isFilterOpen}>
				<View
					style={{
						backgroundColor: "white",
						// padding: 16,
						paddingTop: 8,
						paddingBottom: 64,
						paddingHorizontal: 16,
						height: "100%",
					}}
				>
					<Filter />
					<View style={styles.formButtonContainer}>
						<TouchableOpacity style={styles.formButton}>
							<Text style={styles.buttonText}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.formButton}>
							<Text style={styles.buttonText}>Update</Text>
						</TouchableOpacity>
					</View>
				</View>
			</BottomSheetComponent>
		</View>
	);
}

const styles = StyleSheet.create({
	screenPadding: {
		paddingTop: 40,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttons: {},
	bottomSheet: {
		height: 450,
		backgroundColor: "white",
		padding: 16,
	},
	formButtonContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		gap: 10,
	},
	formButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderColor: "black",
		borderWidth: 2,
	},
	buttonText: {
		fontSize: 22,
	},
});

export default HomeScreen;
