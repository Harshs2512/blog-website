'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Rocket, RefreshCw } from './icons';

interface SubmitButtonProps {
  label: string;
  pendingLabel?: string;
  className?: string;
}

export function SubmitButton({
  label,
  pendingLabel = 'Saving...',
  className = 'btn btn-primary',
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? (
        <>
          <RefreshCw size={16} className="spin-animation" />
          <span>{pendingLabel}</span>
        </>
      ) : (
        <>
          <Rocket size={16} />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
