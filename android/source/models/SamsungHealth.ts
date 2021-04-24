import { Alert, ToastAndroid } from 'react-native'
import { ObservableObject, Reentrance, reentrance, transaction } from 'reactronic'
import { RNSamsungHealth } from 'native/RNSamsungHealth'

export class SamsungHealth extends ObservableObject {
  connected: boolean = false

  @transaction
  @reentrance(Reentrance.CancelPrevious)
  async connect(): Promise<void> {
    const result = await RNSamsungHealth.init()
    this.connected = result.success
    debugger
    if (!result.success) {
      if (result.hasResolution) {
        ToastAndroid.show(result.message, ToastAndroid.LONG)
        RNSamsungHealth.resolveConnectionError()
      } else {
        Alert.alert('Samsung Health', result.message)
      }
    }
  }
}
