import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'
import awsConfig from './aws.config.js'

Amplify.configure({
  Auth: {
    region: awsConfig.REGION,
    userPoolId: awsConfig.USER_POOL_ID,
    userPoolWebClientId: awsConfig.USER_POOL_CLIENT_ID
  }
});

const callGarage = (pin: number) => {
  console.log(`pin ${pin} was selected`)
}
export default withAuthenticator(App)

function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Button onPress={() => callGarage(4) } title="Trigger" />
        <Text>Open up App.tsx to start working on your app! EDITED TEXT!</Text>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
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
