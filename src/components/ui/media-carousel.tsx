'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from './button';

interface MediaCarouselProps {
  mediaUrls: string[];
  className?: string;
  getMediaType: (url: string) => 'image' | 'video' | 'audio';
}

interface CarouselMediaItemProps {
  url: string;
  type: 'image' | 'video' | 'audio';
  className?: string;
}

function CarouselMediaItem({ url, type, className }: CarouselMediaItemProps) {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = (media: HTMLVideoElement | HTMLAudioElement) => {
    media.muted = !media.muted;
    setIsMuted(media.muted);
  };

  if (type === 'image') {
    return (
      <div
        className={cn(
          'relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800',
          className
        )}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={url}
            alt="Media content"
            fill
            className="object-contain"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={85}
          />
        </div>
      </div>
    );
  }

  if (type === 'video') {
    return (
      <div
        className={cn(
          'relative w-full h-full flex items-center justify-center bg-black',
          className
        )}
      >
        <video
          src={url}
          className="w-full h-full object-contain"
          controls
          preload="none"
          style={{ maxHeight: '100%', maxWidth: '100%' }}
          aria-label="Video content"
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
            className="shadow-lg"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    );
  }

  if (type === 'audio') {
    return (
      <div
        className={cn(
          'relative w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 via-purple-50 to-purple-100 dark:from-purple-900 dark:via-purple-800 dark:to-purple-900 p-8',
          className
        )}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
            <Volume2 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Audio File
            </p>
            <audio
              src={url}
              className="w-full max-w-sm"
              controls
              preload="metadata"
              aria-label="Audio content"
            >
              Your browser does not support the audio tag.
            </audio>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export function MediaCarousel({
  mediaUrls,
  className,
  getMediaType,
}: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!mediaUrls || mediaUrls.length === 0) {
    return null;
  }

  if (mediaUrls.length === 1) {
    return (
      <div
        className={cn(
          'rounded-lg overflow-hidden aspect-[4/3] min-h-[200px]',
          className
        )}
      >
        <CarouselMediaItem
          url={mediaUrls[0]}
          type={getMediaType(mediaUrls[0])}
          className="w-full h-full"
        />
      </div>
    );
  }

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaUrls.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden group aspect-[4/3] min-h-[200px]',
        className
      )}
    >
      <div className="relative overflow-hidden h-full">
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {mediaUrls.map((url, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <CarouselMediaItem
                url={url}
                type={getMediaType(url)}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-10 backdrop-blur-sm"
          onClick={goToPrevious}
          disabled={isTransitioning}
          aria-label="Previous media"
        >
          <ChevronLeft className="h-4 w-4 text-gray-700" />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg z-10 backdrop-blur-sm"
          onClick={goToNext}
          disabled={isTransitioning}
          aria-label="Next media"
        >
          <ChevronRight className="h-4 w-4 text-gray-700" />
        </Button>

        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
          {currentIndex + 1} / {mediaUrls.length}
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {mediaUrls.map((_, index) => (
          <button
            key={index}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-200 transform hover:scale-125',
              index === currentIndex
                ? 'bg-white shadow-lg scale-110'
                : 'bg-white/60 hover:bg-white/80'
            )}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            aria-label={`Go to media ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
