import ReCAPTCHA from 'react-google-recaptcha';
import { useRef } from 'react';

interface CaptchaProps {
  onVerified: (valid: boolean) => void;
}

export function Captcha({ onVerified }: CaptchaProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (token: string | null) => {
    if (token) {
      onVerified(true);
    } else {
      onVerified(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded p-4 bg-gray-50">
      <p className="mb-2 text-sm text-gray-600">Verifica que no eres un robot:</p>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6Ld-qSgrAAAAAKJBgoRh93tejrGuu3pmeuEczuZj" // Clave de prueba pública de Google
        onChange={handleChange}
      />
    </div>
  );
}
