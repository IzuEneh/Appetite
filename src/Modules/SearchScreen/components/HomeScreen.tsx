import React from "react";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LogBox } from "react-native";

import { RootStackParamList } from "../../../../App";
import { Business } from "../../../types";
import FilterButton from "./Filter/components/FilterButton";
import BottomSheetComponent from "../../Common/components/BottomSheet";
import FilterPage from "./Filter/components/FilterPage";
import { FilterState } from "./Filter/api/FilterState";
import CardSwiper from "./CardSwiper/CardSwiper";
import { Octicons } from "@expo/vector-icons";

LogBox.ignoreAllLogs(true);

type NavProp = NativeStackScreenProps<RootStackParamList, "Home">;

function HomeScreen({ navigation }: NavProp) {
	const bottomSheetHeight = (Dimensions.get("screen").height / 4) * 3;
	const [isFilterOpen, setIsFilterOpen] = React.useState(false);
	const [filters, setFilters] = React.useState<FilterState>({
		prices: ["$", "$$", "$$$", "$$$$"],
		categories: [],
	});
	const handleLike = (business: Business) => {
		navigation.navigate("Details", { id: business.id });
	};

	const handleFilter = (filters: FilterState) => {
		setFilters(filters);
		setIsFilterOpen(false);
	};

	const toggleBottomSheet = () => setIsFilterOpen(!isFilterOpen);

	return (
		<View style={[styles.container]}>
			<FilterButton style={styles.filterButton} onChoose={toggleBottomSheet} />
			<CardSwiper onLike={handleLike} filters={filters} />
			<BottomSheetComponent
				isOpen={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
				snapPoints={[bottomSheetHeight, 0]}
			>
				<View style={[styles.bottomSheet, { height: bottomSheetHeight }]}>
					<Pressable onPress={toggleBottomSheet}>
						<Octicons
							style={styles.dragHandle}
							name="horizontal-rule"
							size={28}
							color="grey"
						/>
					</Pressable>

					<FilterPage
						filters={filters}
						onUpdateFilter={handleFilter}
						onCancel={() => setIsFilterOpen(false)}
					/>
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
