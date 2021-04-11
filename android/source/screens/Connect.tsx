import React from 'react'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { RootPaths } from './navigation/RootPaths'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native'

export function Connect(p: BottomTabScreenProps<RootPaths>): React.ReactElement {
  return (
    <SafeAreaView>
      <Text>Connect</Text>
    </SafeAreaView>
  )
}
