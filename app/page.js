"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { mockPosts } from "@/data/data";
import {
  Heart,
  MessageCircle,
  Pause,
  Repeat2,
  Share,
  Play,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const AudioWaveform = ({ isPlaying, heights }) => (
  <div className="flex items-center gap-0.5 h-12 flex-1">
    {heights.map((height, i) => (
      <div
        key={i}
        className={`w-1 bg-chart-3 rounded-full ${
          isPlaying ? "animate-pulse" : "opacity-60"
        }`}
        style={{
          height: `${height}%`,
          animationDelay: `${i * 0.05}s`,
        }}
      />
    ))}
  </div>
);

const AudioPost = ({ post }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [waveformHeights, setWaveformHeights] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    // Generate waveform heights once when the component mounts
    const heights = Array.from({ length: 40 }, () => Math.random() * 100);
    setWaveformHeights(heights);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Error playing audio:", error);
              setIsPlaying(false);
            });
        }
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <div className="border-b border-chart-5 p-4 hover:bg-accent transition-colors">
      <div className="flex gap-4">
        <img
          src={post.avatar}
          alt={post.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">{post.username}</span>
            <span className="text-gray-500">{post.handle}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">{post.timestamp}</span>
          </div>

          <div className="rounded-xl p-4 mb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-chart-2 flex items-center justify-center text-white hover:bg-chart-1 transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <AudioWaveform isPlaying={isPlaying} heights={waveformHeights} />
            </div>
            <audio
              ref={audioRef}
              src={post.audioUrl}
              onEnded={() => setIsPlaying(false)}
              onError={() => setIsPlaying(false)}
              preload="metadata"
              className="hidden"
            />
          </div>

          <div className="flex justify-between text-gray-500 max-w-md">
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <MessageCircle size={18} />
              <span>{post.replies}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Repeat2 size={18} />
              <span>{post.shares}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Heart size={18} />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Share size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto">
      {mockPosts.map((post) => (
        <AudioPost key={post.id} post={post} />
      ))}
    </main>
  );
}
