import React from 'react';
import {View, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

type Props = {
  images: string[];
};

function ImageSlider({images}: Props) {
  const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1}}>
      <Carousel
        width={width}
        height={300}
        autoPlay={true}
        autoPlayInterval={5000}
        data={images}
        scrollAnimationDuration={1000}
        pagingEnabled={true}
        renderItem={({index, item}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: item}}
              style={{width: '100%', height: 300, marginRight: 8}}
              key={item}
            />
          </View>
        )}
      />
    </View>
  );
}

export default ImageSlider;
