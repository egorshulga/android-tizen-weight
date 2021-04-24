import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { RootPaths } from './RootPaths'
import { Weight } from '../Weight'
import { Settings } from '../Settings'
import Icon from 'rn-lineawesomeicons'
import { Connect } from '../Connect'

const Tab = createBottomTabNavigator<RootPaths>()

export function RootStack(): React.ReactElement {
  return (
    <Tab.Navigator initialRouteName='Settings'>
      <Tab.Screen name='Weight' component={Weight} options={{ tabBarIcon: p => (<Icon icon='la-weight' fill={p.color} height={p.size} width={p.size} />) }} />
      <Tab.Screen name='Connect' component={Connect} options={{ tabBarIcon: p => (<Icon icon='la-link' fill={p.color} height={p.size} width={p.size} />) }} />
      <Tab.Screen name='Settings' component={Settings} options={{ tabBarIcon: p => (<Icon icon='la-cog' fill={p.color} height={p.size} width={p.size} />) }} />
    </Tab.Navigator>
  )
}
