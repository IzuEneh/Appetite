import React, {PropsWithChildren, useEffect, useMemo, useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BottomSheetComponent = ({
  children,
  isOpen,
  onClose,
}: PropsWithChildren<Props>) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['65%'], []);
  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  const handleAnimate = (from: number, to: number) => {
    if (from === 0 && to === -1) {
      onClose();
    }
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onAnimate={handleAnimate}
        children={children}
        enablePanDownToClose
        enableContentPanningGesture
      />
    </>
  );
};

export default BottomSheetComponent;
