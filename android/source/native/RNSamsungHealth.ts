import { NativeEventEmitter, NativeModules } from 'react-native'

const { SamsungHealth: nativeModule } = NativeModules

class RNSamsungHealthModule {
  constructor() {
    const emitter = new NativeEventEmitter(nativeModule)
    emitter.addListener('HealthStorageConnectionLost', this.handleConnectionLost)
  }

  async init(): Promise<ConnectionResult> {
    const result = await nativeModule.init() as ConnectionResult
    return result
  }

  resolveConnectionError(): void {
    nativeModule.resolveConnectionError()
  }

  disconnect(): void {
    nativeModule.disconnect()
  }

  private handleConnectionLost = (): void => {
    console.warn('Samsung Health storage connection lost')
  }

  async areWeightPermissionsAcquired(): Promise<RequestPermissionsResult> {
    const result = await nativeModule.areWeightPermissionsAcquired() as RequestPermissionsResult
    return result
  }

  async requestWeightPermissions(): Promise<RequestPermissionsResult> {
    const result = await nativeModule.requestWeightPermissions() as RequestPermissionsResult
    return result
  }
}

export const RNSamsungHealth = new RNSamsungHealthModule()

export interface ConnectionResult {
  readonly success: boolean
  readonly message: string
  readonly hasResolution: boolean
}

export interface RequestPermissionsResult {
  readonly read: boolean
  readonly write: boolean
}
