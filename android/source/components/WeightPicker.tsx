import { autorender } from 'common/autorender'
import { useApp } from 'models/App'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { WheelPicker } from 'react-native-wheel-picker-android'
import Icon from 'rn-lineawesomeicons'

export function WeightPicker(): React.ReactElement {
  const app = useApp()
  const weight = app.weight
  return autorender(() => {
    return (
      <View style={styles.weight}>
        <View style={styles.integerPart}>
          <Pressable
            style={styles.stepButton}
            onPress={weight.decrementInteger}
          >
            <Icon icon='la-angle-up' height={50} width={50} fill='black' />
          </Pressable>
          <WheelPicker
            data={weight.integerPickerValues}
            selectedItem={weight.integer}
            itemTextFontFamily={null as any}
            selectedItemTextFontFamily={null as any}
            itemTextSize={42}
            selectedItemTextSize={42}
            hideIndicator
            style={styles.wheel}
            onItemSelected={weight.setInteger}
          />
          <Pressable style={styles.stepButton} onPress={weight.incrementInteger}>
            <Icon icon='la-angle-down' height={50} width={50} fill='black' />
          </Pressable>
        </View>

        <View style={styles.decimalPart}>
          <Pressable style={styles.stepButton} onPress={weight.decrementDecimal}>
            <Icon icon='la-angle-up' height={50} width={50} fill='black' />
          </Pressable>
          <WheelPicker
            data={weight.decimalPickerValues}
            selectedItem={weight.decimalIndex}
            itemTextFontFamily={null as any}
            selectedItemTextFontFamily={null as any}
            itemTextSize={42}
            selectedItemTextSize={42}
            hideIndicator
            isCyclic
            style={styles.wheel}
            onItemSelected={weight.setDecimal}
          />
          <Pressable style={styles.stepButton} onPress={weight.incrementDecimal}>
            <Icon icon='la-angle-down' height={50} width={50} fill='black' />
          </Pressable>
        </View>

        <Text style={styles.unit}>kg</Text>
      </View>
    )
  })
}

const styles = StyleSheet.create({
  weight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // justifyContent: 'space-around',
  },
  integerPart: {
    borderColor: 'black',

  },
  decimalPart: {
    borderColor: 'black',
  },
  unit: {
    fontSize: 36,
  },

  stepButton: {
    alignItems: 'center',
  },
  wheel: {
    width: 100,
    height: 300,
  },
})
