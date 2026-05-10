'use client';

import { usePathname } from 'next/navigation';

import type { Component } from '@/@types/next.types';

const NotFound: Component = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource &quot;{pathname}&quot;</p>
      <button type="button">Try Again</button>
    </div>
  );
};

export default NotFound;
