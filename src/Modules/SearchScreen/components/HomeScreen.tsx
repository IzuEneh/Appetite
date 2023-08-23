import React from 'react';
import {View, StyleSheet, Pressable, Dimensions} from 'react-native';
import type {DrawerScreenProps} from '@react-navigation/drawer';
import {Octicons} from '@expo/vector-icons';

import {RootStackParamList} from 'App';
import {DrawerParamList} from 'Modules/Drawer/Drawer';
import {Business} from 'Modules/Common/api/types';
import BottomSheetComponent from 'Modules/Common/components/BottomSheet';
import FilterPage from './Filter/components/FilterPage';
import {FilterState} from './Filter/api/FilterState';
import CardSwiper from './CardSwiper/CardSwiper';
import Header from './Header';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type NavProp = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, 'Search'>,
  NativeStackScreenProps<RootStackParamList>
>;

function HomeScreen({navigation}: NavProp) {
  const bottomSheetHeight = (Dimensions.get('screen').height / 4) * 3;
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<FilterState>({
    prices: ['$', '$$', '$$$', '$$$$'],
    categories: [],
  });
  const handleLike = (business: Business) => {
    navigation.navigate('Details', {id: business.id});
  };

  const handleFilter = (filters: FilterState) => {
    setFilters(filters);
    setIsFilterOpen(false);
  };

  const toggleBottomSheet = () => setIsFilterOpen(!isFilterOpen);

  return (
    <View style={[styles.container]}>
      <Header
        onFilter={toggleBottomSheet}
        onSideBar={navigation.toggleDrawer}
        style={styles.header}
      />
      <CardSwiper onLike={handleLike} filters={filters} />
      <BottomSheetComponent
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}>
        <View style={[styles.bottomSheet, {height: bottomSheetHeight}]}>
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
  header: {
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheet: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 2,
    paddingHorizontal: 16,
    paddingBottom: 32,
    alignItems: 'center',
  },
  dragHandle: {
    transform: [{scaleX: 3}],
  },
});

export default HomeScreen;
