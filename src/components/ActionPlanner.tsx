import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus } from 'lucide-react';
import type { Value } from './ValuesCompass';

export interface Action {
  id: string;
  valueId: string;
  description: string;
  completed: boolean;
}

interface ActionPlannerProps {
  values: Value[];
  actions: Action[];
  onAddAction: (action: Omit<Action, 'id'>) => void;
  onToggleAction: (id: string) => void;
}

export const ActionPlanner: React.FC<ActionPlannerProps> = ({
  values,
  actions,
  onAddAction,
  onToggleAction,
}) => {
  const [newAction, setNewAction] = useState('');
  const [selectedValueId, setSelectedValueId] = useState<string>('');

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAction.trim() && selectedValueId) {
      onAddAction({
        valueId: selectedValueId,
        description: newAction.trim(),
        completed: false,
      });
      setNewAction('');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddAction} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="value-select" className="text-sm font-medium">
            Choose a value to align with:
          </label>
          <select
            id="value-select"
            value={selectedValueId}
            onChange={(e) => setSelectedValueId(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm"
            required
          >
            <option value="">Select a value...</option>
            {values.map((value) => (
              <option key={value.id} value={value.id}>
                {value.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newAction}
            onChange={(e) => setNewAction(e.target.value)}
            placeholder="Add a new action..."
            className="flex-1 rounded-md border-gray-300 shadow-sm"
            required
          />
          <button
            type="submit"
            className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            aria-label="Add action"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {actions.map((action) => {
          const value = values.find((v) => v.id === action.valueId);
          return (
            <div
              key={action.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <button
                onClick={() => onToggleAction(action.id)}
                className="text-gray-500 hover:text-blue-500"
                aria-label={action.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {action.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <span className={action.completed ? 'line-through text-gray-500' : ''}>
                {action.description}
              </span>
              {value && (
                <span className="ml-auto text-sm text-gray-500">
                  {value.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};