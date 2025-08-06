'use client';

import { useRefCallback } from '@/hooks/use-ref-callback';
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
          'relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800',
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
          'relative w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 p-8',
          className
        )}
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
            <Volume2 className="h-8 w-8 text-purple-400" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-purple-100">Audio File</p>
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
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  if (!mediaUrls || mediaUrls.length === 0) {
    return null;
  }

  if (mediaUrls.length === 1) {
    return (
      <div
        className={cn(
          'rounded-xl overflow-hidden aspect-[4/3] min-h-[200px] shadow-xl',
          className
        )}
      >
        <div className="w-full h-full transform transition-transform duration-300 hover:scale-[1.02]">
          <CarouselMediaItem
            url={mediaUrls[0]}
            type={getMediaType(mediaUrls[0])}
            className="w-full h-full"
          />
        </div>
      </div>
    );
  }

  const goToPrevious = () => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaUrls.length - 1 : prevIndex - 1
    );
  };

  const goToNext = useRefCallback(() => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaUrls.length - 1 ? 0 : prevIndex + 1
    );
  });

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  const handleDragStart = (clientX: number) => {
    if (isTransitioning) return;
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50; // Minimum drag distance to trigger slide change

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    setDragOffset(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    // Don't start drag if clicking on a button or interactive element
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  useEffect(() => {
    const intervalId = setInterval(() => goToNext(), 5000);
    return () => clearInterval(intervalId);
  }, [goToNext]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 400); // Increased duration for smoother Apple-like animation
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleDragMove(e.clientX);
      };

      const handleGlobalMouseUp = () => {
        handleDragEnd();
      };

      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, startX, dragOffset]);

  const getTransform = () => {
    const baseTransform = -currentIndex * 100;
    const dragTransform = isDragging
      ? (dragOffset / window.innerWidth) * 100
      : 0;
    return baseTransform + dragTransform;
  };

  return (
    <div
      className={cn(
        'relative rounded-xl overflow-hidden group aspect-[4/3] min-h-[200px] shadow-xl bg-white/5',
        'transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]',
        className
      )}
    >
      <div
        className="relative overflow-hidden h-full cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={cn(
            'flex h-full',
            isDragging
              ? 'transition-none'
              : 'transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]'
          )}
          style={{
            transform: `translateX(${getTransform()}%)`,
          }}
        >
          {mediaUrls.map((url, index) => {
            const isActive = index === currentIndex;
            const distance = Math.abs(index - currentIndex);

            return (
              <div
                key={index}
                className={cn(
                  'w-full h-full flex-shrink-0 transform transition-all duration-400',
                  isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                )}
                style={{
                  filter:
                    distance > 0
                      ? `blur(${Math.min(distance * 2, 4)}px)`
                      : 'none',
                }}
              >
                <CarouselMediaItem
                  url={url}
                  type={getMediaType(url)}
                  className="w-full h-full"
                />
              </div>
            );
          })}
        </div>

        <Button
          variant="secondary"
          size="sm"
          className={cn(
            'absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full',
            'bg-white/95 hover:bg-white border-0 shadow-lg backdrop-blur-md',
            'opacity-0 group-hover:opacity-100 transition-all duration-300',
            'transform hover:scale-110 active:scale-95',
            'z-20'
          )}
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          disabled={isTransitioning || isDragging}
          aria-label="Previous media"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className={cn(
            'absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 p-0 rounded-full',
            'bg-white/95 hover:bg-white border-0 shadow-lg backdrop-blur-md',
            'opacity-0 group-hover:opacity-100 transition-all duration-300',
            'transform hover:scale-110 active:scale-95',
            'z-20'
          )}
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          disabled={isTransitioning || isDragging}
          aria-label="Next media"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </Button>

        <div
          className={cn(
            'absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full',
            'opacity-0 group-hover:opacity-100 transition-all duration-300',
            'backdrop-blur-md font-medium',
            'transform translate-y-0 group-hover:-translate-y-0.5'
          )}
        >
          {currentIndex + 1} / {mediaUrls.length}
        </div>
      </div>

      <div
        className={cn(
          'absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2',
          'opacity-0 group-hover:opacity-100 transition-all duration-300',
          'transform translate-y-2 group-hover:translate-y-0'
        )}
      >
        {mediaUrls.map((_, index) => (
          <button
            key={index}
            className={cn(
              'rounded-full transition-all duration-300 transform',
              'hover:scale-125 active:scale-110',
              index === currentIndex
                ? 'w-6 h-2 bg-white shadow-lg'
                : 'w-2 h-2 bg-white/60 hover:bg-white/80'
            )}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            disabled={isTransitioning || isDragging}
            aria-label={`Go to media ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}
