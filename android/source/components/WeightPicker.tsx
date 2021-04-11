import { range } from 'common/array'
import { useApp } from 'models/App'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WheelPicker } from 'react-native-wheel-picker-android'
import Icon from 'rn-lineawesomeicons'

export function WeightPicker(): React.ReactElement {
  const app = useApp()
  return (
    <View style={styles.weight}>
      <View style={styles.integerPart}>
        <View style={styles.stepButton}>
          <Icon icon='la-angle-up' height={50} width={50} fill='black' />
        </View>
        <WheelPicker
          data={range(0, 150).map(x => x.toString())}
          itemTextFontFamily={null as any}
          selectedItemTextFontFamily={null as any}
          itemTextSize={42}
          selectedItemTextSize={42}
          hideIndicator
          style={styles.wheel}
          initPosition={70}
        />
        <View style={styles.stepButton}>
          <Icon icon='la-angle-down' height={50} width={50} fill='black' />
        </View>
      </View>

      <View style={styles.decimalPart}>
        <View style={styles.stepButton}>
          <Icon icon='la-angle-up' height={50} width={50} fill='black' />
        </View>
        <WheelPicker
          data={range(0, 9).map(x => x.toString())}
          itemTextFontFamily={null as any}
          selectedItemTextFontFamily={null as any}
          itemTextSize={42}
          selectedItemTextSize={42}
          hideIndicator
          isCyclic
          style={styles.wheel}
        />
        <View style={styles.stepButton}>
          <Icon icon='la-angle-down' height={50} width={50} fill='black' />
        </View>
      </View>

      <Text style={styles.unit}>kg</Text>
    </View>
  )
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
    fontSize: 42,
  },

  stepButton: {
    alignItems: 'center',
  },
  wheel: {
    width: 100,
    height: 300,
  },
})
