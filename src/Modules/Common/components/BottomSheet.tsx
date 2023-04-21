import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";

interface Props {
	isOpen: boolean;
}

const BottomSheetComponent = ({
	children,
	isOpen,
}: PropsWithChildren<Props>) => {
	// const [isOpen, setIsOpen] = useState(false);
	const bottomSheetRef = useRef<BottomSheet>(null);
	// const animatedY = useRef(new Animated.Value(height)).current;
	useEffect(() => {
		if (isOpen) {
			bottomSheetRef.current?.snapTo(0);
		} else {
			bottomSheetRef.current?.snapTo(1);
		}
		// console.log(isOpen);
	}, [isOpen]);

	const handleClose = () => {
		// setIsOpen(false);
		bottomSheetRef.current?.snapTo(1);
	};

	const renderHeader = () => (
		<TouchableOpacity style={styles.header} onPress={handleClose}>
			<View style={styles.headerIndicator} />
		</TouchableOpacity>
	);

	const renderContent = () => <>{children}</>;

	return (
		<>
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={[600, 0]}
				borderRadius={10}
				renderContent={renderContent}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 5,
		marginBottom: 20,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	header: {
		backgroundColor: "#F5F5F5",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	headerIndicator: {
		backgroundColor: "#C4C4C4",
		width: 40,
		height: 5,
		borderRadius: 3,
	},
});

export default BottomSheetComponent;
