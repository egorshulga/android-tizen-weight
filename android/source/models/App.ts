import { createContext } from 'react'
import { ObservableObject, Transaction } from 'reactronic'

class AppModel extends ObservableObject {

}

export const App = createContext(Transaction.run(() => new AppModel()))
