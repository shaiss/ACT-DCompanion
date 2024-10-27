import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export interface MoodEntry {
  date: string;
  score: number;
}

interface MoodTrackerProps {
  entries: MoodEntry[];
  onAddEntry?: (score: number) => void;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({ entries, onAddEntry }) => {
  const formattedData = entries.map(entry => ({
    ...entry,
    formattedDate: format(new Date(entry.date), 'MMM d')
  }));

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-center mb-4">
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            onClick={() => onAddEntry?.(score)}
            className="p-3 rounded-full hover:bg-blue-100 transition-colors"
            aria-label={`Rate mood as ${score}`}
          >
            {['😔', '😕', '😐', '🙂', '😊'][score - 1]}
          </button>
        ))}
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="formattedDate" />
            <YAxis domain={[1, 5]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ fill: '#8884d8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};