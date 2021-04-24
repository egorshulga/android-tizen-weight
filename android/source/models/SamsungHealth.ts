import { Alert, ToastAndroid } from 'react-native'
import { ObservableObject, Reentrance, reentrance, transaction, unobservable } from 'reactronic'
import { RNSamsungHealth } from 'native/RNSamsungHealth'
import { AppModel } from './App'

export class SamsungHealth extends ObservableObject {
  @unobservable private readonly app: AppModel

  connected: boolean = false
  readWeightPermissionAcquired: boolean = false
  writeWeightPermissionAcquired: boolean = false

  constructor(app: AppModel) {
    super()
    this.app = app
  }

  @transaction
  async connect(): Promise<void> {
    const result = await RNSamsungHealth.init()
    this.connected = result.success
    if (result.success) {
      // ToastAndroid.show('Connected to Samsung Health', ToastAndroid.LONG)
      const result = await RNSamsungHealth.requestWeightPermissions()
      this.readWeightPermissionAcquired = result.read
      this.writeWeightPermissionAcquired = result.write
    } else {
      if (result.hasResolution) {
        ToastAndroid.show(result.message, ToastAndroid.LONG)
        RNSamsungHealth.resolveConnectionError()
      } else {
        Alert.alert('Samsung Health', result.message)
      }
    }
  }
}
