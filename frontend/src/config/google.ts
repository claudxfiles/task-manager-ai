export const GOOGLE_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
  scope: 'https://www.googleapis.com/auth/calendar',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
};

export const CALENDAR_EVENTS = {
  sync: {
    title: 'Sincronizar con Google Calendar',
    description: 'Conecta tu cuenta de Google Calendar para sincronizar tus eventos'
  },
  disconnect: {
    title: 'Desconectar Google Calendar',
    description: 'Desconecta tu cuenta de Google Calendar'
  }
}; 