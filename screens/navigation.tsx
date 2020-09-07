import * as React from 'react'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './main'
import Settings from './settings'
import siteEdit from './siteEdit'
import { Button } from 'react-native'
import { Auth } from 'aws-amplify'
const Stack = createStackNavigator()

const navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Main}
          options={{ title: 'Garage Door' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={Settings}
          options={{ title: 'Sites' }}
        />
        <Stack.Screen 
          name="siteEdit" 
          component={siteEdit}
          options={{ title: 'Edit Site' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default navigation