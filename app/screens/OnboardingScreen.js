import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import PagerView from "react-native-pager-view";
import OnboardingScreenItem from "../components/OnboardingScreenItem";
import OnBoardingFooter from "../components/OnBoardingFooter";

function OnboardingScreen(props) {
  const pagerRef = useRef(null);
  const handlePageChange = (pageNumber) => { 
    pagerRef.current.setPage(pageNumber);
  };
  return (
    <PagerView style={styles.viewPager} initialPage={0} ref={pagerRef}>
      <View key="1">
        <OnboardingScreenItem
          title="Set up an online store."
          iconName="shopping-cart"
        />

        <OnBoardingFooter
          backgroundColor="#ffc93c"
          rightButtonLabel="Let's Go"
          rightButtonPress={() => {
            handlePageChange(1);
          }}
        />
      </View>
      <View key="2">
        <OnboardingScreenItem
          title="Recieve card payment from customers."
          iconName="credit-card"
        />
        <OnBoardingFooter
          backgroundColor="#07689f"
          rightButtonLabel="Continue"
          rightButtonPress={() => {
            handlePageChange(2);
          }}
        />
      </View>
      <View key="3">
        <OnboardingScreenItem
          title="Leave delivery for us, we've got you."
          iconName="truck"
        />
        <OnBoardingFooter
          backgroundColor="#07689f"
          rightButtonLabel="Get Started"
          rightButtonPress={() => {
            props.navigation.navigate("Welcome");
          }}
        />
      </View>
    </PagerView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OnboardingScreen;
