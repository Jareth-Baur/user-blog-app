// app/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { User } from '../types';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <a
          href="/users/add"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add User
        </a>
      </div>

      {users.length === 0 ? (
        <p className="text-gray-700">No users available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
                alt="User avatar"
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <a
                href={`/users/${user.id}`}
                className="text-xl font-bold text-blue-700 hover:underline mb-1"
              >
                {user.name}
              </a>
              <p className="text-gray-500 mb-2">{user.email}</p>
              <a
                href={`/users/${user.id}`}
                className="mt-2 inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition"
              >
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
