import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-regular-svg-icons';
import styles from './Navbar.module.css';

function Navbar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const getTheme = () => {
    const storedTheme = localStorage.getItem('darkTheme');
    setIsDarkTheme(storedTheme ? JSON.parse(storedTheme) : false);
  };

  const setTheme = (theme: boolean) => {
    localStorage.setItem('darkTheme', JSON.stringify(theme));
  };

  useEffect(() => {
    window.addEventListener('load', getTheme);
    () => window.addEventListener('load', getTheme);
  }, []);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark_theme');
    } else {
      document.body.classList.remove('dark_theme');
    }
  }, [isDarkTheme]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_wrapper}>
        <h1>Where in the world?</h1>
        <div
          className={styles.theme_wrapper}
          onClick={() => {
            setTheme(!isDarkTheme);
            setIsDarkTheme(!isDarkTheme);
          }}
        >
          {isDarkTheme ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
          <p>{isDarkTheme ? 'Light Mode' : 'Dark Mode'}</p>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
