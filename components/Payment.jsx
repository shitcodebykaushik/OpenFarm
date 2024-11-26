import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PaymentScreen = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState(null); // Payment method state
  const [isChecked, setIsChecked] = useState(false); // Custom checkbox state
  const [paymentBanners, setPaymentBanners] = useState([]); // Store multiple banners

  const paymentMethods = [
    { id: 'mastercard', label: 'MasterCard', image: require('../Asset/card.png') },
    { id: 'visa', label: 'Visa', image: require('../Asset/visa.png') },
    { id: 'paypal', label: 'PayPal', image: require('../Asset/paypal.png') },
    { id: 'gpay', label: 'Google Pay', image: require('../Asset/google-pay.png') },
  ];

  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    ccv: '',
    email: '',
    phoneNumber: '',
    upiId: '',
  });

  const handleFormChange = (field, value) => {
    setCardDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPayment = () => {
    if (!selectedMethod) {
      alert('Please select a payment method before adding.');
      return;
    }

    const banner = {
      id: new Date().toISOString(), // Unique ID for each banner
      method: selectedMethod,
      details: { ...cardDetails },
    };

    setPaymentBanners((prev) => [...prev, banner]);

    // Reset form fields for next input
    setCardDetails({
      cardName: '',
      cardNumber: '',
      expDate: '',
      ccv: '',
      email: '',
      phoneNumber: '',
      upiId: '',
    });

    setSelectedMethod(null);
    setIsChecked(false); // Reset checkbox
  };

  const renderBanner = ({ item }) => (
    <View style={styles.banner}>
      <Text style={styles.bannerTitle}>Payment Method: {item.method}</Text>
      {item.method === 'mastercard' || item.method === 'visa' ? (
        <>
          <Text style={styles.bannerText}>
            <Text style={styles.bannerLabel}>Name: </Text>
            {item.details.cardName}
          </Text>
          <Text style={styles.bannerText}>
            <Text style={styles.bannerLabel}>Card Number: </Text>
            {item.details.cardNumber}
          </Text>
          <Text style={styles.bannerText}>
            <Text style={styles.bannerLabel}>Expiry: </Text>
            {item.details.expDate}
          </Text>
        </>
      ) : item.method === 'paypal' ? (
        <>
          <Text style={styles.bannerText}>
            <Text style={styles.bannerLabel}>Name: </Text>
            {item.details.cardName}
          </Text>
          <Text style={styles.bannerText}>
            <Text style={styles.bannerLabel}>Email: </Text>
            {item.details.email}
          </Text>
        </>
      ) : item.method === 'gpay' ? (
        <>
          <Text style={styles.bannerText}>
            <Text style={styles.bannerLabel}>Name: </Text>
            {item.details.cardName}
          </Text>
          <Text style={styles.bannerText}>
            <Text style={styles.bannerLabel}>Phone: </Text>
            {item.details.phoneNumber}
          </Text>
          <Text style={styles.bannerText}>
            <Text style={styles.bannerLabel}>UPI ID: </Text>
            {item.details.upiId}
          </Text>
        </>
      ) : null}
    </View>
  );

  const renderForm = () => {
    const renderSaveDetailsCheckbox = () => (
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkboxChecked]}
          onPress={() => setIsChecked(!isChecked)}
        >
          {isChecked && <Ionicons name="checkmark" size={16} color="#FFF" />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Save my details</Text>
      </View>
    );

    switch (selectedMethod) {
      case 'mastercard':
      case 'visa':
        return (
          <View style={styles.paymentForm}>
            <TextInput
              style={styles.input}
              placeholder="Name on card"
              placeholderTextColor="#999"
              value={cardDetails.cardName}
              onChangeText={(text) => handleFormChange('cardName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={cardDetails.cardNumber}
              onChangeText={(text) => handleFormChange('cardNumber', text)}
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="EXP Date"
                placeholderTextColor="#999"
                value={cardDetails.expDate}
                onChangeText={(text) => handleFormChange('expDate', text)}
              />
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="CCV"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={cardDetails.ccv}
                onChangeText={(text) => handleFormChange('ccv', text)}
              />
            </View>
            {renderSaveDetailsCheckbox()}
          </View>
        );

      case 'paypal':
        return (
          <View style={styles.paymentForm}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#999"
              value={cardDetails.cardName}
              onChangeText={(text) => handleFormChange('cardName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={cardDetails.email}
              onChangeText={(text) => handleFormChange('email', text)}
            />
            {renderSaveDetailsCheckbox()}
          </View>
        );

      case 'gpay':
        return (
          <View style={styles.paymentForm}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#999"
              value={cardDetails.cardName}
              onChangeText={(text) => handleFormChange('cardName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={cardDetails.phoneNumber}
              onChangeText={(text) => handleFormChange('phoneNumber', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="UPI ID"
              placeholderTextColor="#999"
              value={cardDetails.upiId}
              onChangeText={(text) => handleFormChange('upiId', text)}
            />
            {renderSaveDetailsCheckbox()}
          </View>
        );

      default:
        return <Text style={styles.selectMethodText}>Please select a payment method</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Detail</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={[styles.progressStep, styles.progressStepActive]} />
          <View style={styles.progressStep} />
        </View>

        {/* Payment Methods Section */}
        <Text style={styles.sectionTitle}>Select your payment method</Text>
        <View style={styles.paymentMethods}>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedMethod === method.id && styles.paymentMethodSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <Image source={method.image} style={styles.paymentImage} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Form */}
        {renderForm()}

        {/* Add Payment Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleAddPayment}>
          <Text style={styles.continueButtonText}>Add Payment</Text>
        </TouchableOpacity>

        {/* Horizontal Scrollable Banners */}
        <FlatList
          data={paymentBanners}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderBanner}
          style={styles.bannerList}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;




const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    padding: 20,
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
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressStep: {
    flex: 1,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  progressStepActive: {
    backgroundColor: '#6FBF73',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentMethod: {
    width: 70,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  paymentMethodSelected: {
    borderColor: '#6FBF73',
    borderWidth: 2,
  },
  paymentImage: {
    width: 40,
    height: 25,
    resizeMode: 'contain',
  },
  paymentForm: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
    backgroundColor: '#F9F9F9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputHalf: {
    width: '48%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6FBF73',
    borderColor: '#6FBF73',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  continueButton: {
    backgroundColor: '#6FBF73',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paypalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  gpayText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectMethodText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginVertical: 20,
  },
  banner: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bannerText: {
    fontSize: 14,
    color: '#666',
  },
  bannerLabel: {
    fontWeight: 'bold',
    color: '#333',
  },

});
