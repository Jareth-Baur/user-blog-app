// app/categories/add/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Category } from '../../types';

export default function AddCategoryPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description) {
      return alert('All fields are required.');
    }

    const newCategory: Omit<Category, 'id'> = { name, description };

    await fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(newCategory),
    });

    router.push('/');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Category Name"
          className="border p-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full h-24"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
          Add Category
        </button>
      </form>
    </div>
  );
}
