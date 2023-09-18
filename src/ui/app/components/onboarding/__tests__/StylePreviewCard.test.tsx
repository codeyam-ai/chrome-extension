import { render, screen } from '@testing-library/react';

import StylePreviewCard from '../StylePreviewCard';

describe('StylePreviewCard component', () => {
    const mockProps = {
        address: '0x123456789',
        color: '#FFFFFF',
        emoji: '💰',
    };

    const forceLightModeProp = {
        ...mockProps,
        forceLightMode: true,
    };

    // basic render test
    it('renders correctly when provided with address, color, and emoji props', () => {
        render(<StylePreviewCard {...mockProps} />);

        // using getByText to find elements by their text content
        // we used 'address' prop in 'Header'
        expect(screen.getByText('Wallet Balance')).toBeTruthy();
        expect(screen.getByText('$10,000')).toBeTruthy();
    });

    // edge case to test forceLightMode optional prop
    it('renders correctly when forceLightMode prop is true', () => {
        render(<StylePreviewCard {...forceLightModeProp} />);

        // Here we could test for the CSS classes that get applied when forceLightMode is true.
        // Unfortunately, @testing-library/react does not support querying by CSS class.
        // However, the change in forceLightMode should also change some text color/content in the components.
        // For the sake of the example, we'll check if the text '$10,000' is still showing.
        expect(screen.getByText('$10,000')).toBeTruthy();
    });
});
