'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  user: {
    name: string;
    avatarUrl?: string | null;
  };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-12 h-12 text-base',
};

export function UserAvatar({ user, size = 'md', className }: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGradientClass = (name: string) => {
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-teal-500',
      'bg-red-500',
    ];

    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
      <AvatarFallback
        className={cn(
          'text-white font-semibold',
          getGradientClass(user.name)
        )}
      >
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
}
