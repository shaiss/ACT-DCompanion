import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionPlanner } from '../ActionPlanner';

describe('ActionPlanner', () => {
  const mockValues = [
    { id: '1', category: 'relationships', name: 'Family', score: 7 },
    { id: '2', category: 'career', name: 'Growth', score: 6 }
  ];

  const mockActions = [
    { id: '1', valueId: '1', description: 'Call mom', completed: false },
    { id: '2', valueId: '2', description: 'Study React', completed: true }
  ];

  it('renders the form and action list', () => {
    render(
      <ActionPlanner
        values={mockValues}
        actions={mockActions}
        onAddAction={() => {}}
        onToggleAction={() => {}}
      />
    );

    expect(screen.getByLabelText('Choose a value to align with:')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a new action...')).toBeInTheDocument();
    expect(screen.getByText('Call mom')).toBeInTheDocument();
    expect(screen.getByText('Study React')).toBeInTheDocument();
  });

  it('calls onAddAction when form is submitted', () => {
    const onAddAction = vi.fn();
    render(
      <ActionPlanner
        values={mockValues}
        actions={mockActions}
        onAddAction={onAddAction}
        onToggleAction={() => {}}
      />
    );

    const select = screen.getByLabelText('Choose a value to align with:');
    const input = screen.getByPlaceholderText('Add a new action...');
    
    fireEvent.change(select, { target: { value: '1' } });
    fireEvent.change(input, { target: { value: 'New action' } });
    fireEvent.click(screen.getByLabelText('Add action'));

    expect(onAddAction).toHaveBeenCalledWith({
      valueId: '1',
      description: 'New action',
      completed: false
    });
  });

  it('calls onToggleAction when action is clicked', () => {
    const onToggleAction = vi.fn();
    render(
      <ActionPlanner
        values={mockValues}
        actions={mockActions}
        onAddAction={() => {}}
        onToggleAction={onToggleAction}
      />
    );

    fireEvent.click(screen.getByLabelText('Mark as complete'));
    expect(onToggleAction).toHaveBeenCalledWith('1');
  });

  it('shows completed actions with strikethrough', () => {
    render(
      <ActionPlanner
        values={mockValues}
        actions={mockActions}
        onAddAction={() => {}}
        onToggleAction={() => {}}
      />
    );

    const completedAction = screen.getByText('Study React');
    expect(completedAction).toHaveClass('line-through');
  });
});