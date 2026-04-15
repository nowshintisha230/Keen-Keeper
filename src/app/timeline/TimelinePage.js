"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  faVideo,
  faComment,
  faPhoneFlip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const STORAGE_KEY = "timeline";

export default function TimelinePage() {
  const searchParams = useSearchParams();
  const [timeline, setTimeline] = useState([]);
  const [mounted, setMounted] = useState(false);
  const hasAdded = useRef(false);

  // Load from localStorage and set mounted in one effect
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setTimeline(stored);
    setMounted(true);
  }, []);

  const getFormattedDate = () => {
    return new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const addEvent = (type, name) => {
    const newEvent = {
      id: Date.now(),
      type,
      name,
      date: getFormattedDate(),
    };

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updated = [newEvent, ...stored];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setTimeline(updated);
  };

  // Handle query params safely
  useEffect(() => {
    if (!mounted) return;

    const type = searchParams.get("type");
    const name = searchParams.get("name");

    if (!type || !name) return;
    if (hasAdded.current) return;

    hasAdded.current = true;

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const exists = stored.some(
      (item) => item.type === type && item.name === name
    );

    if (!exists) {
      addEvent(type, name);
    }
  }, [searchParams, mounted]);

  const getIcon = (type) => {
    if (type === "call") return faPhoneFlip;
    if (type === "text") return faComment;
    if (type === "video") return faVideo;
  };

  if (!mounted) return null;

  return (
    <div className="p-5 space-y-5">
      <h1 className="text-2xl font-bold">Timeline</h1>

      {timeline.length === 0 ? (
        <div className="p-4 border rounded-lg text-gray-500">
          No timeline events yet
        </div>
      ) : (
        <div className="space-y-3">
          {timeline.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-4 bg-gray-100 rounded-xl items-center"
            >
              <FontAwesomeIcon icon={getIcon(item.type)} className="text-xl" />

              <div>
                <p className="font-semibold capitalize">
                  {item.type} with {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  {item.date ? item.date : getFormattedDate()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}