'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotal] = useState(0);
  useEffect(() => {
    fetch(`https://api.github.com/users?per_page=100&&page=${currentPage}`, {
      headers: {
        Authorization:
          'token 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',
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
        let pages = users && users.length / 10;
        setTotal(pages);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);
  if (users.length < 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center text-center items-center m-2 p-2">
        <button
          className="p-2 bg-blue-300 text-black-300 rounded-lg m-1"
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Current Page:{currentPage}</span>
        <button
          className="p-2 bg-blue-300 text-black-300 rounded-lg m-1"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
        Total:{users.length / 10}
      </div>
      <div className="m-2 grid grid-cols-4 justify-between">
        {users &&
          users.length > 0 &&
          users.map((item) => {
            return (
              <Link
                key={item['id']}
                href={`/pages/users/${item['login']}`}
                className="bg-white p-3 border-2 rounded-lg"
              >
                <Image
                  src={item && item['avatar_url'] ? item['avatar_url'] : ''}
                  width={100}
                  height={100}
                  alt={item['login']}
                />

                {item['login'].toUpperCase()}
              </Link>
            );
          })}
      </div>
    </div>
  );
}
