import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WheelPicker } from 'react-native-wheel-picker-android'
import { range } from 'source/common/array'

export function WeightPicker(): React.ReactElement {
  return (
    <View style={styles.weight}>
      <View style={styles.integerPart}>
        <View style={styles.stepButton}>
        </View>
        <View style={styles.wheel}>
          <WheelPicker
            data={range(0, 150).map(x => x.toString())}
            itemTextFontFamily={null as any}
            selectedItemTextFontFamily={null as any}
          />
        </View>
        <View style={styles.stepButton}>
        </View>
      </View>

      <View style={styles.decimalPart}>
        <View style={styles.stepButton}>
        </View>
        <View style={styles.wheel}>
          <WheelPicker
            data={range(0, 9).map(x => x.toString())}
            itemTextFontFamily={null as any}
            selectedItemTextFontFamily={null as any}
          />
        </View>
        <View style={styles.stepButton}>
        </View>
      </View>

      <Text style={styles.unit}>kg</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  weight: {
  },
  integerPart: {
  },
  decimalPart: {
  },
  unit: {
  },

  stepButton: {
  },
  wheel: {
  },
})
