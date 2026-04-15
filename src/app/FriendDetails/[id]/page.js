"use client";
import { toast } from "sonner"; 
import { use } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlarmClock,faBoxArchive,faTrashCan,faVideo,faComment,faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

export default function Page({ params }) {
  const { id } = use(params);

  const router = useRouter();

  const [friend, setFriend] = useState(null);

  
  const isLogging = useRef(false);

  useEffect(() => {
    fetch("https://keen-keeper-puce.vercel.app/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const list = data.friends || data.data || data;

        const found = list.find((item) => item.id === Number(id));
        setFriend(found || null);
      });
  }, [id]);

 
  const addTimelineEvent = (type) => {
    if (!friend) return;
    if (isLogging.current) return;
    isLogging.current = true;

    const old = JSON.parse(localStorage.getItem("timeline")) || [];

    const newEvent = {
      type,
      name: friend.name,
      time: new Date().toLocaleString(),
    };

    localStorage.setItem("timeline", JSON.stringify([...old, newEvent]));
toast.success(`${type} with ${friend.name} Added to your Timeline`);
    setTimeout(() => {
      isLogging.current = false;
    }, 100);
  };

  if (!friend) {
    return <div className="p-5 font-bold">Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 m-3 sm:m-5 gap-3 sm:space-x-3">

     
      <div className="space-y-3">
        <div className="flex text-center flex-col items-center gap-4 bg-gray-200 rounded-3xl shadow p-6 w-full overflow-hidden">
          <img
            src={friend.picture}
            className="rounded-full w-20 h-20 object-cover"
          />

          <h1 className="font-bold">{friend.name}</h1>

          <div className="flex flex-wrap justify-center gap-1">
            {friend.tags.map((tag, i) => (
              <button
                key={i}
                className="text-xs font-bold px-2 py-1 rounded-full bg-blue-200"
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            className={`font-bold text-xs px-3 py-1 rounded-full ${
              friend.status === "almost due"
                ? "bg-yellow-300"
                : friend.status === "overdue"
                ? "bg-red-600"
                : "bg-green-700"
            }`}
          >
            {friend.status}
          </button>

          <p className="text-gray-500">{friend.bio}</p>
          <h1>Preferred: {friend.email}</h1>
        </div>

        <button className="btn w-full">
          <FontAwesomeIcon icon={faAlarmClock} /> Snooze 2 Weeks
        </button>

        <button className="btn w-full">
          <FontAwesomeIcon icon={faBoxArchive} /> Archive
        </button>

        <button className="btn text-red-600 w-full">
          <FontAwesomeIcon icon={faTrashCan} /> Delete
        </button>
      </div>

     
      <div className="space-y-3">

        <div className="flex gap-2 sm:gap-2.5">
          <button className="btn flex-1 py-9 sm:p-10 flex-col font-bold text-center">
            {friend.days_since_contact}
            <p className="text-gray-400 text-xs">Days Since Contact</p>
          </button>

          <button className="btn flex-1 py-9 sm:p-10 flex-col font-bold text-center">
            {friend.goal}
            <p className="text-gray-400 text-xs">Goal(Days)</p>
          </button>

          <button className="btn text-xs lg:text-sm flex-1 py-9 sm:p-10 flex-col font-bold text-center">
            {friend.next_due_date}
            <p className="text-gray-400 text-xs">Next Due</p>
          </button>
        </div>

        <div className="border flex items-center justify-between border-gray-300 rounded-2xl shadow p-2">
          <div className="p-4 font-bold text-center">
            <p className="text-gray-700">Relationship Goal</p>
            <p className="text-gray-400">
              Connect every <span className="font-bold">30 days</span>
            </p>
          </div>
          <button className="btn">Edit</button>
        </div>

       
        <div className="border border-gray-300 rounded-2xl p-5 space-y-5">
          <h1 className="font-bold">Quick Check-In</h1>

          <div className="flex justify-between gap-2">

            <button
              onClick={() => addTimelineEvent("call")}
              className="btn flex-1 py-6 flex-col"
            >
              <FontAwesomeIcon icon={faPhoneFlip} /> Call
            </button>

            <button
              onClick={() => addTimelineEvent("text")}
              className="btn flex-1 py-6 flex-col"
            >
              <FontAwesomeIcon icon={faComment} /> Text
            </button>

            <button
              onClick={() => addTimelineEvent("video")}
              className="btn flex-1 py-6 flex-col"
            >
              <FontAwesomeIcon icon={faVideo} /> Video
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}