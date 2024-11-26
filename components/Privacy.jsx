import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PrivacyScreen = ({ navigation }) => {
  const [gpsEnabled, setGpsEnabled] = useState(true); // GPS permission toggle
  const [cameraEnabled, setCameraEnabled] = useState(false); // Camera permission toggle
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Notification permission toggle

  const handleRequestDataDeletion = () => {
    alert('Your request to delete your data has been submitted.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy Concerns</Text>
        </View>

        {/* Data Privacy Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Privacy</Text>
          <Text style={styles.sectionDescription}>
            We collect data to improve your experience, including GPS location,
            camera access, and notifications. Manage permissions below.
          </Text>
        </View>

        {/* Permissions Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Permissions Management</Text>

          {/* GPS */}
          <View style={styles.permissionRow}>
            <Text style={styles.permissionLabel}>GPS</Text>
            <Switch
              value={gpsEnabled}
              onValueChange={setGpsEnabled}
              trackColor={{ true: '#6FBF73', false: '#E0E0E0' }}
              thumbColor={gpsEnabled ? '#6FBF73' : '#999'}
            />
          </View>

          {/* Camera */}
          <View style={styles.permissionRow}>
            <Text style={styles.permissionLabel}>Camera</Text>
            <Switch
              value={cameraEnabled}
              onValueChange={setCameraEnabled}
              trackColor={{ true: '#6FBF73', false: '#E0E0E0' }}
              thumbColor={cameraEnabled ? '#6FBF73' : '#999'}
            />
          </View>

          {/* Notifications */}
          <View style={styles.permissionRow}>
            <Text style={styles.permissionLabel}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ true: '#6FBF73', false: '#E0E0E0' }}
              thumbColor={notificationsEnabled ? '#6FBF73' : '#999'}
            />
          </View>
        </View>

        {/* Data Deletion Request */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Request Data Deletion</Text>
          <Text style={styles.sectionDescription}>
            If you'd like us to delete your data, you can submit a request
            below.
          </Text>
          <TouchableOpacity
            style={styles.deletionButton}
            onPress={handleRequestDataDeletion}
          >
            <Text style={styles.deletionButtonText}>Request Data Deletion</Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Policy */}
        <TouchableOpacity
          style={styles.privacyPolicyLink}
          onPress={() => alert('Navigating to Privacy Policy...')}
        >
          <Text style={styles.privacyPolicyText}>View Privacy Policy</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyScreen;

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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEDED',
  },
  permissionLabel: {
    fontSize: 14,
    color: '#333',
  },
  deletionButton: {
    backgroundColor: '#FF7043',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  deletionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  privacyPolicyLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  privacyPolicyText: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});
