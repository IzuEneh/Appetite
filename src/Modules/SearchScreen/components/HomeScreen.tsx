import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../../../App";
import { Business } from "../../../types";
import FilterButton from "./Filter/components/FilterButton";
import BottomSheetComponent from "../../Common/components/BottomSheet";
import FilterPage from "./Filter/components/FilterPage";
import { FilterProvider, FilterState } from "./Filter/api/FilterContext";
import CardSwiper from "./CardSwiper/CardSwiper";
import { Octicons } from "@expo/vector-icons";

type NavProp = NativeStackScreenProps<RootStackParamList, "Home">;

function HomeScreen({ navigation }: NavProp) {
	const [isFilterOpen, setIsFilterOpen] = React.useState(false);
	const [filters, setFilters] = React.useState<FilterState>({
		prices: [] as number[],
		categories: [] as string[],
	});
	const handleLike = (business: Business) => {
		navigation.navigate("Details", { id: business.id });
	};

	const handleDislike = (business: Business) => {
		// console.log("Disliked: " + business.name);
	};

	const handleFilter = (filters: FilterState) => {
		console.log("handleFilter Called: " + JSON.stringify(filters));
		setFilters(filters);
		setIsFilterOpen(false);
	};

	const toggleBottomSheet = () => setIsFilterOpen(!isFilterOpen);

	return (
		<View style={[styles.container]}>
			<FilterButton style={styles.filterButton} onChoose={toggleBottomSheet} />
			<View>
				<CardSwiper
					onLike={handleLike}
					onDislike={handleDislike}
					filters={filters}
				/>
			</View>
			<BottomSheetComponent
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
			>
				<View style={styles.bottomSheet}>
					<Pressable onPress={toggleBottomSheet}>
						<Octicons
							style={styles.dragHandle}
							name="horizontal-rule"
							size={28}
							color="grey"
						/>
					</Pressable>
					<FilterProvider>
						<FilterPage
							onUpdateFilter={handleFilter}
							onCancel={() => setIsFilterOpen(false)}
						/>
					</FilterProvider>
				</View>
			</BottomSheetComponent>
		</View>
	);
}

const styles = StyleSheet.create({
	filterButton: {
		alignSelf: "flex-end",
		marginBottom: 20,
		marginRight: 16,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	bottomSheet: {
		height: "100%",
		width: "100%",
		backgroundColor: "white",
		paddingTop: 2,
		paddingHorizontal: 16,
		paddingBottom: 32,
		alignItems: "center",
	},
	dragHandle: {
		transform: [{ scaleX: 3 }],
	},
});

export default HomeScreen;
