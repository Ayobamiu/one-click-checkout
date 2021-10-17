import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  StatusBar,
  FlatList,
  Animated,
  ImageBackground,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import FullPageProduct from "../components/FullPageProduct";
import ProductContext from "../contexts/product/context";
import { Image } from "react-native-expo-image-cache";

function FullPageProducts(props) {
  const { width, height } = useWindowDimensions();
  const [activeSlide, setActiveSlide] = useState(0);
  const { products } = useContext(ProductContext);

  const _renderItem = ({ item }) => {
    return <FullPageProduct product={item} navigation={props.navigation} />;
  };
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <Animated.FlatList
        data={products}
        renderItem={_renderItem}
        keyExtractor={(item) => item._id}
        pagingEnabled
        horizontal
        onScroll={(e) => {}}
        decelerationRate="fast"
      />

      {/* <View style={styles.pagination}>
        <Pagination
          dotsLength={products.length}
          activeDotIndex={activeSlide}
          containerStyle={
            {
              // backgroundColor: "#00000081",
            }
          }
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#ffffff81",
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pagination: {
    position: "absolute",
    top: 20,
    width: 300,
    height: 70,
    borderRadius: 8,
    alignSelf: "center",
  },
});
export default FullPageProducts;
