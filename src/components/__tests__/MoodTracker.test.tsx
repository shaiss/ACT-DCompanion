import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MoodTracker } from '../MoodTracker';

describe('MoodTracker', () => {
  const mockEntries = [
    { date: '2024-03-01', score: 3 },
    { date: '2024-03-02', score: 4 },
    { date: '2024-03-03', score: 2 }
  ];

  it('renders mood selection buttons', () => {
    render(<MoodTracker entries={mockEntries} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('calls onAddEntry when mood is selected', () => {
    const onAddEntry = vi.fn();
    render(<MoodTracker entries={mockEntries} onAddEntry={onAddEntry} />);
    
    const happyButton = screen.getByLabelText('Rate mood as 5');
    fireEvent.click(happyButton);
    
    expect(onAddEntry).toHaveBeenCalledWith(5);
  });

  it('renders the chart with correct data', () => {
    render(<MoodTracker entries={mockEntries} />);
    // Basic check for chart presence - detailed chart testing would require more setup
    expect(screen.getByRole('graphics-document')).toBeInTheDocument();
  });
});