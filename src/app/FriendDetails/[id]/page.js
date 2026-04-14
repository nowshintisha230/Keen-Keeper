import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlarmClock, faBoxArchive, faTrashCan, faVideo, faComment, faPhoneFlip } from "@fortawesome/free-solid-svg-icons";

export default async function Page({ params }) {
  const { id } = await params;

  const res = await fetch("http://localhost:3000/friends.json");
  const friends = await res.json();

  const friend = friends.find((item) => item.id == id);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 m-3 sm:m-5 gap-3 sm:space-x-3">

      {/* Left Column */}
      <div className="space-y-3">
        <div
          key={friend.id}
          className='flex text-center flex-col items-center gap-4 bg-gray-200 rounded-3xl shadow p-6 w-full overflow-hidden'
        >
          <img
            src={friend.picture}
            className='rounded-full w-20 h-20 object-cover'
          />
          <h1 className='font-bold text-center'>{friend.name}</h1>
          <div className='flex flex-wrap justify-center gap-1'>
            <button className='font-bold text-xs px-2 py-1 rounded-full bg-green-200'>
              {friend.tags[0]}
            </button>
            <button className='text-xs font-bold px-2 py-1 rounded-full bg-green-200'>
              {friend.tags[1]}
            </button>
            {friend.tags[2] && (
              <button className='font-bold text-xs px-2 py-1 rounded-full bg-green-200'>
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
                : "bg-green-500"
            }`}
          >
            {friend.status}
          </button>
          <p className="text-gray-500">{friend.bio}</p>
          <h1>Preferred: {friend.email}</h1>
        </div>

        <button className="btn w-full"><FontAwesomeIcon icon={faAlarmClock} /> Snooze 2 Weeks</button>
        <button className="btn w-full"><FontAwesomeIcon icon={faBoxArchive} /> Archive</button>
        <button className="btn text-red-600 w-full"><FontAwesomeIcon icon={faTrashCan} /> Delete</button>
      </div>

      {/* Right Column */}
      <div className="space-y-3">
        <div className="flex gap-2 sm:gap-2.5">
          <button className="btn flex-1 py-6 sm:p-10 flex-col font-bold text-center">
            {friend.days_since_contact}
            <p className="text-gray-400 text-xs sm:text-sm">Days Since Contact</p>
          </button>
          <button className="btn flex-1 py-6 sm:p-10 flex-col font-bold text-center">
            {friend.goal}
            <p className="text-gray-400 text-xs sm:text-sm">Goal(Days)</p>
          </button>
          <button className="btn flex-1 py-6 sm:p-10 flex-col font-bold text-center">
            {friend.next_due_date}
            <p className="text-gray-400 text-xs sm:text-sm">Next Due</p>
          </button>
        </div>

        <div className="flex border border-gray-300 rounded-2xl shadow justify-between items-center p-2">
          <div className="p-4 sm:p-10 flex-col font-bold text-center">
            <p className="text-gray-700">Relationship Goal</p>
            <p className="text-gray-400">Connect every <span className="font-bold">30 days</span></p>
          </div>
          <button className="btn">Edit</button>
        </div>

        <div className="border border-gray-300 rounded-2xl p-5 sm:p-10 space-y-5">
          <h1 className="font-bold">Quick Check-In</h1>
          <div className="flex justify-between gap-2 sm:gap-3">
            <button className="btn flex-1 py-6 sm:p-10 text-center font-thin flex-col">
              <FontAwesomeIcon icon={faPhoneFlip} /> Call
            </button>
            <button className="btn flex-1 py-6 sm:p-10 text-center font-thin flex-col">
              <FontAwesomeIcon icon={faComment} /> Text
            </button>
            <button className="btn flex-1 py-6 sm:p-10 text-center font-thin flex-col">
              <FontAwesomeIcon icon={faVideo} /> Video
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}