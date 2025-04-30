import { useEffect, useState } from 'react';
import { useUserData } from '../hooks/useUserData';
import { useCountries } from '../hooks/useCountries';
import { getTranslations } from '../utils/i18n';
import { useSearchParams } from 'react-router-dom';
import { Captcha } from './Captcha';
import { FormData } from '../types/form';

export function FormStep() {
  const t = getTranslations();
  const { userData, loading } = useUserData();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
    country: '',
    captchaVerified: false,
  });

  const { countries, loading: loadingCountries } = useCountries();
  const [searchParams] = useSearchParams();
  const referrer = searchParams.get('referrer') || '/';
  const token = searchParams.get('token') || '';
  const [isValidParams, setIsValidParams] = useState(true);

  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Validar referrer y token al cargar
  useEffect(() => {
    if (!referrer.startsWith('/') || !token) {
      console.warn('Parámetros inválidos en la URL');
      setIsValidParams(false);
    }
  }, [referrer, token]);

  // Precargar datos del usuario
  useEffect(() => {
    if (userData) {
      setFormData(userData);
  
      const { name, email, address, country } = userData;
  
      if (name && email && address && country) {
        setShowCaptcha(true);
      }
    }
  }, [userData]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Activar captcha si aún no se mostró
    if (!showCaptcha) {
      setShowCaptcha(true);
    }
  };

  const isFormComplete = (): boolean => {
    const { name, email, address, country } = formData;
    return !!(name && email && address && country && captchaVerified);
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!isFormComplete()) return;
  
    console.log('Formulario confirmado:', formData);
  
    const redirectUrl = `${referrer}?token=${encodeURIComponent(token)}`;
    window.location.href = redirectUrl;
  };  

  // Si los parámetros son inválidos
  if (!isValidParams) {
    return (
      <div className="text-center text-red-600 mt-10">
        <p>Error: La URL no contiene los parámetros necesarios.</p>
        <p>Por favor, accede desde un flujo válido.</p>
      </div>
    );
  }

  // Si aún se están cargando los datos
  if (loading) {
    return <p className="text-center mt-10">{t.loading}</p>;
  }

  // Formulario principal
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">{t.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">{t.name}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">{t.email}</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">País</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={loadingCountries}
          >
            <option value="">Selecciona un país</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">{t.address}</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Captcha lazy loaded */}
        {showCaptcha && (
          <Captcha onVerified={(valid) => setCaptchaVerified(valid)} />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!isFormComplete()}
        >
          {t.confirm}
        </button>
      </form>
    </div>
  );
}
