import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { generateId } from '@/utils/helpers';
import { STORAGE_KEYS } from '@/constants/appConstants';
import { toast } from 'sonner';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

const priorityColors = {
  low: 'border-l-emerald-300',
  medium: 'border-l-yellow-400',
  high: 'border-l-red-400',
};

const TodoList: React.FC = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  useEffect(() => {
    if (!user) return;
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS) || '{}');
    setTodos(all[user.id] || []);
  }, [user]);

  const saveTodos = (items: TodoItem[]) => {
    if (!user) return;
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.TODOS) || '{}');
    all[user.id] = items;
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(all));
    setTodos(items);
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const item: TodoItem = {
      id: generateId(),
      text: newTodo.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    saveTodos([item, ...todos]);
    setNewTodo('');
    toast.success('Health goal added!');
  };

  const toggle = (id: string) => {
    saveTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const remove = (id: string) => {
    saveTodos(todos.filter(t => t.id !== id));
    toast.success('Goal removed.');
  };

  const completed = todos.filter(t => t.completed).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Health Goals</h3>
          <p className="text-xs text-gray-400">{completed}/{todos.length} completed</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a health goal..."
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <select
          value={priority}
          onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="border border-gray-200 rounded-xl px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTodo} className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors">
          <Plus size={16} />
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
        <AnimatePresence>
          {todos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl border-l-4 ${priorityColors[todo.priority]}`}
            >
              <button
                onClick={() => toggle(todo.id)}
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  todo.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 hover:border-emerald-400'
                }`}
              >
                {todo.completed && <Check size={11} className="text-white" />}
              </button>
              <span className={`flex-1 text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {todo.text}
              </span>
              <button onClick={() => remove(todo.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                <Trash2 size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {!todos.length && (
          <p className="text-center text-sm text-gray-400 py-6">No health goals yet. Add your first goal above!</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
