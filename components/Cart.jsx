import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CarScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Upcoming');

  const upcomingOrders = [
    { id: '1', customer: 'John Doe', address: '123 Main St', deliveryDate: 'Nov 22, 2024' },
    { id: '2', customer: 'Jane Smith', address: '456 Elm St', deliveryDate: 'Nov 23, 2024' },
  ];

  const deliveredOrders = [
    { id: '3', customer: 'Mark Wilson', address: '789 Pine St', deliveryDate: 'Nov 20, 2024' },
    { id: '4', customer: 'Lucy Brown', address: '321 Oak St', deliveryDate: 'Nov 19, 2024' },
  ];

  const renderOrder = ({ item }) => (
    <TouchableOpacity style={styles.orderCard} onPress={() => alert(`Viewing details for ${item.customer}`)}>
      <View style={styles.orderRow}>
        <Image source={require('../Asset/customer-service.png')} style={styles.orderIcon} />
        <Text style={styles.customerName}>{item.customer}</Text>
      </View>
      <View style={styles.orderRow}>
        <Image source={require('../Asset/location.png')} style={styles.orderIcon} />
        <Text style={styles.orderDetails}>{item.address}</Text>
      </View>
      <View style={styles.orderRow}>
        <Image source={require('../Asset/google-calendar.png')} style={styles.orderIcon} />
        <Text style={styles.deliveryDate}>Delivery Date: {item.deliveryDate}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header with back arrow */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('FarmerHome')}>
            <Ionicons name="arrow-back-outline" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Orders</Text>
        </View>

        {/* Oval Tabs for Upcoming and Delivered */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('Upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.activeTabText]}>
              Upcoming Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Delivered' && styles.activeTab]}
            onPress={() => setActiveTab('Delivered')}
          >
            <Text style={[styles.tabText, activeTab === 'Delivered' && styles.activeTabText]}>
              Delivered Orders
            </Text>
          </TouchableOpacity>
        </View>

        {/* Orders List */}
        {activeTab === 'Upcoming' ? (
          <FlatList
            data={upcomingOrders}
            keyExtractor={(item) => item.id}
            renderItem={renderOrder}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <FlatList
            data={deliveredOrders}
            keyExtractor={(item) => item.id}
            renderItem={renderOrder}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CarScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activeTab: {
    backgroundColor: '#6FBF73',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 10,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#6FBF73',
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDetails: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  deliveryDate: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
});
