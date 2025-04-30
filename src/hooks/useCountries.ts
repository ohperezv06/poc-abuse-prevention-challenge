import { useState, useEffect } from 'react';
import { Country } from '../types/country';

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/meli-countries');
        if (!res.ok) throw new Error('Error al cargar países');

        const data: Country[] = await res.json();
        setCountries(data);
      } catch (error) {
        console.error('Error cargando países:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return { countries, loading };
}
