import * as React from 'react'

import TokensPage from './index'
import {renderWithProviders} from "_src/test-utils/react-rendering";


test('renders', () => {
    renderWithProviders(<TokensPage/>);
})