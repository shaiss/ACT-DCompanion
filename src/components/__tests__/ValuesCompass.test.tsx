import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ValuesCompass } from '../ValuesCompass';

describe('ValuesCompass', () => {
  const mockValues = [
    { id: '1', category: 'relationships', name: 'Family', score: 7 },
    { id: '2', category: 'relationships', name: 'Friends', score: 8 },
    { id: '3', category: 'career', name: 'Growth', score: 6 }
  ];

  it('renders all value categories', () => {
    render(<ValuesCompass values={mockValues} onUpdateValue={() => {}} />);
    expect(screen.getByText('Relationships')).toBeInTheDocument();
    expect(screen.getByText('Career & Work')).toBeInTheDocument();
  });

  it('shows values for selected category', async () => {
    render(<ValuesCompass values={mockValues} onUpdateValue={() => {}} />);
    
    fireEvent.click(screen.getByText('Relationships'));
    
    expect(screen.getByText('Family')).toBeInTheDocument();
    expect(screen.getByText('Friends')).toBeInTheDocument();
  });

  it('calls onUpdateValue when value score is changed', () => {
    const onUpdateValue = vi.fn();
    render(<ValuesCompass values={mockValues} onUpdateValue={onUpdateValue} />);
    
    fireEvent.click(screen.getByText('Relationships'));
    const slider = screen.getByLabelText('Family');
    fireEvent.change(slider, { target: { value: '9' } });
    
    expect(onUpdateValue).toHaveBeenCalledWith({
      id: '1',
      category: 'relationships',
      name: 'Family',
      score: 9
    });
  });
});