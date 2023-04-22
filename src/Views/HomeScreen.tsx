import React from "react";
import { View, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../App";
import { Business } from "../types";
import FilterButton from "../Modules/Filter/components/FilterButton";
import BottomSheetComponent from "../Modules/Common/components/BottomSheet";
import FilterPage from "../Modules/Filter/components/FilterPage";

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
				<FilterButton
					onChoose={(category) => {
						setIsFilterOpen(!isFilterOpen);
					}}
				/>
			</View>
			{/* <View style={styles.container}>
				<CardSwiper onLike={handleLike} onDislike={handleDislike} />
			</View> */}
			<BottomSheetComponent isOpen={isFilterOpen}>
				<View style={{ height: "100%", width: "100%" }}>
					<FilterPage
						onUpdateFilter={() => {}}
						onCancel={() => setIsFilterOpen(false)}
					/>
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
	bottomSheet: {
		height: 450,
		backgroundColor: "white",
		padding: 16,
	},
});

export default HomeScreen;
