'use client';
import { useEffect } from 'react';
import AppShell from '@/components/core/FullscreenAppShell';
import { init } from '@/utils/init';

export default function Page() {
  useEffect(() => {
    init();
  }, []);

  return (
    <AppShell />
  );
}
