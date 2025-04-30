# Arquitectura de la Solución - Technical Challenge (Abuse Prevention)

Este documento describe la propuesta de arquitectura implementada para resolver la prueba técnica solicitada, correspondiente a la integración de un nuevo paso antifraude dentro del flujo de pago.

---

## 🌐 Estructura General

La solución se divide en dos capas principales:

1. **Frontend (React 18 + Vite + Tailwind)**

   - Formulario con validación, carga de datos precargados y Google reCAPTCHA
   - Diseño responsive
   - Redirección controlada con token y referrer desde la URL
   - Fallback `<noscript>` con redirección al SSR

2. **Backend (Express + Node.js + EJS)**

   - API REST simulada con mocks (`/api/meli-users`, `/api/meli-countries`)
   - Renderizado del formulario SSR desde `/ssr-form` usando EJS
   - Redirección manual desde el backend para usuarios sin JS

---

## 📊 Componentes Clave del Frontend

### `FormStep.tsx`

- Componente principal del formulario antifraude
- Precarga datos desde la API REST
- Muestra captcha solo si los datos están completos
- Botón deshabilitado hasta que todos los campos estén validados

### Hooks personalizados

- `useUserData`: carga datos del usuario desde `/api/meli-users`
- `useCountries`: carga lista de países desde `/api/meli-countries`

### Tipos e interfaces centralizadas

- En `src/types`: `UserData`, `Country`, `FormData`
- En `server/types`: mismas estructuras para los mocks y EJS

---

## 🚀 APIs y Backend Express

- `/api/meli-users` y `/api/meli-countries` retornan datos simulados desde archivos JSON
- Endpoints separados en `routes/users.ts` y `routes/countries.ts`
- Tipado estricto con TypeScript

### SSR desde Express

- Ruta `GET /ssr-form`: renderiza plantilla EJS (`views/form.ejs`)
- Ruta `POST /ssr-form`: redirige al `referrer?token=...`

---

## ⚖️ Mecanismo SSR / NoScript

- En `index.html` hay un bloque `<noscript>` que redirige al SSR si JS está desactivado
- El formulario SSR renderiza con los mismos datos precargados
- Se puede enviar sin JS y redirige correctamente

---

## 🔧 Tecnologías Seleccionadas

| Herramienta         | Versión usada | Uso principal                      |
| ------------------- | ------------- | ---------------------------------- |
| React               | 18            | SPA frontend                       |
| Vite                | latest        | Bundler moderno + dev server       |
| TailwindCSS         | 3.4           | Estilos responsive y utilitarios   |
| TypeScript          | 5.7           | Tipado estático completo           |
| Express             | 5.1           | Backend ligero + SSR               |
| EJS                 | 3.1           | Renderizado HTML server-side       |
| Google reCAPTCHA v2 | -             | Validación anti-bots (solo en SPA) |

---

## 🔐 Seguridad y validación

- Validación completa de campos antes del submit
- Deshabilitación del botón hasta que reCAPTCHA esté resuelto
- Token y referrer extraídos de la URL

---

## 📊 Escalabilidad

- Separación de tipos para crecimiento futuro
- Componentes modulares y reutilizables
- SSR desacoplado con fallback garantizado
- Preparado para integrarse como paso dentro de flujo de pago existente

---

## 🙏 Comentarios finales

Esta arquitectura fue diseñada buscando:

- Performance (Vite + SSR opcional)
- Seguridad (Captcha, validaciones)
- Escalabilidad (modularidad, tipado)
- Accesibilidad (soporte sin JS)

