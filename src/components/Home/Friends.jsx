import Link from 'next/link';
import React from 'react';

const Friends = async () => {
  const res = await fetch("/friends.json", {
    cache: "no-store"
  });
  const data = await res.json();

const totalFriends = data.length;

const onTrack = data.filter(f => f.status === "on-track").length;

const needAttention = data.filter(
  f => f.status === "almost due" || f.status === "overdue"
).length;

const interactionThisMonth = data.filter(
  f => f.days_since_contact <= 30
).length;


  return (
    <div className=''>
<div className='m-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3'>
  
  <button className='btn p-10 flex flex-col items-center'><span className='text-xl font-bold'>{totalFriends}</span>
    <p className='text-gray-500 text-sm'>Total Friends</p>
  </button>

  <button className='btn p-10 flex flex-col items-center'>  <span className='text-xl font-bold'>{onTrack}</span>
    <p className='text-gray-500 text-sm'>On Track</p>
  </button>

  <button className='btn p-10 flex flex-col items-center'>    <span className='text-xl font-bold'>{needAttention}</span>
    <p className='text-gray-500 text-sm'>Need Attention</p>
  </button>

  <button className='btn p-10 flex flex-col items-center'>   <span className='text-xl font-bold'>{interactionThisMonth}</span>
    <p className='text-gray-500 text-sm'>Interactions This Month</p>
  </button>

</div>

    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

     
      {
        data.map((friend) => (
            <Link href={`/FriendDetails/${friend.id}`} key={friend.id}>
         



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
              <button className='font-bold text-xs px-2 py-1 rounded-full bg-blue-200'>
                {friend.tags[0]}
              </button>

              <button className='text-xs font-bold px-2 py-1 rounded-full bg-blue-200'>
                {friend.tags[1]}
              </button>

              {friend.tags[2] && (
                <button className='font-bold text-xs px-2 py-1 rounded-full bg-blue-200'>
                  {friend.tags[2]}
                </button>
              )}
            </div>

           
            <button
              className={`font-bold text-xs px-3 py-1 rounded-full ${
                friend.status === "almost due"
                  ? "bg-yellow-300"
                  : friend.status === "overdue"
                  ? "bg-red-600"
                  : "bg-green-600"
              }`}
            >
              {friend.status}
            </button>

          </div>
          </Link>
        ))
      }
    </div>
    </div>
  );
};

export default Friends;