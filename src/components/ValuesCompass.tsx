import React, { useState } from 'react';
import { Target, Heart, Users, Book, Briefcase, Smile, Plus, Edit2, Trash2, History } from 'lucide-react';
import { format } from 'date-fns';

export interface ValueHistory {
  date: string;
  score: number;
}

export interface Value {
  id: string;
  category: string;
  name: string;
  score: number;
  history?: ValueHistory[];
}

interface ValuesCompassProps {
  values: Value[];
  onUpdateValue: (value: Value) => void;
  onAddValue?: (value: Omit<Value, 'id'>) => void;
  onDeleteValue?: (id: string) => void;
}

const valueCategories = [
  { id: 'relationships', name: 'Relationships', icon: Users },
  { id: 'personal-growth', name: 'Personal Growth', icon: Target },
  { id: 'health', name: 'Health & Wellbeing', icon: Heart },
  { id: 'career', name: 'Career & Work', icon: Briefcase },
  { id: 'learning', name: 'Learning', icon: Book },
  { id: 'leisure', name: 'Leisure', icon: Smile }
];

export const ValuesCompass: React.FC<ValuesCompassProps> = ({
  values,
  onUpdateValue,
  onAddValue,
  onDeleteValue
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newValueName, setNewValueName] = useState('');
  const [selectedValue, setSelectedValue] = useState<Value | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const categoryValues = selectedCategory
    ? values.filter(v => v.category === selectedCategory)
    : [];

  const handleAddValue = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory && newValueName.trim() && onAddValue) {
      onAddValue({
        category: selectedCategory,
        name: newValueName.trim(),
        score: 5,
        history: []
      });
      setNewValueName('');
      setShowAddForm(false);
    }
  };

  const handleScoreChange = (value: Value, newScore: number) => {
    const now = new Date().toISOString().split('T')[0];
    const updatedValue = {
      ...value,
      score: newScore,
      history: [
        ...(value.history || []),
        { date: now, score: newScore }
      ]
    };
    onUpdateValue(updatedValue);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {valueCategories.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(id)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedCategory === id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            aria-label={`Select ${name} category`}
          >
            <div className="flex flex-col items-center gap-2">
              <Icon className="w-6 h-6" />
              <span className="text-sm font-medium">{name}</span>
            </div>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Values in this category:</h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-4 h-4" /> Add Value
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleAddValue} className="mb-4 flex gap-2">
              <input
                type="text"
                value={newValueName}
                onChange={(e) => setNewValueName(e.target.value)}
                placeholder="Enter value name..."
                className="flex-1 rounded-md border-gray-300 shadow-sm"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </form>
          )}

          <div className="space-y-4">
            {categoryValues.map(value => (
              <div key={value.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <label htmlFor={value.id} className="text-sm font-medium">
                      {value.name}
                    </label>
                    <button
                      onClick={() => {
                        setSelectedValue(value);
                        setShowHistory(true);
                      }}
                      className="p-1 text-gray-500 hover:text-blue-600"
                      aria-label="Show history"
                    >
                      <History className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{value.score}/10</span>
                    {onDeleteValue && (
                      <button
                        onClick={() => onDeleteValue(value.id)}
                        className="p-1 text-gray-500 hover:text-red-600"
                        aria-label="Delete value"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <input
                  id={value.id}
                  type="range"
                  min="0"
                  max="10"
                  value={value.score}
                  onChange={(e) => handleScoreChange(value, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {showHistory && selectedValue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Value History: {selectedValue.name}</h3>
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {selectedValue.history?.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <span>{format(new Date(entry.date), 'MMM d, yyyy')}</span>
                  <span className="font-medium">{entry.score}/10</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};