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
    <div className="p-6">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
