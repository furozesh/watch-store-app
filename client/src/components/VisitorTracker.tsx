"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    console.log("VisitorTracker Mounted");

    const visited = localStorage.getItem("chronex_visited");

    console.log("visited:", visited);

    if (!visited) {
      console.log("Sending visit...");

      fetch("http://localhost:5000/api/stats/visit", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          localStorage.setItem("chronex_visited", "true");
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return null;
}