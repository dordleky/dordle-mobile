import { COLORS, illustrations, SIZES } from '@/constants';
import { NavigationProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define your navigation parameter list
export type RootStackParamList = {
  Account: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

const AccountScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.imageContainer}>
        <Image
          source={illustrations.account}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Know Your Credit Score</Text>
        <Text style={styles.subtitle}>
          See what’s behind your score—accounts, inquiries, payment history, and more—all in a simple, easy-to-read format.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('signup')}>
          <Text style={[styles.buttonText, styles.primaryText]}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('login')}>
          <Text style={[styles.buttonText, styles.secondaryText]}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: SIZES.width * 0.8,
    height: SIZES.width * 0.8,
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontFamily: 'bold',
    textAlign: 'center',
    color: COLORS.shadesBlack,
    marginBottom: 12,
    marginHorizontal: 18
  },
  subtitle: {
    fontSize: 14,
    color: '#737373',
    textAlign: 'center',
    lineHeight: 20,
    marginVertical: 16,
    fontFamily: "medium"
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#0761FD',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: COLORS.shadesBlack
  },
});

export default AccountScreen;
