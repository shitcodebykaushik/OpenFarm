import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
  Modal,
  useColorScheme,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation();

  const [greeting, setGreeting] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ title: '', description: '', status: 'Approval is Pending' });
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isChatbotModalVisible, setIsChatbotModalVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [conversationStage, setConversationStage] = useState(0);

  const pastDonations = [
    { id: 1, item: 'Winter Jacket', date: '2023-10-15', imageUri: 'https://example.com/jacket.png' },
  ];

  useEffect(() => {
    const currentHour = new Date().getHours();
    setGreeting(
      currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening'
    );
  }, []);

  const handleAddCampaign = () => {
    setCampaigns([...campaigns, { ...newCampaign, id: campaigns.length + 1 }]);
    setNewCampaign({ title: '', description: '', status: 'Approval is Pending' });
    setIsModalVisible(false);
  };

  const handleChatSubmit = () => {
    if (userInput.trim() === '') return;

    const userMessage = { id: Date.now().toString(), text: userInput, isUser: true };
    setChatMessages([...chatMessages, userMessage]);

    setTimeout(() => {
      let botMessageText = '';
      if (conversationStage === 0) {
        botMessageText = "I'm here to help with any questions about donating or further issues.";
        setConversationStage(1);
      } else if (conversationStage === 1) {
        botMessageText = "Here are some solutions: try logging in again, checking your internet connection, and ensuring your settings are configured properly.";
        setConversationStage(2);
      } else if (conversationStage === 2) {
        botMessageText = "Are you satisfied with this solution? Please respond with 'Yes' or 'No'.";
        setConversationStage(3);
      } else if (conversationStage === 3 && userInput.toLowerCase() === 'no') {
        botMessageText = "Your problem has been registered. Please contact us at 6239165083.";
        setConversationStage(0);
      } else {
        botMessageText = "Thank you for reaching out. Have a great day!";
        setConversationStage(0);
      }

      const botMessage = { id: (Date.now() + 1).toString(), text: botMessageText, isUser: false };
      setChatMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);

    setUserInput('');
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode ? styles.darkMode : styles.lightMode]}>
      <ScrollView style={[styles.container, isDarkMode ? styles.darkMode : styles.lightMode]}>
        <View style={styles.header}>
          <Text style={[styles.greeting, isDarkMode ? styles.darkText : styles.lightText]}>{greeting} 0x7👋</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setIsProfileModalVisible(true)} style={styles.iconContainer}>
              <Icon name="person-outline" size={24} color={isDarkMode ? '#fff' : '#333'} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{ uri: 'https://example.com/profile-pic.png' }} style={styles.profileImage} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.subheading, isDarkMode ? styles.darkText : styles.lightText]}>What do you wanna donate today?</Text>

        <View style={[styles.searchContainer, isDarkMode ? styles.darkSearch : styles.lightSearch]}>
          <Icon name="search-outline" size={20} color={isDarkMode ? '#ccc' : '#888'} />
          <TextInput
            placeholder="Search here"
            placeholderTextColor={isDarkMode ? '#888' : '#ccc'}
            style={[styles.searchInput, isDarkMode ? styles.darkText : styles.lightText]}
          />
          <Icon name="options-outline" size={20} color={isDarkMode ? '#ccc' : '#888'} />
        </View>

        <View style={[styles.campaignBanner, isDarkMode ? styles.darkBanner : styles.lightBanner]}>
          <Text style={[styles.bannerText, isDarkMode ? styles.darkText : styles.lightText]}>Do you really have a creative idea?</Text>
          <TouchableOpacity
            style={[styles.startCampaignButton, isDarkMode ? styles.darkButton : styles.lightButton]}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.startCampaignText}>Start Campaign</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>Categories</Text>
        <View style={styles.categoryContainer}>
          <CategoryIcon icon="apps-outline" label="Escrow" onPress={() => navigation.navigate('EscrowPage')} isDarkMode={isDarkMode} />
          <CategoryIcon icon="megaphone-outline" label="Campaign" onPress={() => navigation.navigate('Campaign')} isDarkMode={isDarkMode} />
          <CategoryIcon icon="gift-outline" label="Donate Goods" onPress={() => navigation.navigate("Donate Goods")} isDarkMode={isDarkMode} />
          <CategoryIcon icon="heart-outline" label="Charity" onPress={() => navigation.navigate('CharityPage')} isDarkMode={isDarkMode} />
        </View>

        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>Past Donations</Text>
        {pastDonations.map((donation) => (
          <View key={donation.id} style={[styles.donationCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
            <Image source={{ uri: donation.imageUri }} style={styles.donationImage} />
            <View style={styles.donationTextContainer}>
              <Text style={[styles.donationItemName, isDarkMode ? styles.darkText : styles.lightText]}>{donation.item}</Text>
              <Text style={[styles.donationDate, isDarkMode ? styles.darkText : styles.lightText]}>{donation.date}</Text>
            </View>
          </View>
        ))}

        <Text style={[styles.sectionTitle, isDarkMode ? styles.darkText : styles.lightText]}>Campaigns</Text>
        <View style={styles.campaignsContainer}>
          {campaigns.map((campaign) => (
            <View key={campaign.id} style={[styles.campaignCard, isDarkMode ? styles.darkCard : styles.lightCard]}>
              <Text style={[styles.campaignTitle, isDarkMode ? styles.darkText : styles.lightText]}>{campaign.title}</Text>
              <Text style={[styles.campaignDescription, isDarkMode ? styles.darkText : styles.lightText]}>{campaign.description}</Text>
              <Text style={styles.statusText}>Status: {campaign.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Campaign</Text>
            <TextInput
              placeholder="Campaign Title"
              value={newCampaign.title}
              onChangeText={(text) => setNewCampaign({ ...newCampaign, title: text })}
              style={styles.modalInput}
            />
            <TextInput
              placeholder="Campaign Description"
              value={newCampaign.description}
              onChangeText={(text) => setNewCampaign({ ...newCampaign, description: text })}
              style={[styles.modalInput, styles.modalTextArea]}
              multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleAddCampaign}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Floating Chatbot Button */}
      <TouchableOpacity style={styles.chatbotButton} onPress={() => setIsChatbotModalVisible(true)}>
        <Icon name="chatbubble-ellipses-outline" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Chatbot Modal */}
      <Modal visible={isChatbotModalVisible} transparent={true} animationType="slide" onRequestClose={() => setIsChatbotModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.chatbotContent}>
            <Text style={styles.modalTitle}>Chatbot Help</Text>
            <FlatList
              data={chatMessages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={[styles.chatMessage, item.isUser ? styles.userMessage : styles.botMessage]}>
                  <Text style={styles.chatText}>{item.text}</Text>
                </View>
              )}
            />
            <View style={styles.chatInputContainer}>
              <TextInput
                style={styles.chatInput}
                placeholder="Ask me anything..."
                placeholderTextColor="#888"
                value={userInput}
                onChangeText={setUserInput}
                onSubmitEditing={handleChatSubmit}
              />
              <TouchableOpacity onPress={handleChatSubmit}>
                <Icon name="send-outline" size={24} color="#039BE5" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsChatbotModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Profile Modal */}
      <Modal
        visible={isProfileModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsProfileModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.profileModalContent}>
            <Text style={styles.profileModalTitle}>User Profile</Text>
            <Text style={styles.profileText}>Name: John Doe</Text>
            <Text style={styles.profileText}>Email: johndoe@example.com</Text>
            <Text style={styles.profileText}>Status: Active</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setIsProfileModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const CategoryIcon = ({ icon, label, onPress, isDarkMode }) => (
  <View style={styles.categoryIconContainer}>
    <TouchableOpacity style={[styles.categoryIcon, isDarkMode ? styles.darkCard : styles.lightCard]} onPress={onPress}>
      <Icon name={icon} size={28} color="#039BE5" />
    </TouchableOpacity>
    <Text style={[styles.categoryLabel, isDarkMode ? styles.darkText : styles.lightText]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  darkMode: {
    backgroundColor: '#000',
  },
  lightMode: {
    backgroundColor: '#fff',
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    marginRight: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  darkSearch: {
    backgroundColor: '#333',
    borderColor: '#555',
    borderWidth: 1,
  },
  lightSearch: {
    backgroundColor: '#f1f1f1',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  campaignBanner: {
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  darkBanner: {
    backgroundColor: '#333',
  },
  lightBanner: {
    backgroundColor: '#e0f7fa',
  },
  bannerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  startCampaignButton: {
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  darkButton: {
    backgroundColor: '#388E3C',
  },
  lightButton: {
    backgroundColor: '#4CAF50',
  },
  startCampaignText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryIconContainer: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  darkCard: {
    backgroundColor: '#555',
  },
  lightCard: {
    backgroundColor: '#e1f5fe',
  },
  categoryLabel: {
    marginTop: 5,
    fontSize: 14,
  },
  donationCard: {
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  donationImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  donationTextContainer: {
    flex: 1,
  },
  donationItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  donationDate: {
    fontSize: 14,
  },
  campaignsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  campaignCard: {
    width: '45%',
    padding: 15,
    borderRadius: 10,
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  campaignDescription: {
    fontSize: 14,
  },
  statusText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  modalTextArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  chatbotContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    height: '60%',
  },
  chatMessage: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
  },
  chatText: {
    fontSize: 16,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  chatInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  profileModalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  profileModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default HomeScreen;
