/**
 * @format
 */

import 'react-native'
import React from 'react'
import { AppView } from '../source/AppView'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  renderer.create(<AppView />)
})
