import React from 'react'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { RootPaths } from './navigation/RootPaths'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { WeightPicker } from 'components/WeightPicker'

export function Weight(p: BottomTabScreenProps<RootPaths>): React.ReactElement {
  return (
    <SafeAreaView style={styles.screen}>
      <WeightPicker />
      <View style={styles.submit}>
        <Pressable style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
  },

  submit: {
    alignItems: 'center',
  },
  submitButton: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 500,
  },
  submitButtonText: {
    fontSize: 28,
    textTransform: 'uppercase',
  },
})
