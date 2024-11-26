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

const payments = [
  { id: '1', date: '8 May', amount: '$950' },
  { id: '2', date: '16 May', amount: '$1,000' },
  { id: '3', date: '30 May', amount: '$675' },
];

const horizontalCards = [
  { id: '1', title: 'Contract', description: 'Details for Card 1' },
  { id: '2', title: 'Escrow', description: 'Details for Card 2' },
  { id: '3', title: 'Help', description: 'Details for Card 3' },
];

const budgetData = [
  { id: 'budget', label: 'Budget', value: '$3,500' },
  { id: 'escrow', label: 'In escrow', value: '$2,000' },
  { id: 'milestonesPaid', label: 'Milestones paid', value: '$875' },
  { id: 'remaining', label: 'Remaining', value: '$2,625' },
];

const ServiceScreen = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(null); // Tracks the selected card for the modal
  const [isModalVisible, setModalVisible] = useState(false);
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  const handleCardPress = (card) => {
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

    setSelectedCard(card);
    setModalVisible(true);
  };

  const renderHorizontalCard = ({ item }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleCardPress(item)}>
      <Animated.View
        style={[
          styles.horizontalCard,
          selectedCard?.id === item.id && {
            transform: [{ scale: scaleAnimation }],
            backgroundColor: '#CCE4FF',
          },
        ]}
      >
        <Text style={styles.horizontalCardTitle}>{item.title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('FarmerHome')}>
          <Ionicons name="arrow-back-outline" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Escrow</Text>
        <TouchableOpacity>
          <Ionicons name="expand" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Payments Section */}
      <FlatList
        data={payments}
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

      {/* Horizontal Cards Section */}
      <FlatList
        data={horizontalCards}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderHorizontalCard}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalCardContainer}
      />

      {/* Budget Breakdown */}
      <View style={styles.breakdownContainer}>
        <Text style={styles.breakdownText}>Budget breakdown</Text>
        <FlatList
          data={budgetData}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.8}>
              <Animated.View style={styles.rectangularBox}>
                <Text style={styles.rectangularValue}>{item.value}</Text>
              </Animated.View>
              <Text style={styles.breakdownLabel}>{item.label}</Text>
            </TouchableOpacity>
          )}
          columnWrapperStyle={styles.breakdownRow}
        />
        <Text style={styles.totalPayments}>Total payments: $875</Text>
      </View>

      {/* Milestone Details Button */}
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Milestone details</Text>
      </TouchableOpacity>

      {/* Modal for Selected Card */}
      <Modal
        animationType="slide"
        visible={isModalVisible}
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{selectedCard?.title}</Text>
          <Text style={styles.modalDescription}>{selectedCard?.description}</Text>
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

export default ServiceScreen;

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
  horizontalCardContainer: {
    marginVertical: 20,
  },
  horizontalCard: {
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
  horizontalCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E125F',
  },
  breakdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  breakdownText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E125F',
    marginBottom: 10,
  },
  breakdownRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rectangularBox: {
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
  rectangularValue: { fontSize: 16, fontWeight: 'bold', color: '#1E125F' },
  breakdownLabel: { textAlign: 'center', color: '#7A7A7A', fontSize: 14 },
  totalPayments: { textAlign: 'center', color: '#7A7A7A', marginTop: 10 },
  detailsButton: {
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
  detailsButtonText: {
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
