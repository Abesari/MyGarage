import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

export default function SignUpScreen({ navigation }: { navigation: any }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('carOwner'); // Default role

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName });

      // Save role in Firestore
      await setDoc(doc(db, 'users', user.uid), { uid: user.uid, displayName, email, role });

      console.log('User registered!');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Sign Up</Text>
      <TextInput placeholder="Name" value={displayName} onChangeText={setDisplayName} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Text>Role:</Text>
      <Button title="Car Owner" onPress={() => setRole('carOwner')} />
      <Button title="Mechanic" onPress={() => setRole('mechanic')} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}
