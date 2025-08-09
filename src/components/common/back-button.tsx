import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface Props {
  label?: string;
  link?: string;
}

export function BackButton(props: Props) {
  const { label = 'Back to Dashboard', link = '/dashboard' } = props;
  return (
    <div className="mb-6">
      <Link href={link}>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-danke-900"
        >
          <ArrowLeft className="w-4 h-4" />
          {label}
        </Button>
      </Link>
    </div>
  );
}
