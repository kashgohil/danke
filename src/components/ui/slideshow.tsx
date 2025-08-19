'use client';

import { Button } from '@/components/ui/button';
import {
  generateGradientStyle,
  getContrastTextStyles,
} from '@/lib/gradient-utils';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { RichTextEditor } from './rich-text-editor';

interface SlideshowPost {
  id: string;
  content: string;
  mediaUrls?: string[];
  creatorId: string;
  isAnonymous?: boolean;
  anonymousName?: string | null;
  createdAt: string;
}

interface SlideshowProps {
  posts: SlideshowPost[];
  isOpen: boolean;
  onClose: () => void;
  autoAdvanceInterval?: number;
  backgroundColor?: string;
}

export function Slideshow({
  posts,
  isOpen,
  onClose,
  autoAdvanceInterval = 10000,
  backgroundColor,
}: SlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const gradientStyle = generateGradientStyle(backgroundColor);
  const contrastTextStyles = getContrastTextStyles(backgroundColor);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % posts.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [posts.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [posts.length, isTransitioning]);

  useEffect(() => {
    if (!isOpen || posts.length === 0 || isPaused) return;

    const interval = setInterval(nextSlide, autoAdvanceInterval);
    return () => clearInterval(interval);
  }, [isOpen, posts.length, nextSlide, autoAdvanceInterval, isPaused]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          if (isFullscreen) {
            exitFullscreen();
          }
          onClose();
          break;
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'f':
        case 'F':
          event.preventDefault();
          if (isFullscreen) {
            exitFullscreen();
          } else {
            enterFullscreen();
          }
          break;
        case 'p':
        case 'P':
          event.preventDefault();
          setIsPaused(!isPaused);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, nextSlide, prevSlide]);

  const enterFullscreen = useCallback(async () => {
    try {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } catch (error) {
      console.warn('Failed to enter fullscreen:', error);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    } catch (error) {
      console.warn('Failed to exit fullscreen:', error);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'msfullscreenchange',
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      enterFullscreen();
    } else {
      document.body.style.overflow = 'unset';
      if (isFullscreen) {
        exitFullscreen();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, enterFullscreen, exitFullscreen, isFullscreen]);

  if (!isOpen || posts.length === 0) return null;

  function actionBar() {
    return (
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 shadow-lg"
          style={contrastTextStyles.primary}
          onClick={isFullscreen ? exitFullscreen : enterFullscreen}
        >
          {isFullscreen ? (
            <Minimize className="w-6 h-6" />
          ) : (
            <Maximize className="w-6 h-6" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 shadow-lg"
          style={contrastTextStyles.primary}
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? (
            <Play className="w-6 h-6" />
          ) : (
            <Pause className="w-6 h-6" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 shadow-lg"
          style={contrastTextStyles.primary}
          onClick={() => {
            if (isFullscreen) {
              exitFullscreen();
            }
            onClose();
          }}
        >
          <X className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  function slides() {
    return (
      <div className="w-full h-full relative overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="w-full h-full flex-shrink-0 flex items-center justify-center p-8"
            >
              <SlideContent
                post={post}
                contrastTextStyles={contrastTextStyles}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  function progressBar() {
    return (
      <div className="absolute top-0 left-0 w-full h-1 bg-black/20">
        <div
          className="h-full transition-all duration-300 ease-linear"
          style={{
            width: `${((currentIndex + 1) / posts.length) * 100}%`,
            backgroundColor: contrastTextStyles.primary.color,
          }}
        />
      </div>
    );
  }

  function dots() {
    return (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 backdrop-blur-sm bg-black/10 px-4 py-2 rounded-full">
        {posts.map((_, index) => (
          <button
            key={index}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-200 hover:scale-110',
              index === currentIndex ? 'opacity-100 scale-110' : 'opacity-50'
            )}
            style={{
              backgroundColor: contrastTextStyles.primary.color,
            }}
            onClick={() => !isTransitioning && setCurrentIndex(index)}
          />
        ))}
      </div>
    );
  }

  function index() {
    return (
      <div
        className="absolute top-4 left-4 text-sm backdrop-blur-sm bg-white/10 px-3 py-1 rounded-full border border-white/20"
        style={contrastTextStyles.muted}
      >
        {currentIndex + 1} / {posts.length}
      </div>
    );
  }

  function controls() {
    if (posts.length === 1) return null;

    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 shadow-lg transition-all duration-200 hover:scale-110"
          style={contrastTextStyles.primary}
          onClick={prevSlide}
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 shadow-lg transition-all duration-200 hover:scale-110"
          style={contrastTextStyles.primary}
          onClick={nextSlide}
          disabled={isTransitioning}
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[9999] w-screen h-screen"
      style={
        backgroundColor
          ? gradientStyle
          : {
              background:
                'linear-gradient(135deg, #fef7ed 0%, #ffffff 50%, #fef7ed 100%)',
            }
      }
    >
      {progressBar()}
      {actionBar()}
      {slides()}
      {dots()}
      {index()}
      {controls()}
    </div>
  );
}

interface SlideContentProps {
  post: SlideshowPost;
  contrastTextStyles: {
    primary: { color: string };
    secondary: { color: string };
    muted: { color: string };
    accent: { color: string };
  };
}

function SlideContent({ post, contrastTextStyles }: SlideContentProps) {
  const getTextContent = (htmlContent: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const getCreatorName = (): string => {
    if (post.isAnonymous) {
      return post.anonymousName || 'Anonymous';
    }
    return `User ${post.creatorId.slice(0, 8)}`;
  };

  const textContent = getTextContent(post.content);
  const hasText = textContent.trim().length > 0;
  const hasMedia = post.mediaUrls && post.mediaUrls.length > 0;
  const creatorName = getCreatorName();

  const images: string[] = [];
  const videos: string[] = [];
  const audios: string[] = [];

  if (hasMedia) {
    post.mediaUrls!.forEach((url) => {
      const extension = url.split('.').pop()?.toLowerCase();
      if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
        images.push(url);
      } else if (['mp4', 'webm', 'mov'].includes(extension || '')) {
        videos.push(url);
      } else if (['mp3', 'wav', 'ogg'].includes(extension || '')) {
        audios.push(url);
      }
    });
  }

  if (hasText && !hasMedia) {
    return (
      <div className="text-center max-w-4xl animate-in fade-in duration-500">
        <div
          className="text-2xl md:text-4xl leading-relaxed mb-8 font-medium"
          style={contrastTextStyles.primary}
        >
          <RichTextEditor editable={false} content={post.content} />
        </div>
        <div className="text-lg" style={contrastTextStyles.muted}>
          - {creatorName}
        </div>
      </div>
    );
  }

  if (!hasText && images.length > 0) {
    return (
      <div className="relative w-full h-full animate-in fade-in duration-500">
        <ScatteredImages images={images} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="text-xl backdrop-blur-sm bg-black/30 px-6 py-3 rounded-lg border border-white/20 shadow-lg"
            style={contrastTextStyles.primary}
          >
            - {creatorName}
          </div>
        </div>
      </div>
    );
  }

  if (hasText && images.length > 0) {
    return (
      <div className="relative w-full h-full animate-in fade-in duration-500">
        <ScatteredImages images={images} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-2xl backdrop-blur-sm bg-black/40 p-8 rounded-lg border border-white/20 shadow-xl">
            <div
              className="text-xl md:text-2xl leading-relaxed mb-4 font-medium"
              style={contrastTextStyles.primary}
            >
              <RichTextEditor editable={false} content={post.content} />
            </div>
            <div className="text-lg" style={contrastTextStyles.muted}>
              - {creatorName}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (videos.length > 0) {
    const video = videos[0];
    return (
      <VideoSlide
        videoUrl={video}
        textContent={hasText ? post.content : ''}
        creatorName={creatorName}
        contrastTextStyles={contrastTextStyles}
      />
    );
  }

  if (audios.length > 0) {
    return (
      <div className="text-center max-w-4xl relative animate-in fade-in duration-500">
        <Volume2
          className="absolute top-4 right-4 w-8 h-8"
          style={contrastTextStyles.muted}
        />
        <div
          className="text-2xl md:text-4xl leading-relaxed mb-8 font-medium"
          style={contrastTextStyles.primary}
        >
          {hasText ? (
            <RichTextEditor editable={false} content={post.content} />
          ) : (
            'Audio message'
          )}
        </div>
        <div className="text-lg" style={contrastTextStyles.muted}>
          - {creatorName}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center max-w-4xl animate-in fade-in duration-500">
      <div
        className="text-2xl md:text-4xl leading-relaxed mb-8 font-medium"
        style={contrastTextStyles.primary}
      >
        {hasText ? (
          <RichTextEditor editable={false} content={post.content} />
        ) : (
          'No content available'
        )}
      </div>
      <div className="text-lg" style={contrastTextStyles.muted}>
        - {creatorName}
      </div>
    </div>
  );
}

interface ScatteredImagesProps {
  images: string[];
}

const SCATTERED_POSITIONS = [
  { top: '10%', left: '15%', size: 'w-48 h-48' },
  { top: '20%', right: '10%', size: 'w-40 h-40' },
  { bottom: '25%', left: '20%', size: 'w-44 h-44' },
  { bottom: '15%', right: '15%', size: 'w-52 h-52' },
  { top: '50%', left: '5%', size: 'w-36 h-36' },
  { top: '60%', right: '5%', size: 'w-40 h-40' },
];

function ScatteredImages({ images }: ScatteredImagesProps) {
  return (
    <>
      {images.slice(0, 6).map((image, index) => {
        const position =
          SCATTERED_POSITIONS[index % SCATTERED_POSITIONS.length];
        return (
          <div
            key={index}
            className={cn(
              'absolute object-cover rounded-lg shadow-lg',
              position.size
            )}
            style={{
              top: position.top,
              left: position.left,
              right: position.right,
              bottom: position.bottom,
            }}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover rounded-lg"
            />
          </div>
        );
      })}
    </>
  );
}

interface VideoSlideProps {
  videoUrl: string;
  textContent: string;
  creatorName: string;
  contrastTextStyles: {
    primary: { color: string };
    secondary: { color: string };
    muted: { color: string };
    accent: { color: string };
  };
}

function VideoSlide({
  videoUrl,
  textContent,
  creatorName,
  contrastTextStyles,
}: VideoSlideProps) {
  const [isLandscape, setIsLandscape] = useState(true);

  const handleVideoLoad = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    setIsLandscape(video.videoWidth >= video.videoHeight);
  };

  if (isLandscape) {
    return (
      <div className="w-full h-full flex flex-col animate-in fade-in duration-500">
        <div className="flex-1 flex items-center justify-center">
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
            onLoadedMetadata={handleVideoLoad}
          />
        </div>
        {textContent && (
          <div className="p-8 text-center">
            <div
              className="text-xl md:text-2xl leading-relaxed mb-4 font-medium"
              style={contrastTextStyles.primary}
            >
              <RichTextEditor editable={false} content={textContent} />
            </div>
            <div className="text-lg" style={contrastTextStyles.muted}>
              - {creatorName}
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex animate-in fade-in duration-500">
        <div className="flex-1 flex items-center justify-center">
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            className="max-w-full max-h-full object-contain rounded-lg shadow-xl"
            onLoadedMetadata={handleVideoLoad}
          />
        </div>
        {textContent && (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <div
                className="text-xl md:text-2xl leading-relaxed mb-4 font-medium"
                style={contrastTextStyles.primary}
              >
                <RichTextEditor editable={false} content={textContent} />
              </div>
              <div className="text-lg" style={contrastTextStyles.muted}>
                - {creatorName}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
