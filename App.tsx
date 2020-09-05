import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'

Amplify.configure(awsConfig);

const callGarage = (pin: number) => {
  console.log(`pin ${pin} was selected`)
}
export default withAuthenticator(App)

function App() {
  return (
    <View style={styles.container}>
      <Button onPress={() => callGarage(4) } title="Trigger" />
      <Text>Open up App.tsx to start working on your app! EDITED TEXT!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
