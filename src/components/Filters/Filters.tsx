import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Filters.module.css';

interface FiltersProps {
  regionFilter: string | null;
  searchQuery: string;
  handleRegionChange: (newRegion: string | null) => void;
  handleSearch: (newSearchQuery: string) => void;
}

const Filters = ({ regionFilter, searchQuery, handleRegionChange, handleSearch }: FiltersProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownChange = (newRegion: string | null) => {
    handleRegionChange(newRegion);
    setDropdownOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.input_wrapper}>
        <FontAwesomeIcon icon={faSearch} className={styles.icon} />
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className={styles.select_wrapper}>
        <div className={styles.selected_option} onClick={() => setDropdownOpen(!isDropdownOpen)}>
          {regionFilter || 'Filter by Region'}
          <FontAwesomeIcon icon={faAngleDown} className={styles.icon} />
        </div>
        {isDropdownOpen && (
          <ul className={styles.options}>
            <li onClick={() => handleDropdownChange('')}>All</li>
            <li onClick={() => handleDropdownChange('Africa')}>Africa</li>
            <li onClick={() => handleDropdownChange('Americas')}>Americas</li>
            <li onClick={() => handleDropdownChange('Asia')}>Asia</li>
            <li onClick={() => handleDropdownChange('Europe')}>Europe</li>
            <li onClick={() => handleDropdownChange('Oceania')}>Oceania</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filters;
