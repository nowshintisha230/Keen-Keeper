"use client";
import { useState, useEffect } from "react";

export default function Friends() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 50000);
  }, []);

  if (loading)
    return <div className="animate-spin h-10 w-10 border-black border-b-2"></div>;
console.log("LOADING IS FALSE - showing data");
  return <div>Friends data here</div>;
}