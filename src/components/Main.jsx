import axios from 'axios';
import React, { useEffect, useState } from 'react';
import requests from '../Requests';

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [textColorClass, setTextColorClass] = useState('');

  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    axios.get(requests.requestPopular).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  useEffect(() => {
    const voteAverage = Math.round(movie?.vote_average);

    if (voteAverage <= 5.59) {
      setTextColorClass('text-red-500');
    } else if (voteAverage >= 6 && voteAverage <= 7.59) {
      setTextColorClass('text-orange-500');
    } else if (voteAverage >= 8 && voteAverage <= 8.59) {
      setTextColorClass('text-green-300');
    } else {
      setTextColorClass('text-green-500');
    }
  }, [movie]);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  return (
    <div className='w-full h-[600px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
        <img
          className='w-full h-full object-cover'
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
          <div className='my-4'>
            <button className='border bg-red-600 text-black border-red-600 rounded py-2 px-5 transition duration-300 hover:text-white hover:bg-red-800'>
              Play
            </button>
            <button className='border text-white border-gray-300 py-2 rounded px-5 ml-4 transition duration-300 hover:bg-gray-100 hover:text-gray-800'>
              Watch Later
            </button>
          </div>
          <p className='text-gray-400 text-sm'>
            Released Year: {new Date(movie?.release_date).getFullYear()}
          </p>
          <p className={` text-sm py-3 px-3 ${textColorClass}`}>
            Rated: {Math.round(movie?.vote_average)}
          </p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
