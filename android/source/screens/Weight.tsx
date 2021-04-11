import React from 'react'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { RootPaths } from './navigation/RootPaths'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, Text } from 'react-native'
import { WeightPicker } from 'components/WeightPicker'

export function Weight(p: BottomTabScreenProps<RootPaths>): React.ReactElement {
  return (
    <SafeAreaView style={styles.screen}>
      <WeightPicker />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
})
