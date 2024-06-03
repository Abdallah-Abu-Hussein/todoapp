// screens/Auth.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../firebaseConfig'; // Make sure to import your firebaseConfig here
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';


const Auth = () => {
const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleAuth = async () => {
    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        setIsSignUp(false); // Switch to login after successful registration
      } else {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
        navigation.navigate('My Todos'); // Navigate to List screen upon successful login
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title={isSignUp ? 'Sign Up' : 'Login'} onPress={handleAuth} />
      <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
        <Text style={styles.switchText}>
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  switchText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Auth;

// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { FIREBASE_AUTH } from '../firebaseConfig'; // Make sure to import your firebaseConfig here
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// const Auth = () => {
//   const [isSignUp, setIsSignUp] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleAuth = async () => {
//     if (isSignUp && password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setError('');
//     try {
//       if (isSignUp) {
//         await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
//       } else {
//         await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
//       }
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         onChangeText={setEmail}
//         value={email}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         onChangeText={setPassword}
//         value={password}
//       />
//       {isSignUp && (
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm Password"
//           secureTextEntry
//           onChangeText={setConfirmPassword}
//           value={confirmPassword}
//         />
//       )}
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//       <Button title={isSignUp ? 'Sign Up' : 'Login'} onPress={handleAuth} />
//       <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
//         <Text style={styles.switchText}>
//           {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderRadius: 4,
//     padding: 10,
//     marginVertical: 10,
//     backgroundColor: '#fff',
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   switchText: {
//     color: 'blue',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default Auth;
