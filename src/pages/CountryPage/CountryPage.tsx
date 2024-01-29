import { Link, useParams } from 'react-router-dom';
import useCountries from '../../hooks/useCountries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { CountryProps } from '../../interfaces/CountryProps';

import styles from './CountryPage.module.css';

const CountryPage = () => {
  const { countryCode } = useParams();
  const { countries, isLoading, error } = useCountries();

  if (isLoading) {
    return <div className={styles.isloading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.iserror}>Error loading data</div>;
  }

  const selectedCountry = countries?.find(
    (country: CountryProps) => country.alpha3Code === countryCode
  );

  return (
    <div className={styles.container}>
      <div className={styles.btn_wrapper}>
        <div className={styles.btn}>
          <Link className={styles.btn_link} to="/">
            <FontAwesomeIcon fontSize={'18px'} icon={faArrowLeftLong} />
            Back
          </Link>
        </div>
      </div>
      <div className={styles.grid_wrapper}>
        <div className={styles.grid_cell_1}>
          <div className={styles.image_wrapper}>
            <img src={selectedCountry?.flag} alt="country image" />
          </div>
        </div>
        <div className={styles.grid_cell_2}>
          <div>
            <h2>{selectedCountry?.name}</h2>
            <p>
              <span className={styles.country_info}>Capital:</span> {selectedCountry?.nativeName}
            </p>
            <p>
              <span className={styles.country_info}>Population:</span> {selectedCountry?.population}
            </p>
            <p>
              <span className={styles.country_info}>Region:</span> {selectedCountry?.region}
            </p>
            <p>
              <span className={styles.country_info}>Subregion:</span> {selectedCountry?.subregion}
            </p>
            <p>
              <span className={styles.country_info}>Capital:</span> {selectedCountry?.capital}
            </p>
          </div>
          <div className={styles.col_right}>
            <p>
              <span className={styles.country_info}>Top Level Domain: </span>
              {selectedCountry?.topLevelDomain}
            </p>

            <p>
              <span className={styles.country_info}> Currencies:</span>
              {selectedCountry?.currencies.map((currency: CountryProps) => currency.name)}
            </p>

            <p>
              <span className={styles.country_info}> Languages: </span>
              {selectedCountry?.languages.map((language: CountryProps) => language.name)}
            </p>
          </div>
        </div>
        <div className={styles.grid_cell_3}>
          {selectedCountry?.borders?.length > 0 && (
            <div className={styles.country_borders}>
              <p>
                <span className={styles.country_border}>Border Countries: </span>
              </p>
              {selectedCountry.borders.map((borderName: string, index: number) => (
                <div className={styles.border_name} key={index}>
                  {borderName}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
