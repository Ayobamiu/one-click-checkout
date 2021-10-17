import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import useAuth from "../auth/useAuth";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import OrderStatusComponent from "../components/OrderStatusComponent";
import colors from "../config/colors";
import productAPIS from "../api/products";
import OrderContext from "../contexts/order/context";
import UploadScreen from "../components/UploadScreen";

const KeyValuePair = ({ keyy, value }) => {
  return (
    <View style={styles.row}>
      <AppText size="x-small" fontWeight="bold" style={styles.black}>
        {keyy}
      </AppText>
      <AppText size="x-small" style={[styles.faint, styles.ml10, styles.mv5]}>
        {value}
      </AppText>
    </View>
  );
};
const StausItem = ({ status, label }) => {
  const color =
    status === "done"
      ? colors.success
      : status === "warning"
      ? colors.warning
      : colors.black;
  return (
    <View style={styles.row}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <AppText style={{ color }}>{label}</AppText>
    </View>
  );
};
function OrderDetailsScreen(props) {
  const { user } = useAuth();

  const [progress, setProgress] = useState(0);
  const [uploadVisible, setUploadVisible] = useState(false);
  const { orders, setOrders } = useContext(OrderContext);
  const [order, setOrder] = useState(props.route.params);
  const orderIndex = orders.find((i) => i._id == props.route.params?._id);
  useEffect(() => {
    if (orderIndex) {
      setOrder(orderIndex);
    }
  }, []);

  const saveUpdate = async (data, orderId) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await productAPIS.updateOrder(data, orderId, (progress) =>
      setProgress(progress)
    );
    if (result.error) {
      setUploadVisible(false);
      return alert("Could not update product");
    }
    if (result.order && result.order._id) {
      const neworders = orders;
      const orderIndex = orders.findIndex((order) => order._id == orderId);
      if (orderIndex !== -1) {
        neworders.splice(orderIndex, 1, result.order);
        setOrders([...neworders]);
      }
    }
    setUploadVisible(false);
  };

  const sent =
    order.status === "sent" ||
    order.status === "received" ||
    order.status === "cancelled" ||
    order.status === "rejected" ||
    order.status === "completed";

  const recieved = order.status === "received" || order.status === "completed";
  return (
    <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
      <UploadScreen
        onDone={() => {
          setUploadVisible(false);
          props.navigation.goBack();
        }}
        progress={progress}
        visible={uploadVisible}
      />
      <AppText size="x-small" style={[styles.black, styles.mv5]}>
        Products
      </AppText>
      {order.products.map((i, index) => (
        <Pressable
          key={index}
          style={styles.row}
          onPress={() =>
            props.navigation.navigate("Products", {
              screen: "Product Details",
              params: { _id: i.product._id },
            })
          }
        >
          <AppText size="x-small" fontWeight="bold" style={styles.black}>
            {i.quantity.toString()} x
          </AppText>
          <AppText
            size="x-small"
            style={[styles.faint, styles.ml10, styles.mv5]}
          >
            {i.product.title}
          </AppText>
        </Pressable>
      ))}
      <KeyValuePair keyy="Tracking Order No:" value={order._id} />
      {order.deliveryMethod === "toDoor" && (
        <KeyValuePair keyy="Shipped By:" value={order.deliveryMerchant} />
      )}
      {order.deliveryMethod === "toDoor" && (
        <KeyValuePair
          keyy="Expected Day:"
          value={new Date(order.eta).toUTCString()}
        />
      )}

      {!sent && user._id === order.seller && (
        <View style={[styles.borderAround, styles.p10]}>
          <AppText
            size="x-small"
            style={[styles.mv5, { color: colors.success }]}
          >
            For Seller
          </AppText>
          <AppText size="x-small" style={[styles.black, styles.mv5]}>
            Please click on the dispatched button after you have handed over the
            package to delivery merchant
          </AppText>
          <AppButton
            title="Package Dispatched"
            style={[styles.mv5, { alignSelf: "flex-start" }]}
            small
            onPress={() => saveUpdate({ status: "sent" }, order._id)}
          />
        </View>
      )}
      {!recieved && user._id === order.buyer && (
        <View style={[styles.borderAround, styles.p10]}>
          <AppText
            size="x-small"
            style={[styles.mv5, { color: colors.success }]}
          >
            For Buyer
          </AppText>
          <AppText size="x-small" style={[styles.black, styles.mv5]}>
            Please click on the dispatched button after you have recieved the
            package.
          </AppText>
          <AppButton
            title="Package Recieved"
            style={[styles.mv5, { alignSelf: "flex-start" }]}
            small
            onPress={() => saveUpdate({ status: "received" }, order._id)}
          />
        </View>
      )}
      <View style={[styles.row, styles.mv10]}>
        <StausItem label="Done" status="done" />
        <StausItem label="In Progress" status="warning" />
        <StausItem label="Pending" />
      </View>

      <OrderStatusComponent
        label="Confirmed Order"
        icon="cart-outline"
        done={
          order.status === "started" ||
          order.status === "sent" ||
          order.status === "received" ||
          order.status === "cancelled" ||
          order.status === "rejected" ||
          order.status === "completed"
        }
      />
      <OrderStatusComponent
        label="Processing Order"
        icon="progress-check"
        done={
          order.status === "started" ||
          order.status === "sent" ||
          order.status === "received" ||
          order.status === "cancelled" ||
          order.status === "rejected" ||
          order.status === "completed"
        }
        warning={order.status === "started"}
      />
      <OrderStatusComponent
        label="Quality Check"
        icon="check-decagram"
        done={
          order.status === "sent" ||
          order.status === "received" ||
          order.status === "cancelled" ||
          order.status === "rejected" ||
          order.status === "completed"
        }
        warning={order.status === "started"}
      />
      {order.deliveryMethod === "toDoor" && (
        <OrderStatusComponent
          label="Product Dispatched"
          icon="truck-delivery-outline"
          done={
            order.status === "sent" ||
            order.status === "received" ||
            order.status === "cancelled" ||
            order.status === "rejected" ||
            order.status === "completed"
          }
          warning={order.status === "sent"}
        />
      )}
      {order.deliveryMethod === "toDoor" && (
        <OrderStatusComponent
          label="Product Delivered"
          icon="home-outline"
          checked={order.status === "received" || order.status === "completed"}
        />
      )}
      {order.deliveryMethod === "pickUp" && (
        <OrderStatusComponent
          label="Product Recieved"
          icon="home-outline"
          checked={order.status === "received" || order.status === "completed"}
        />
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  black: { color: colors.black },
  borderAround: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
  },
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  dot: { height: 10, width: 10, borderRadius: 5, marginHorizontal: 10 },
  faint: { color: colors.medium },
  ml10: { marginLeft: 10 },
  mv5: { marginVertical: 5 },
  mv10: { marginVertical: 10 },
  p10: { padding: 10 },
  primary: { color: colors.primary },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default OrderDetailsScreen;
