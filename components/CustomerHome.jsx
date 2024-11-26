import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const CustomerHome = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [cartCount, setCartCount] = useState(0);

  const categories = [
    { id: '1', name: 'Vegetables', image: require('../Asset/vegetables.png') },
    { id: '2', name: 'Fruits', image: require('../Asset/fruit.png') },
    { id: '3', name: 'Dairy', image: require('../Asset/dairy.png') },
    { id: '4', name: 'Grains', image: require('../Asset/wheat-sack.png') },
  ];

  const featuredProducts = [
    { id: '1', name: 'Tomatoes', price: '$1.50/kg', image: require('../Asset/vegetables.png') },
    { id: '2', name: 'Mangoes', price: '$3.00/kg', image: require('../Asset/fruit.png') },
    { id: '3', name: 'Milk', price: '$1.20/ltr', image: require('../Asset/dairy.png') },
  ];


  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryCard}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => setCartCount(cartCount + 1)}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {/* Header with Cart */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Customer Home</Text>
            <TouchableOpacity
              style={styles.cartIconWrapper}
              onPress={() => navigation.navigate('Cart2')}
            >
              <Image source={require('../Asset/user.png')} style={styles.cartIcon} />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Search Section */}
          <View style={styles.searchSection}>
            <TextInput
              placeholder="Search for products..."
              style={styles.searchInput}
              placeholderTextColor="#A9A9A9"
            />
            <TouchableOpacity style={styles.filterButton}>
              <Image
                source={require('../Asset/algorithm.png')}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Categories Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderCategory}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.categoryList}
            />
          </View>

          {/* Featured Products Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <FlatList
              data={featuredProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.productList}
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab('Home');
            navigation.navigate('CustomerHome');
          }}
        >
          <Image
            source={require('../Asset/building.png')}
            style={[styles.navIcon, activeTab === 'Home' && styles.activeNavIcon]}
          />
          <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab('Services');
            navigation.navigate('Service2'); // Navigate to Services screen
          }}
        >
          <Image
            source={require('../Asset/responsible.png')}
            style={[styles.navIcon, activeTab === 'Services' && styles.activeNavIcon]}
          />
          <Text
            style={[styles.navText, activeTab === 'Services' && styles.activeNavText]}
          >
            Services
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab('Cart');
            navigation.navigate('Cart2'); // Navigate to Cart screen
          }}
        >
          <Image
            source={require('../Asset/fruit.png')}
            style={[styles.navIcon, activeTab === 'Cart' && styles.activeNavIcon]}
          />
          <Text style={[styles.navText, activeTab === 'Cart' && styles.activeNavText]}>
            Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => {
            setActiveTab('Profile');
            navigation.navigate('Profile2'); // Navigate to Profile screen
          }}
        >
          <Image
            source={require('../Asset/profile.png')}
            style={[styles.navIcon, activeTab === 'Profile' && styles.activeNavIcon]}
          />
          <Text style={[styles.navText, activeTab === 'Profile' && styles.activeNavText]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomerHome;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    paddingBottom: 80,
  },
  container: {
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cartIconWrapper: {
    position: 'relative',
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  cartBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    padding: 10,
  },
  filterIcon: {
    width: 20,
    height: 20,
  },
  section: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryList: {
    paddingVertical: 10,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    elevation: 3,
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  productList: {
    paddingVertical: 10,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    width: 150,
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 12,
    color: '#6FBF73',
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: '#6FBF73',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 50,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  activeNavIcon: {
    tintColor: '#6FBF73',
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
  activeNavText: {
    color: '#6FBF73',
    fontWeight: 'bold',
  },
});
