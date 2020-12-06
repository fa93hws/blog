import { BrowserRouter, HashRouter } from 'react-router-dom';

export const Router: React.ComponentType =
  process.env.USE_HASH_ROUTE === 'true' ? HashRouter : BrowserRouter;
