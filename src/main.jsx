import { StrictMode, useContext, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';

function BodyClassSetter({children}) {
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(theme + "-theme");
  }, [theme]);

  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BodyClassSetter>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BodyClassSetter>
    </ThemeProvider>
  </StrictMode>,
)
