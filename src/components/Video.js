import React, { useState, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import "tailwindcss/tailwind.css";

export default function VideoPlayer(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);

  const videoRef = useRef(null);
  const scrollRef = useRef(null);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    video.volume = e.target.value;
    setVolume(video.volume);
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (!document.fullscreenElement) {
      video.requestFullscreen().catch((err) => {
        console.error(err);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const handleScroll = (e) => {
    const video = videoRef.current;
    const scrollAmount = e.deltaY;
    const newTime = Math.min(
      Math.max(video.currentTime - scrollAmount / 10, 0),
      video.duration
    );
    video.currentTime = newTime;
  };

  return (
    <div
      className={`relative w-full ${
        isFullScreen ? "h-screen" : "h-screen"
      } bg-black flex flex-col items-center justify-center`}
    >
      <div
        ref={scrollRef}
        className="relative w-full flex flex-col items-center justify-center"
        onWheel={handleScroll}
      >
        <video
          ref={videoRef}
          src={props.videoFile}
          className={`w-full ${
            isFullScreen ? "h-full" : "h-full"
          } object-cover`}
          controls={false}
        />
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={togglePlayPause}
          className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>

        <button
          onClick={toggleMute}
          className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
        >
          {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24"
        />

        <button
          onClick={toggleFullScreen}
          className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition duration-300"
        >
          {isFullScreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
        </button>
      </div>
    </div>
  );
}
