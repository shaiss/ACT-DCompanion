import React, { useState } from 'react';
import { MoodTracker, type MoodEntry } from './components/MoodTracker';
import { ValuesCompass, type Value } from './components/ValuesCompass';
import { ActionPlanner, type Action } from './components/ActionPlanner';
import { Heart, Target } from 'lucide-react';

const initialMoodData: MoodEntry[] = [
  { date: '2024-03-01', score: 3 },
  { date: '2024-03-02', score: 4 },
  { date: '2024-03-03', score: 2 },
  { date: '2024-03-04', score: 5 },
  { date: '2024-03-05', score: 4 }
];

const initialValues: Value[] = [
  { 
    id: '1', 
    category: 'relationships', 
    name: 'Family Connection', 
    score: 7,
    history: [
      { date: '2024-02-01', score: 6 },
      { date: '2024-02-15', score: 7 }
    ]
  },
  { 
    id: '2', 
    category: 'relationships', 
    name: 'Friendship', 
    score: 6,
    history: [
      { date: '2024-02-01', score: 5 },
      { date: '2024-02-15', score: 6 }
    ]
  },
  { 
    id: '3', 
    category: 'personal-growth', 
    name: 'Self-Development', 
    score: 5,
    history: []
  },
  { 
    id: '4', 
    category: 'health', 
    name: 'Mental Wellbeing', 
    score: 4,
    history: []
  },
  { 
    id: '5', 
    category: 'career', 
    name: 'Professional Growth', 
    score: 6,
    history: []
  },
  {
    id: '6',
    category: 'learning',
    name: 'New Skills Acquisition',
    score: 7,
    history: []
  },
  {
    id: '7',
    category: 'learning',
    name: 'Reading & Research',
    score: 8,
    history: []
  },
  {
    id: '8',
    category: 'leisure',
    name: 'Creative Expression',
    score: 6,
    history: []
  },
  {
    id: '9',
    category: 'leisure',
    name: 'Physical Activities',
    score: 5,
    history: []
  },
  {
    id: '10',
    category: 'leisure',
    name: 'Social Activities',
    score: 7,
    history: []
  }
];

const initialActions: Action[] = [
  { id: '1', valueId: '1', description: 'Call family member', completed: false },
  { id: '2', valueId: '3', description: 'Daily meditation', completed: true },
  { id: '3', valueId: '6', description: 'Learn a new programming language', completed: false },
  { id: '4', valueId: '8', description: 'Practice painting', completed: false }
];

function App() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(initialMoodData);
  const [values, setValues] = useState<Value[]>(initialValues);
  const [actions, setActions] = useState<Action[]>(initialActions);

  const handleAddMoodEntry = (score: number) => {
    const newEntry: MoodEntry = {
      date: new Date().toISOString().split('T')[0],
      score
    };
    setMoodEntries([...moodEntries, newEntry]);
  };

  const handleUpdateValue = (updatedValue: Value) => {
    setValues(values.map(value => 
      value.id === updatedValue.id ? updatedValue : value
    ));
  };

  const handleAddValue = (newValue: Omit<Value, 'id'>) => {
    const value: Value = {
      ...newValue,
      id: crypto.randomUUID()
    };
    setValues([...values, value]);
  };

  const handleDeleteValue = (id: string) => {
    setValues(values.filter(value => value.id !== id));
    setActions(actions.filter(action => action.valueId !== id));
  };

  const handleAddAction = (newAction: Omit<Action, 'id'>) => {
    const action: Action = {
      ...newAction,
      id: crypto.randomUUID()
    };
    setActions([...actions, action]);
  };

  const handleToggleAction = (id: string) => {
    setActions(actions.map(action =>
      action.id === id ? { ...action, completed: !action.completed } : action
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">ACT-D Companion</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Mood Tracker</h2>
            <MoodTracker 
              entries={moodEntries}
              onAddEntry={handleAddMoodEntry}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Values Compass</h2>
            </div>
            <ValuesCompass 
              values={values}
              onUpdateValue={handleUpdateValue}
              onAddValue={handleAddValue}
              onDeleteValue={handleDeleteValue}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Action Planning</h2>
            <ActionPlanner
              values={values}
              actions={actions}
              onAddAction={handleAddAction}
              onToggleAction={handleToggleAction}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;