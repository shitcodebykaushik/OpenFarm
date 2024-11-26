import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]); // To handle focus between OTP inputs

  // Function to handle OTP input change
  const handleInputChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically move to the next input
    if (text && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // Handle backspace to go to the previous input
    if (!text && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle Resend OTP
  const handleResend = () => {
    console.log('Resend OTP triggered'); // Replace with actual OTP resend logic
    alert('OTP resent!');
  };

  // Handle Verify OTP
  const handleVerify = () => {
    const enteredOtp = otp.join('');
    console.log('Entered OTP:', enteredOtp); // Replace with actual OTP verification logic
    if (enteredOtp.length === 4) {
      navigation.navigate('ResetPassword'); // Replace with your next screen name
    } else {
      alert('Please enter a valid 4-digit OTP');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Illustration */}
        <Image
          source={require('../Asset/eye.png')} // Replace with your illustration image
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Enter 4 digit code</Text>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleInputChange(text, index)}
              ref={(ref) => (inputRefs.current[index] = ref)} // Store input refs
            />
          ))}
        </View>

        {/* Resend Code */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn’t receive any code?</Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}> Resend</Text>
          </TouchableOpacity>
        </View>

        {/* Verify Button */}
        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  illustration: {
    width: '80%',
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resendContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  resendText: {
    fontSize: 14,
    color: '#6C757D',
  },
  resendLink: {
    fontSize: 14,
    color: '#6FBF73', // Green color for link
    fontWeight: 'bold',
  },
  verifyButton: {
    backgroundColor: '#6FBF73', // Green background
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
