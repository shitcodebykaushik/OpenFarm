import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  Modal,
  Easing,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const customerPayments = [
  { id: '1', date: '10 Nov', amount: '$150' },
  { id: '2', date: '15 Nov', amount: '$200' },
  { id: '3', date: '20 Nov', amount: '$250' },
];

const customerFeatures = [
  { id: '1', title: 'Order History', description: 'View your past orders and purchases.' },
  { id: '2', title: 'Refund Status', description: 'Check the status of your refunds.' },
  { id: '3', title: 'Customer Support', description: 'Get help with your orders.' },
];

const purchaseDetails = [
  { id: 'totalSpent', label: 'Total Spent', value: '$1,200' },
  { id: 'refunds', label: 'Refunds', value: '$150' },
  { id: 'activeOrders', label: 'Active Orders', value: '3' },
  { id: 'completedOrders', label: 'Completed Orders', value: '12' },
];

const CustomerEscrowScreen = ({ navigation }) => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const handleFeaturePress = (feature) => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.1,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 100,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    setSelectedFeature(feature);
    setModalVisible(true);
  };

  const renderFeatureCard = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleFeaturePress(item)}>
      <Animated.View
        style={[
          styles.featureCard,
          selectedFeature?.id === item.id && {
            transform: [{ scale: scaleAnimation }],
            backgroundColor: '#CCE4FF',
          },
        ]}
      >
        <Text style={styles.featureCardTitle}>{item.title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerHome')}>
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escrow</Text>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Payments Section */}
      <FlatList
        data={customerPayments}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8}>
            <Animated.View style={styles.paymentBox}>
              <Text style={styles.paymentDate}>{item.date}</Text>
              <Text style={styles.paymentAmount}>{item.amount}</Text>
            </Animated.View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.paymentContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No payments available</Text>}
      />

      {/* Features Section */}
      <FlatList
        data={customerFeatures}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderFeatureCard}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featureContainer}
      />

      {/* Purchase Details */}
      <View style={styles.purchaseDetailsContainer}>
        <Text style={styles.purchaseDetailsText}>Purchase Details</Text>
        <FlatList
          data={purchaseDetails}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.8}>
              <Animated.View style={styles.purchaseBox}>
                <Text style={styles.purchaseValue}>{item.value}</Text>
              </Animated.View>
              <Text style={styles.purchaseLabel}>{item.label}</Text>
            </TouchableOpacity>
          )}
          columnWrapperStyle={styles.purchaseRow}
        />
        <Text style={styles.totalSpent}>Total Spent: $1,200</Text>
      </View>

      {/* Support Button */}
      <TouchableOpacity style={styles.supportButton}>
        <Text style={styles.supportButtonText}>Contact Support</Text>
      </TouchableOpacity>

      {/* Modal for Selected Feature */}
      <Modal
        animationType="slide"
        visible={isModalVisible}
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedFeature?.title}</Text>
          <Text style={styles.modalDescription}>{selectedFeature?.description}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CustomerEscrowScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    color: '#6FBF73',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentContainer: {
    marginVertical: 20,
  },
  paymentBox: {
    backgroundColor: '#6FBF73',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    marginRight: 10,
  },
  paymentDate: {
    color: '#fff',
    fontSize: 14,
  },
  paymentAmount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featureContainer: {
    marginVertical: 20,
  },
  featureCard: {
    backgroundColor: '#E8F1FF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 10,
  },
  featureCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E125F',
  },
  purchaseDetailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  purchaseDetailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E125F',
    marginBottom: 10,
  },
  purchaseRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  purchaseBox: {
    backgroundColor: '#E8F1FF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  purchaseValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E125F',
  },
  purchaseLabel: {
    textAlign: 'center',
    color: '#7A7A7A',
    fontSize: 14,
  },
  totalSpent: {
    textAlign: 'center',
    color: '#7A7A7A',
    marginTop: 10,
  },
  supportButton: {
    backgroundColor: '#6FBF73',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E125F',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  closeButton: {
    backgroundColor: '#6FBF73',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
