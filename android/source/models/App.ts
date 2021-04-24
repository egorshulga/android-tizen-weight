import { createContext, useContext } from 'react'
import { ObservableObject, Transaction, unobservable } from 'reactronic'
import { SamsungHealth } from './SamsungHealth'
import { Weight } from './Weight'

class AppModel extends ObservableObject {
  @unobservable readonly weight: Weight
  @unobservable readonly samsungHealth: SamsungHealth

  constructor() {
    super()
    this.weight = new Weight()
    this.samsungHealth = new SamsungHealth()
  }
}

const AppContext = createContext(Transaction.run(() => new AppModel()))

export const AppProvider = AppContext.Provider

export function useApp(): AppModel {
  return useContext(AppContext)
}
