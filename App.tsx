import React from 'react';
import Amplify from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { withAuthenticator } from 'aws-amplify-react-native'
import awsConfig from './aws.config.js'
import { StyleSheet, Text, View, Button } from 'react-native'
import Nav from './screens/navigation'

Amplify.configure({
  Auth: {
    region: awsConfig.REGION,
    userPoolId: awsConfig.USER_POOL_ID,
    userPoolWebClientId: awsConfig.USER_POOL_CLIENT_ID,
    Analytics: {
      disabled: true,
    }   
  }
})
 

export default withAuthenticator(App)

function App() {
  return (
      <Nav />
  )
}
