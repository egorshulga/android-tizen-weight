import React, { PropsWithChildren } from 'react'
import { GestureResponderEvent, Pressable, PressableStateCallbackType, StyleProp, StyleSheet, ViewStyle } from 'react-native'

interface FancyButtonProps {
  style?: StyleProp<ViewStyle>
  onPress?: null | ((event: GestureResponderEvent) => void)
}

export function FancyButton(p: PropsWithChildren<FancyButtonProps>): React.ReactElement {
  return (
    <Pressable
      style={[styles.button, p.style]}
      onPress={p.onPress}
    >
      {p.children}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
  },
})
