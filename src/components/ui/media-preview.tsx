'use client';

import { Volume2, VolumeX, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './button';

interface MediaPreviewProps {
  url: string;
  type: 'image' | 'video' | 'audio';
  filename?: string;
  onRemove?: () => void;
  className?: string;
}

export function MediaPreview({
  url,
  type,
  filename,
  onRemove,
  className,
}: MediaPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleVideoPlay = (video: HTMLVideoElement) => {
    setIsPlaying(!video.paused);
  };

  const handleAudioPlay = (audio: HTMLAudioElement) => {
    setIsPlaying(!audio.paused);
  };

  const toggleMute = (media: HTMLVideoElement | HTMLAudioElement) => {
    media.muted = !media.muted;
    setIsMuted(media.muted);
  };

  return (
    <div className={`relative group ${className}`}>
      {onRemove && (
        <Button
          type="button"
          variant="destructive"
          size="sm"
          className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {type === 'image' && (
        <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          <Image
            src={url}
            alt={filename || 'Uploaded image'}
            width={400}
            height={300}
            className="w-full h-auto object-cover transition-transform duration-200 hover:scale-105"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={false}
            quality={85}
          />
        </div>
      )}

      {type === 'video' && (
        <div className="relative overflow-hidden rounded-lg bg-black">
          <video
            src={url}
            className="w-full h-auto object-contain"
            controls
            preload="none"
            onPlay={(e) => handleVideoPlay(e.currentTarget)}
            onPause={(e) => handleVideoPlay(e.currentTarget)}
            style={{ maxHeight: '400px' }}
            aria-label={filename || 'Video attachment'}
          >
            <track kind="captions" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={(e) => {
                const video = e.currentTarget
                  .closest('div')
                  ?.querySelector('video');
                if (video) toggleMute(video);
              }}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      )}

      {type === 'audio' && (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4 border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Volume2
                className="h-5 w-5 text-blue-600 dark:text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 block truncate">
                {filename || 'Audio file'}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Audio
              </span>
            </div>
          </div>

          <audio
            src={url}
            className="w-full h-8"
            controls
            preload="metadata"
            onPlay={(e) => handleAudioPlay(e.currentTarget)}
            onPause={(e) => handleAudioPlay(e.currentTarget)}
            aria-label={filename || 'Audio attachment'}
          >
            Your browser does not support the audio tag.
          </audio>
        </div>
      )}

      {filename && type !== 'audio' && (
        <div className="mt-2">
          <p className="text-xs text-gray-500 truncate">{filename}</p>
        </div>
      )}
    </div>
  );
}
