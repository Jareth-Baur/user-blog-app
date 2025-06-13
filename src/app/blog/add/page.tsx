// app/blog/add/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost, User, Category } from '../../types';

export default function AddBlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
    fetch('/api/categories').then(res => res.json()).then(setCategories);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || content.length < 50 || !authorId || !categoryId) {
      return alert('All fields are required. Content must be at least 50 characters.');
    }

    const newPost: Omit<BlogPost, 'id'> = {
      title,
      content,
      authorId,
      categoryId,
      date: new Date().toISOString(),
    };

    await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify(newPost),
    });

    router.push('/blog');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 w-full"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content (min 50 characters)"
          className="border p-2 w-full h-40"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <select
          value={authorId}
          onChange={e => setAuthorId(e.target.value)}
          className="border p-2 w-full text-green"
        >
          <option value="">Select Author</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>

        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          className="border p-2 w-full text-greeen"
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Post
        </button>
      </form>
    </div>
  );
}
