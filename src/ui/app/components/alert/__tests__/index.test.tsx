import { render, screen } from '@testing-library/react';

import Alert from '../index';

// Testing the Alert component

describe('Alert', () => {
    it('renders warning mode with children', () => {
        render(<Alert mode="warning">This is a warning</Alert>);
        expect(screen.getByText('This is a warning')).toBeInTheDocument();
    });

    it('renders success mode with children', () => {
        render(<Alert mode="success">Success message</Alert>);
        expect(screen.getByText('Success message')).toBeInTheDocument();
    });

    it('renders loading mode with children', () => {
        render(<Alert mode="loading">Loading message</Alert>);
        expect(screen.getByText('Loading message')).toBeInTheDocument();
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('accepts additional className', () => {
        render(<Alert className="extra-class">Class name test</Alert>);
        expect(screen.getByText('Class name test')).toBeInTheDocument();
        expect(screen.getByTestId('alert')).toHaveClass('extra-class');
    });
});
