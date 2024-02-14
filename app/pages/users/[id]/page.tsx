'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
export default function Page({ params }: { params: { slug: string } }) {
  const [user, setUserDetail] = useState([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${params.id}`, {
      headers: {
        Authorization:
          'token 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',
      },
    })
      .then((res) => res.json())
      .then((result) => setUserDetail(result))
      .catch((err) => console.log(err));
  }, [params.id]);
  const User = ({ user }) => {
    return (
      <div className="card">
        <div className="text-center align-center items-center justify-center w-full">
          <img
            src={user && user.avatar_url ? user.avatar_url : ''}
            width={100}
            height={100}
            alt={user && user.login}
            className="rounded-full"
          />
        </div>
        <div>
          <h4 className="font-bold text-2xlg">{user.name}</h4>
          <div>bio{user.bio}</div>
          <div>blog:{user.blog}</div>
          <div>company:{user.company}</div>
          <div>Email:{user.email}</div>
          <div>Followers:{user.followers}</div>
          <div>Following:{user.following}</div>
          <div>HTML_URL:{user.html_url}</div>
          <div>Twitter:{user.twitter_username}</div>
          <div>public_repos:{user.public_repos}</div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="p-4 bg-pink-300 w-full text-blue-600 hover:text-blue-500">
        <Link href="../../">Back to User List</Link>
      </div>
      <div className="flex items-center mx-auto m-20 bg-white rounded shadow-lg p-5">
        {user ? <User user={user} /> : ''}
      </div>
    </div>
  );
}
