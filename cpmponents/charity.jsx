import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// Import local images
import image1 from './assets/upi.jpg';
import image2 from './assets/upi.jpg';
import image3 from './assets/upi.jpg';
import image4 from './assets/upi.jpg';

const CharityPage = () => {
  // Local images array
  const charityImages = [
    { id: 1, image: image1, title: 'Charity 1' },
    { id: 2, image: image2, title: 'Charity 2' },
    { id: 3, image: image3, title: 'Charity 3' },
    { id: 4, image: image4, title: 'Charity 4' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Charity Options</Text>
      <View style={styles.gridContainer}>
        {charityImages.map((charity) => (
          <View key={charity.id} style={styles.charityBox}>
            <Image source={charity.image} style={styles.charityImage} />
            <Text style={styles.charityTitle}>{charity.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  charityBox: {
    width: '48%',  // Two boxes per row
    aspectRatio: 4 / 3,  // Ratio for a rectangular box
    backgroundColor: '#e1f5fe',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  charityImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  charityTitle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
});

export default CharityPage;
