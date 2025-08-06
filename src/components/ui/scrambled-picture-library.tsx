'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ScrambledPictureLibraryProps {
  className?: string;
}

interface PictureData {
  src: string;
  alt: string;
  id: string;
}

const pictures: PictureData[] = [
  { src: '/board-0.png', alt: 'Board Example 1', id: 'board-0' },
  { src: '/board-1.png', alt: 'Board Example 2', id: 'board-1' },
  { src: '/board-2.png', alt: 'Board Example 3', id: 'board-2' },
];

export function ScrambledPictureLibrary({
  className,
}: ScrambledPictureLibraryProps) {
  return (
    <div
      className={cn('relative w-full h-[50vh] group cursor-pointer', className)}
    >
      {pictures.map((picture, index) => (
        <div
          key={picture.id}
          className={cn(
            'absolute w-full h-full rounded-xl shadow-xl transition-all ease-out',
            'border-4 border-danke-gold',
            index === 0 && 'top-2 left-2 rotate-[-8deg] z-10',
            index === 1 && 'top-4 left-4 rotate-[3deg] z-20',
            index === 2 && 'top-6 left-0 rotate-[-2deg] z-30',
            'group-hover:shadow-2xl group-hover:scale-105',

            index === 2 &&
              'group-hover:top-[0px] group-hover:left-[80px] group-hover:rotate-[8deg] group-hover:z-30 duration-300 group-hover:delay-[100ms]',
            index === 1 &&
              'group-hover:top-[-5px] group-hover:left-[20px] group-hover:rotate-[1deg] group-hover:z-20 duration-300 group-hover:delay-[100ms]',
            index === 0 &&
              'group-hover:top-[-10px] group-hover:left-[-40px] group-hover:rotate-[-12deg] group-hover:z-10 duration-300 group-hover:delay-[100ms]'
          )}
        >
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Image
              src={picture.src}
              alt={picture.alt}
              fill
              unoptimized
              quality={100}
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 300px"
            />
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                index === 2 && 'group-hover:delay-[100ms]',
                index === 1 && 'group-hover:delay-[100ms]',
                index === 0 && 'group-hover:delay-[100ms]'
              )}
            />
          </div>
        </div>
      ))}

      <div className="absolute inset-0 bg-danke-300/20 dark:bg-danke-gold/20 rounded-xl blur-xl scale-110 opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
    </div>
  );
}
