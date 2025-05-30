import CustomHeader from '@/components/CustomHeader'
import { COLORS } from '@/constants'
import { Feather } from '@expo/vector-icons'
import { NavigationProp } from '@react-navigation/native'
import axios from 'axios'
import { useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

// Navigation params
export type RootStackParamList = {
  SignUp: undefined
  Login: undefined
  // ...other screens
}

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [securePwd, setSecurePwd] = useState(true)
  const [secureConfirm, setSecureConfirm] = useState(true)
  const [focusEmail, setFocusEmail] = useState(false)
  const [focusFirstName, setFocusFirstName] = useState(false)
  const [focusLastName, setFocusLastName] = useState(false)
  const [focusContactNUmber, setFocusContactNumber] = useState(false)
  const [focusPwd, setFocusPwd] = useState(false)
  const [focusConfirm, setFocusConfirm] = useState(false)

  const handleSubmit = () => {
    console.log('Email:', email)
    console.log('First Name:', firstName)
    console.log('Last Name:', lastName)
    console.log('Contact Number:', contactNumber)

    const data = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      contactNumber: contactNumber
    }

    axios
      .post(
        'https://admin-api.stage.dordle.ky/api/v1/onboarding/initiate',
        data
      )
      .then(response => {
        console.log(response.data) // Actual data sent by the server
        console.log(response.status) // HTTP status code
        console.log(response.headers) // HTTP headers
        var publicKey = response.data.publicKey
        // Navigate to the next screen with the publicKey
        navigation.navigate('verifyemail', {
          publicKey: publicKey,
          emailAddress: email
        })
      })
      .catch(error => {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        } else if (error.request) {
          // Request was made but no response was received
          console.log(error.request)
        } else {
          // Error occurred in setting up the request
          console.error('Error', error.message)
        }
      })
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='dark' />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps='handled'
      >
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View style={styles.stepActive} />
          <View style={styles.stepInactive} />
          <View style={styles.stepInactive} />
          <View style={styles.stepInactive} />
        </View>

        {/* Back Button */}
        <CustomHeader title='' onBack={() => navigation.goBack()} />

        {/* Header */}
        <Text style={styles.title}>Sign up account</Text>
        <Text style={styles.subtitle}>
          Make sure you enter the email registered with Minance.
        </Text>

        {/* Email Input */}
        <View
          style={[
            styles.inputContainer,
            { borderColor: focusEmail ? COLORS.primary : '#ccc' }
          ]}
        >
          <Feather
            name='mail'
            size={20}
            color={COLORS.neutralBlack}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder='Your email'
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocusEmail(true)}
            onBlur={() => setFocusEmail(false)}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            { borderColor: focusEmail ? COLORS.primary : '#ccc' }
          ]}
        >
          <Feather
            name='terminal'
            size={20}
            color={COLORS.neutralBlack}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder='First name'
            autoCapitalize='none'
            value={firstName}
            onChangeText={setFirstName}
            onFocus={() => setFocusFirstName(true)}
            onBlur={() => setFocusFirstName(false)}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            { borderColor: focusEmail ? COLORS.primary : '#ccc' }
          ]}
        >
          <Feather
            name='terminal'
            size={20}
            color={COLORS.neutralBlack}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder='Last name'
            autoCapitalize='none'
            value={lastName}
            onChangeText={setLastName}
            onFocus={() => setFocusLastName(true)}
            onBlur={() => setFocusLastName(false)}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            { borderColor: focusEmail ? COLORS.primary : '#ccc' }
          ]}
        >
          <Feather
            name='phone'
            size={20}
            color={COLORS.neutralBlack}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder='Phone number'
            autoCapitalize='none'
            value={contactNumber}
            onChangeText={setContactNumber}
            onFocus={() => setFocusContactNumber(true)}
            onBlur={() => setFocusContactNumber(false)}
          />
        </View>
        {/* Password Input */}
        <View
          style={[
            styles.inputContainer,
            { borderColor: focusPwd ? COLORS.primary : '#ccc' }
          ]}
        >
          <Feather
            name='key'
            size={20}
            color={COLORS.neutralBlack}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={securePwd}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusPwd(true)}
            onBlur={() => setFocusPwd(false)}
          />
          <TouchableOpacity onPress={() => setSecurePwd(!securePwd)}>
            <Feather
              name={securePwd ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.neutralBlack}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View
          style={[
            styles.inputContainer,
            { borderColor: focusConfirm ? COLORS.primary : '#ccc' }
          ]}
        >
          <Feather
            name='key'
            size={20}
            color={COLORS.neutralBlack}
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder='Retype password'
            secureTextEntry={secureConfirm}
            value={confirm}
            onChangeText={setConfirm}
            onFocus={() => setFocusConfirm(true)}
            onBlur={() => setFocusConfirm(false)}
          />
          <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
            <Feather
              name={secureConfirm ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.neutralBlack}
            />
          </TouchableOpacity>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.primaryButton}
          activeOpacity={0.7}
        >
          <Text style={styles.primaryButtonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Separator */}
        <View style={styles.separator}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        {/* Footer */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>You have account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.footerLink}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16
  },
  content: {
    padding: 20
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  stepActive: {
    flex: 1,
    height: 4,
    backgroundColor: '#0761FD',
    borderRadius: 2,
    marginHorizontal: 2
  },
  stepInactive: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginHorizontal: 2
  },
  back: {
    marginBottom: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 24,
    fontFamily: 'bold',
    color: COLORS.shadesBlack,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#8C8C8C',
    marginBottom: 24,
    fontFamily: 'regular'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50
  },
  icon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.shadesBlack,
    fontFamily: 'regular'
  },
  primaryButton: {
    backgroundColor: '#0761FD',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc'
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#666'
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15
  },
  socialIcon: {
    marginRight: 10,
    height: 20,
    width: 20
  },
  socialText: {
    fontSize: 16,
    color: '#333'
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'regular'
  },
  footerLink: {
    fontSize: 14,
    color: '#0761FD',
    fontFamily: 'bold'
  },
  arrowIcon: {
    height: 16,
    width: 16,
    tintColor: COLORS.shadesBlack
  }
})

export default SignUpScreen
