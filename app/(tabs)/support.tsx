import { COLORS, SIZES } from '@/constants';
import { faqs } from '@/data';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const SupportScreen: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();
  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Frequently Asked Question</Text>
        <Text style={styles.headerSubtitle}>Questions frequently asked by users</Text>

        {faqs.map(item => (
          <View key={item.id} style={styles.faqItem}>
            <Pressable
              style={styles.faqHeader}
              onPress={() => toggleExpand(item.id)}
            >
              <Text style={styles.question}>{item.question}</Text>
              <Ionicons
                name={
                  expandedId === item.id
                    ? 'chevron-up-outline'
                    : 'chevron-down-outline'
                }
                size={20}
                color={COLORS.neutralBlack}
                style={styles.chevron}
              />
            </Pressable>
            {expandedId === item.id && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        ))}

        <View style={styles.connectCard}>
          <Text style={styles.connectText}>
            Connect with customer service?
          </Text>
          <TouchableOpacity
            style={styles.liveChatBtn}
            onPress={() => navigation.navigate("supportchat")}>
            <Ionicons name="chatbubbles-outline" size={18} color="#fff" />
            <Text style={styles.liveChatText}>Live chat</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 16
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.shadesBlack
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.neutralBlack,
    marginTop: 4,
    marginBottom: 16,
    fontFamily: "regular"
  },
  faqItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontSize: 14,
    fontFamily: 'semiBold',
    color: COLORS.shadesBlack,
  },
  answer: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.neutralBlack,
    lineHeight: 20,
    fontFamily: "regular"
  },
  chevron: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10,
  },
  connectCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: 'center',
  },
  connectText: {
    fontSize: 16,
    color: COLORS.shadesBlack,
    marginBottom: 8,
    fontFamily: "semiBold"
  },
  liveChatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  liveChatText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6
  },
  placeholder: { width: SIZES.width / 5 },
});

export default SupportScreen;