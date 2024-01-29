import { useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const fetchCountries = async () => {
  const response = await axios.get('https://restcountries.com/v2/all');
  return response.data;
};

const useCountries = () => {
  const queryClient = useQueryClient();

  const {
    data: countries,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery('countries', fetchCountries, {
    staleTime: 30000,
  });

  const invalidateCountriesQuery = () => {
    queryClient.invalidateQueries('countries');
  };

  return {
    countries,
    isLoading,
    isError,
    error,
    isFetching,
    invalidateCountriesQuery,
  };
};

export default useCountries;
