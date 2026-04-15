"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {faVideo, faComment,faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const STORAGE_KEY = "timeline";

export default function TimelinePage() {
  const searchParams = useSearchParams();
  const [timeline, setTimeline] = useState([]);
  const hasAdded = useRef(false);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setTimeline(stored);
  }, []);
  useEffect(() => {
    const type = searchParams.get("type");
    const name = searchParams.get("name");

    if (!type || !name) return;
    if (hasAdded.current) return;
    hasAdded.current = true;

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const exists = stored.some(
      (item) => item.type === type && item.name === name
    );

    if (exists) return;

    const newEvent = {
      id: Date.now(),
      type,
      name,
      date: new Date().toLocaleDateString(),
    };

    const updated = [newEvent, ...stored];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setTimeline(updated);
  }, [searchParams]);

  const getIcon = (type) => {
    if (type === "call") return faPhoneFlip;
    if (type === "text") return faComment;
    if (type === "video") return faVideo;
  };

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-bold">Timeline</h1>

      <div className="space-y-3">
        {timeline.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 p-4 bg-gray-100 rounded-xl"
          >
            <FontAwesomeIcon icon={getIcon(item.type)} />

            <div>
              <p className="font-semibold capitalize">
                {item.type} with {item.name}
              </p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}