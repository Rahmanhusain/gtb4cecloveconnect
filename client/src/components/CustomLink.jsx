"use client"
import { useState } from 'react';
import Link from 'next/link';
import Loader from './Loader';

const CustomLink = ({ href, children, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => {

    setIsLoading(true);
  };

  return (
    <>
      {isLoading && <Loader/>}
      <Link href={href} onClick={handleClick} {...props}>
        {children}
      </Link>
    </>
  );
};

export default CustomLink;
