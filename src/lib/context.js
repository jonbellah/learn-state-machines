import { createContext } from 'react';

const { Provider, Consumer } = createContext({
  logout: () => {},
  user: {
    email: 'hello@jonbellah.com',
  },
});

export { Provider, Consumer };
