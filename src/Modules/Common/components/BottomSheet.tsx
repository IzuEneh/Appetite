import React, { PropsWithChildren, useEffect, useRef } from "react";
import BottomSheet from "reanimated-bottom-sheet";

interface Props {
	isOpen: boolean;
	onClose?: () => void;
	snapPoints: number[];
}

const BottomSheetComponent = ({
	children,
	isOpen,
	onClose,
	snapPoints,
}: PropsWithChildren<Props>) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	useEffect(() => {
		if (isOpen) {
			bottomSheetRef.current?.snapTo(0);
		} else {
			bottomSheetRef.current?.snapTo(1);
		}
	}, [isOpen]);

	const renderContent = () => <>{children}</>;

	return (
		<>
			<BottomSheet
				ref={bottomSheetRef}
				snapPoints={snapPoints}
				borderRadius={10}
				renderContent={renderContent}
				onCloseEnd={onClose}
			/>
		</>
	);
};

export default BottomSheetComponent;
