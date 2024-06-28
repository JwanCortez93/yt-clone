import { useEffect, useRef, useState } from "react";
import {
  formatDuration,
  formatTimeAgo,
  VIEW_FORMATTER,
} from "../utils/formatters";

type VideoItemProps = {
  id: number;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

export function VideoItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: VideoItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 20;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          alt={title}
          className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${
            isVideoPlaying ? "rounded-none" : "rounded-xl"
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          className={`${
            isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"
          } h-full object-cover absolute inset-0 transition-opacity duration-200`}
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
        ></video>
      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            className="w-12 h-12 rounded-full"
            src={channel.profileUrl}
            alt="Channel Profile"
          />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">
            {title
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
