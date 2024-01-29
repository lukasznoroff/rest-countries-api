import  { useState } from 'react';
import { Link } from 'react-router-dom';
import useCountries from '../../hooks/useCountries';
import Filters from '../../components/Filters/Filters';
import { CountryProps } from '../../interfaces/CountryProps';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const { countries, isLoading, isError, error, isFetching, invalidateCountriesQuery } =
    useCountries();

  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (isLoading && !isFetching) {
    return <div className={styles.isloading}>Loading...</div>;
  }
 

  if (isError) {
    const queryError = error as Error;
    return <div className={styles.iserror}>{queryError.message}</div>;
  }

  const handleRegionChange = (newRegion: string | null) => {
    setRegionFilter(newRegion);
    if (newRegion) {
      invalidateCountriesQuery();
    }
  };

  const handleSearch = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
    if (newSearchQuery) {
      invalidateCountriesQuery();
    }
  };

  const filteredCountries = countries
    ?.filter((country: CountryProps) => (regionFilter ? country.region === regionFilter : true))
    .filter((country: CountryProps) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className={styles.container}>
      <Filters
        regionFilter={regionFilter}
        searchQuery={searchQuery}
        handleRegionChange={handleRegionChange}
        handleSearch={handleSearch}
      />

      <div className={styles.flags_wrapper}>
        {filteredCountries?.map((country: CountryProps) => (
          <Link className={styles.link_wrapper} key={country.alpha3Code}  to={`/country/${country.alpha3Code}`}>
            <div className={styles.flag_card} key={country.alpha3Code}>
              <div className={styles.flag_image_wrapper}>
                <img src={country.flag} alt="country image" />
              </div>
              <div className={styles.country_info}>
                <p className={styles.country_name}>{country.name}</p>
                <p>
                  <span>Population:</span> {country.population}
                </p>
                <p>
                  <span>Region:</span> {country.region}
                </p>
                <p>
                  <span>Capital:</span> {country.capital}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
