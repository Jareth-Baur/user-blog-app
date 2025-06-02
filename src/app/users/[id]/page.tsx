// app/users/[id]/page.tsx
import { User } from '../../types';

async function getUser(id: string): Promise<User | null> {
  const res = await fetch('http://localhost:3000/api/users');
  const users: User[] = await res.json();
  return users.find(user => user.id === id) || null;
}

export default async function UserDetail({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  if (!user) return <p className="p-6">User not found.</p>;

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full border border-gray-100">
        <div className="flex items-center mb-8">
          <img
            src="https://cdn-icons-png.flaticon.com/256/8388/8388392.png"
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover mr-6 border-2 border-indigo-200 shadow"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
            <span className="text-indigo-500 text-sm font-medium">User Profile</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-semibold text-gray-600 w-24">Email:</span>
            <span className="ml-2 text-gray-900">{user.email}</span>
          </div>
          {/* Add more user details here if needed */}
        </div>
      </div>
    </div>
  );
}
