
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';

    if (!isAuthenticated) {
      // Redirect to the passcode entry page
      router.push('/admin');
    }
  }, [router]);
}
