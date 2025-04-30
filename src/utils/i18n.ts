type Language = 'es' | 'pt';

interface Translations {
  [key: string]: Record<string, string>;
}

const translations: Translations = {
  es: {
    title: 'Verifica tus datos',
    name: 'Nombre',
    email: 'Correo',
    address: 'Dirección',
    confirm: 'Confirmar y Continuar',
    loading: 'Cargando datos del usuario...',
  },
  pt: {
    title: 'Verifique seus dados',
    name: 'Nome',
    email: 'Email',
    address: 'Endereço',
    confirm: 'Confirmar e Continuar',
    loading: 'Carregando dados do usuário...',
  },
};

export function detectLanguage(): Language {
  // const hostname = window.location.hostname;
  const hostname = "www.mercadolivre.com.br";
  if (hostname.includes('mercadolivre.com.br')) return 'pt';
  return 'es';
}

export function getTranslations() {
  const lang = detectLanguage();
  return translations[lang];
}
