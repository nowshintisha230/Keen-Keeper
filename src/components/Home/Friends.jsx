import React from 'react';

const Friends = async () => {
  const res = await fetch("http://localhost:3000/friends.json", {
    cache: "no-store"
  });

  const data = await res.json();

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {
        data.map((friend) => (
          <div
            key={friend.id}
            className='flex flex-col items-center gap-4 bg-gray-200 rounded-3xl shadow-xl p-6 w-full overflow-hidden'
          >
            
           
            <img
              src={friend.picture}
              className='rounded-full w-20 h-20 object-cover'
            />

            <h1 className='font-bold text-center'>{friend.name}</h1>

            <p className='text-gray-600 text-sm'>
              {friend.days_since_contact}d ago
            </p>

         
            <div className='flex flex-wrap justify-center gap-1'>
              <button className='text-xs px-2 py-1 rounded-full bg-green-200'>
                {friend.tags[0]}
              </button>

              <button className='text-xs px-2 py-1 rounded-full bg-green-200'>
                {friend.tags[1]}
              </button>

              {friend.tags[2] && (
                <button className='text-xs px-2 py-1 rounded-full bg-green-200'>
                  {friend.tags[2]}
                </button>
              )}
            </div>

           
            <button
              className={`text-xs px-3 py-1 rounded-full ${
                friend.status === "almost due"
                  ? "bg-yellow-300"
                  : friend.status === "overdue"
                  ? "bg-red-600"
                  : "bg-green-500"
              }`}
            >
              {friend.status}
            </button>

          </div>
        ))
      }
    </div>
  );
};

export default Friends;