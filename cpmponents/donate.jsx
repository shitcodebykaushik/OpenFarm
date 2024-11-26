import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';

// Import the QR code image from assets
import qrCodeImage from './assets/upi.jpg';

const DonateGoodsPage = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const pickImage = async () => {
    const result = await launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 800,
        maxHeight: 600,
        quality: 1,
      },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          setItemImage(response.assets[0].uri);
        }
      }
    );
  };

  const submitDonation = () => {
    if (!itemName || !itemDescription || !itemCategory || !itemImage) {
      Alert.alert('Missing Information', 'Please fill out all fields and add an image.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Your donation has been submitted.');
    }, 2000); // Simulate submission delay
  };

  const handleDonateMoney = () => {
    if (!donationAmount) {
      Alert.alert('Enter Amount', 'Please enter an amount to donate.');
      return;
    }
    setShowQrModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Donate Goods</Text>
      <Text style={styles.subtitle}>List the items you wish to donate to those in need</Text>

      <View style={styles.card}>
        {/* Item Donation Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Winter Jacket"
            placeholderTextColor="#999"
            value={itemName}
            onChangeText={setItemName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe the item in a few words"
            placeholderTextColor="#999"
            value={itemDescription}
            onChangeText={setItemDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Clothing, Electronics"
            placeholderTextColor="#999"
            value={itemCategory}
            onChangeText={setItemCategory}
          />
        </View>

        <View style={styles.imagePickerContainer}>
          <Text style={styles.label}>Upload Image</Text>
          <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
            <Icon name="camera-outline" size={24} color="#666" />
            <Text style={styles.imagePickerText}>Choose Photo</Text>
          </TouchableOpacity>
          {itemImage && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: itemImage }} style={styles.itemImage} />
              <TouchableOpacity
                style={styles.imageRemoveIcon}
                onPress={() => setItemImage(null)}
              >
                <Icon name="close-circle" size={24} color="#ff5252" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={submitDonation} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Donation</Text>
          )}
        </TouchableOpacity>

        {/* Money Donation Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Donate Money</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount to donate"
            placeholderTextColor="#999"
            value={donationAmount}
            onChangeText={setDonationAmount}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.donateButton} onPress={handleDonateMoney}>
          <Text style={styles.donateButtonText}>Donate Money</Text>
        </TouchableOpacity>
      </View>

      {/* QR Code Modal */}
      <Modal visible={showQrModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.qrContainer}>
            <Text style={styles.qrTitle}>Scan QR Code to Donate</Text>
            <Image source={qrCodeImage} style={styles.qrImage} />
            <Text style={styles.amountText}>Amount: ₹{donationAmount}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowQrModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
  },
  imagePickerContainer: {
    marginBottom: 20,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1f5fe',
    borderRadius: 10,
    padding: 10,
  },
  imagePickerText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 16,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginTop: 15,
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  imageRemoveIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  donateButton: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  qrImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  amountText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DonateGoodsPage;
