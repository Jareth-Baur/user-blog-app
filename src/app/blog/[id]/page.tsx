// app/blog/[id]/page.tsx
import { BlogPost, User } from '../../types';

async function getPostAndUsers(id: string): Promise<{ post: BlogPost | null, users: User[] }> {
  const [postsRes, usersRes] = await Promise.all([
    fetch('http://localhost:3000/api/blog'),
    fetch('http://localhost:3000/api/users'),
  ]);
  const posts: BlogPost[] = await postsRes.json();
  const users: User[] = await usersRes.json();
  return {
    post: posts.find(p => p.id === id) || null,
    users,
  };
}

export default async function BlogDetail({ params }: { params: { id: string } }) {
  const { post, users } = await getPostAndUsers(params.id);

  const author = users.find(u => u.id === post?.authorId);

  if (!post) return <p className="p-6">Post not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">By {author?.name} on {new Date(post.date).toLocaleDateString()}</p>
      <p className="whitespace-pre-wrap">{post.content}</p>
    </div>
  );
}
