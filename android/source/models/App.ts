import { createContext, useContext } from 'react'
import { ObservableObject, Transaction, unobservable } from 'reactronic'
import { Weight } from './Weight'

class AppModel extends ObservableObject {
  @unobservable readonly weight: Weight

  constructor() {
    super()
    this.weight = new Weight()
  }
}

const AppContext = createContext(Transaction.run(() => new AppModel()))

export const AppProvider = AppContext.Provider

export function useApp(): AppModel {
  return useContext(AppContext)
}
