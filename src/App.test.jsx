import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
    it('should render all main dashboard sections', () => {
        render(<App />);
        
        // Check if main headings/sections are present
        expect(screen.getByText(/Active Bots/i)).toBeInTheDocument();
        expect(screen.getByText(/Market Summary/i)).toBeInTheDocument();
        expect(screen.getByText(/Transactions/i)).toBeInTheDocument();
    });
});
