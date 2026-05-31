import { useEffect, useState } from 'react';
import { fetchHealth } from '@/services/api/runway';
import type { HealthStatus } from '@/types/detection';

export function useHealth() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    let active = true;

    const check = async () => {
      try {
        const data = await fetchHealth();
        if (active) {
          setHealth(data);
          setOnline(data.status === 'ok');
        }
      } catch {
        if (active) {
          setHealth(null);
          setOnline(false);
        }
      }
    };

    check();
    const id = setInterval(check, 30000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return { health, online };
}
