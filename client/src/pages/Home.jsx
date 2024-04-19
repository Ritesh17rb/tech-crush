import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaLaptopCode } from 'react-icons/fa'; // Import FaLaptopCode icon
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center'>
        <h1 className='text-5xl md:text-7xl font-extrabold text-teal-600 mb-4 hover:text-pink-400 transform hover:scale-105 transition duration-300'>
          Welcome to <FaLaptopCode className="text-gray-600 inline-block" /> <span className="text-gray-600">Tech</span><span className="text-green-600"><em>Crush</em></span>
        </h1>
        <h3 className='text-gray-600 text-lg md:text-xl mb-8'>
          <em>Where we delve into the latest in technology. Stay updated on the newest innovations and trends shaping our digital world. Join the conversation today!</em>
        </h3>
        <Link to='/search' className='text-teal-600 font-bold hover:text-teal-700'>
          View all posts
        </Link>
      </div>

      <div className='mt-12'>
        <h2 className='text-3xl md:text-4xl font-semibold text-center mb-6'>Recent Posts</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <div className='text-center mt-8'>
          <Link to={'/search'} className='text-teal-600 font-bold hover:text-teal-700'>
            View all posts
          </Link>
        </div>
      </div>
    </div>
  );
}
