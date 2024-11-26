import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignUp'); // Navigate to the Sign Up screen after 10 seconds
    }, 500); //  seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Logo Text */}
      <Text style={styles.logoText}>खेत</Text>
      <Text style={styles.taglineText}>खेत से ग्राहक तक</Text>

      {/* "Made in India" Section */}
      <View style={styles.footer}>
        <Image
         source={require('../Asset/made-in-india.png')}
          style={styles.footerImage}
        />
        <Text style={styles.footerText}>मेड इन इंडिया</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008000', // Green background
  },
  logoText: {
    fontSize: 50,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  taglineText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: 10,
    fontFamily: 'sans-serif-light',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  footerImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  footerText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
};

export default SplashScreen;
