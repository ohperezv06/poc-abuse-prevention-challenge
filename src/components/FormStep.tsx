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

  useEffect(() => {
    if (!referrer.startsWith('/') || !token) {
      console.warn('Parámetros inválidos en la URL');
      setIsValidParams(false);
    }
  }, [referrer, token]);

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

  if (!isValidParams) {
    return (
      <div className="text-center text-red-600 mt-10">
        <p>Error: La URL no contiene los parámetros necesarios.</p>
        <p>Por favor, accede desde un flujo válido.</p>
      </div>
    );
  }

  if (loading) {
    return <p className="text-center mt-10">{t.loading}</p>;
  }

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">{t.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">{t.name}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">{t.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">País</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="min-h-[100px] flex items-center justify-center">
            {showCaptcha && (
              <Captcha onVerified={(valid) => setCaptchaVerified(valid)} />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!isFormComplete()}
          >
            {t.confirm}
          </button>
        </form>
      </div>
    </main>
  );
}
