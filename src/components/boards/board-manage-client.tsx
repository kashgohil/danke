'use client';

import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  variant?: 'outline' | 'default';
  className?: string;
}

export function CopyButton({
  text,
  variant = 'outline',
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button
      variant={variant}
      size="sm"
      className={className}
      onClick={handleCopy}
    >
      <Copy className="w-4 h-4" />
      {copied && <span className="ml-1 text-xs">Copied!</span>}
    </Button>
  );
}
