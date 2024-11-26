import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import qrCodeImage from './assets/upi.jpg';

const CampaignPage = () => {
  const [showQrModal, setShowQrModal] = useState(false);

  const handleDonateNow = () => {
    setShowQrModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header with Image and Overlay */}
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: 'https://example.com/campaign-image.jpg' }}
            style={styles.campaignImage}
          />
          <View style={styles.overlay}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="share-social-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.imageTextOverlay}>
            <Text style={styles.campaignTitle}>Support Education for All</Text>
            <Text style={styles.organizer}>by Aman Kumar</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Progress Section */}
          <View style={styles.progressSection}>
            <Text style={styles.progressText}>₹5,000 raised of ₹10,000 goal</Text>
            <ProgressBar progress={0.5} color="#4CAF50" style={styles.progressBar} />
            <Text style={styles.daysLeft}>15 days left</Text>
          </View>

          {/* About Section */}
          <Text style={styles.sectionTitle}>About this Campaign</Text>
          <Text style={styles.sectionContent}>
            This campaign aims to raise funds for educational supplies, school fees, and support
            programs that directly impact children's lives in underserved communities. Every donation
            brings us closer to creating a world where education is accessible to all.
          </Text>

          {/* Organizer Section */}
          <Text style={styles.sectionTitle}>Organizer</Text>
          <Text style={styles.sectionContent}>Aman Kumar</Text>

          {/* Location Section */}
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.sectionContent}>Law Gate, Punjab</Text>

          {/* Donate Button */}
          <TouchableOpacity style={styles.donateButton} onPress={handleDonateNow}>
            <Text style={styles.donateButtonText}>Donate Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* QR Code Modal */}
      <Modal visible={showQrModal} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.qrContainer}>
            <Text style={styles.qrTitle}>Scan QR Code to Donate</Text>
            <Image source={qrCodeImage} style={styles.qrImage} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowQrModal(false)}>
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    position: 'relative',
  },
  campaignImage: {
    width: '100%',
    height: 250,
  },
  overlay: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
  },
  imageTextOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  campaignTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  organizer: {
    fontSize: 16,
    color: '#eee',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  progressSection: {
    backgroundColor: '#f0f4f7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  daysLeft: {
    fontSize: 14,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  donateButton: {
    backgroundColor: '#FF6F00',
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  qrImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#FF5252',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CampaignPage;
