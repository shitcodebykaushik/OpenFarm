import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  ProgressBarAndroid, // Use this for progress representation
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For icons

const achievements = [
  {
    id: '1',
    title: 'Top Harvester',
    description: 'Achieved the highest yield in 2023.',
    icon: require('../Asset/harvester.png'), // Replace with actual asset paths
    badgeColor: '#FFD700',
  },
  {
    id: '2',
    title: 'Eco-Friendly Farmer',
    description: 'Reduced water usage by 20%.',
    icon: require('../Asset/eco.png'),
    badgeColor: '#6FBF73',
  },
  {
    id: '3',
    title: 'Technology Adopter',
    description: 'Implemented drone technology.',
    icon: require('../Asset/tech.png'),
    badgeColor: '#42A5F5',
  },
  {
    id: '4',
    title: 'Community Helper',
    description: 'Assisted 10 farmers in 2023.',
    icon: require('../Asset/community.png'),
    badgeColor: '#FF7043',
  },
];

const milestones = [
  {
    id: '1',
    label: 'Crops Harvested',
    progress: 80,
    target: '100 hectares',
  },
  {
    id: '2',
    label: 'Revenue Earned',
    progress: 60,
    target: '$50,000',
  },
  {
    id: '3',
    label: 'Workshops Attended',
    progress: 3,
    target: '5 Workshops',
  },
];

const AchievementScreen = ({ navigation }) => {
  const renderAchievementCard = ({ item }) => (
    <View style={[styles.achievementCard, { backgroundColor: item.badgeColor }]}>
      <Image source={item.icon} style={styles.achievementIcon} />
      <Text style={styles.achievementTitle}>{item.title}</Text>
      <Text style={styles.achievementDescription}>{item.description}</Text>
    </View>
  );

  const renderMilestone = ({ item }) => (
    <View style={styles.milestoneContainer}>
      <Text style={styles.milestoneLabel}>{item.label}</Text>
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={item.progress / 100}
        color="#6FBF73"
      />
      <Text style={styles.milestoneTarget}>
        {item.progress}% of {item.target}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Achievements</Text>
        </View>

        {/* Achievement Badges */}
        <Text style={styles.sectionTitle}>Your Badges</Text>
        <FlatList
          data={achievements}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={renderAchievementCard}
          contentContainerStyle={styles.achievementList}
          showsHorizontalScrollIndicator={false}
        />

        {/* Milestones */}
        <Text style={styles.sectionTitle}>Milestones</Text>
        <FlatList
          data={milestones}
          keyExtractor={(item) => item.id}
          renderItem={renderMilestone}
          contentContainerStyle={styles.milestoneList}
        />

        {/* Share Achievements Button */}
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share Your Achievements</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AchievementScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  achievementList: {
    paddingHorizontal: 20,
  },
  achievementCard: {
    width: 150,
    height: 180,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
  },
  milestoneList: {
    paddingHorizontal: 20,
  },
  milestoneContainer: {
    marginBottom: 20,
  },
  milestoneLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  milestoneTarget: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  shareButton: {
    backgroundColor: '#6FBF73',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
