import axios from 'axios';

const countriesApi = 'https://restcountries.com/v2/name/';

export const fetchCountries = async (name: string) => {
  try {
    const response = await axios.get(`${countriesApi}${name}`);
    const data = response.data.map((res: { name: string }) => res.name)
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};
