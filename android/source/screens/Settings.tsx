import React from 'react'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { RootPaths } from './navigation/RootPaths'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, StyleSheet, Text } from 'react-native'
import { FancyButton } from 'components/FancyButton'
import { useApp } from 'models/App'

export function Settings(p: BottomTabScreenProps<RootPaths>): React.ReactElement {
  const samsungHealth = useApp().samsungHealth
  return (
    <SafeAreaView style={styles.screen}>
      <FancyButton
        onPress={samsungHealth.connect}
      >
        <Text style={styles.buttonText}>Connect to Samsung Health</Text>
      </FancyButton>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  buttonText: {
    fontSize: 16,
  },
})
