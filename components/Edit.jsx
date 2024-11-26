import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, SafeAreaView, ScrollView } from 'react-native';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('Karan Aujla');
  const [role, setRole] = useState('Senior Agriculture');
  const [bio, setBio] = useState('Passionate about sustainable farming.');

  const handleSave = () => {
    // Add logic to save the updated profile details
    alert(`Profile updated:\nName: ${name}\nRole: ${role}\nBio: ${bio}`);
    navigation.goBack(); // Go back to the ProfileScreen
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {/* Profile Picture Section */}
          <View style={styles.profilePictureSection}>
            <TouchableOpacity onPress={dismissKeyboard}>
              <View style={styles.profilePicture} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.changePictureButton}>
              <Text style={styles.changePictureText}>Change Profile Picture</Text>
            </TouchableOpacity>
          </View>

          {/* Input Fields */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            returnKeyType="done"
            onSubmitEditing={dismissKeyboard}
          />

          <Text style={styles.label}>Role</Text>
          <TextInput
            style={styles.input}
            value={role}
            onChangeText={setRole}
            placeholder="Enter your role"
            returnKeyType="done"
            onSubmitEditing={dismissKeyboard}
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={bio}
            onChangeText={setBio}
            placeholder="Write something about yourself"
            multiline
            numberOfLines={4}
            returnKeyType="done"
            onSubmitEditing={dismissKeyboard}
          />
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profilePictureSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  changePictureButton: {
    marginTop: 10,
  },
  changePictureText: {
    color: '#6FBF73',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
  saveButton: {
    backgroundColor: '#6FBF73',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
