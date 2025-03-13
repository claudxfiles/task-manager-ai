"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface GoogleEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

export function useGoogleCalendar() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<GoogleEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    if (!session?.accessToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener eventos');
      }

      const data = await response.json();
      setEvents(data.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.accessToken) {
      fetchEvents();
    }
  }, [session?.accessToken]);

  const addEvent = async (event: Omit<GoogleEvent, 'id'>) => {
    if (!session?.accessToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }
      );

      if (!response.ok) {
        throw new Error('Error al crear evento');
      }

      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    events,
    isLoading,
    error,
    fetchEvents,
    addEvent,
  };
} 