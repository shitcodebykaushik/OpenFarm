import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Illustration */}
        <Image
          source={require('../Asset/tea.png')} // Replace with your illustration
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Image
              source={require('../Asset/user.png')} // User icon PNG
              style={styles.icon}
            />
            <TextInput placeholder="Full Name" style={styles.input} />
          </View>

          <View style={styles.inputWrapper}>
            <Image
              source={require('../Asset/mail-icon.png')} // Email icon PNG
              style={styles.icon}
            />
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Image
              source={require('../Asset/telephone.png')} // Phone icon PNG
              style={styles.icon}
            />
            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Image
              source={require('../Asset/lock.png')} // Lock icon PNG
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Image
                source={
                  passwordVisible
                    ? require('../Asset/eye.png') // Eye open PNG
                    : require('../Asset/eye closed.png') // Eye closed PNG
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Login Navigation */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Ensure SafeAreaView has a white background
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  illustration: {
    width: '80%',
    height: 130,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Light gray input background
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 50,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  signupButton: {
    backgroundColor: '#6FBF73', // Green color
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  connectText: {
    color: '#6C757D',
    fontSize: 14,
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  loginContainer: {
    flexDirection: 'row',
  },
  loginText: {
    color: '#6C757D',
    fontSize: 14,
  },
  loginLink: {
    color: '#6FBF73', // Green link color
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
