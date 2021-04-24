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
}

export const RNSamsungHealth = new RNSamsungHealthModule()

export interface ConnectionResult {
  readonly success: boolean
  readonly message: string
  readonly hasResolution: boolean
}
