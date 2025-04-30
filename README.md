# Technical Challenge (Abuse Prevention)

Este repositorio contiene la resolución de la prueba técnica front-end, enfocada en la construcción de un nuevo paso antifraude en el flujo de pago.

---

## 📄 Tecnologías y herramientas utilizadas

### Frontend

- **React 18** (with Vite)
- **TypeScript**
- **TailwindCSS v3.4**
- **Google reCAPTCHA v2**

### Backend

- **Node.js 22.14**
- **Express**
- **EJS** (para SSR)

### Utilidades

- `ts-node`, `nodemon`, `@types/*`
- Separación clara de tipos en `src/types` y `server/types`
- SSR con soporte para `noscript`

---

## 📊 Estructura del proyecto

```
/
├── src/                    # Aplicación React
│   ├── components/         # Formulario principal (FormStep)
│   ├── hooks/              # Hooks de datos
│   ├── types/              # Tipos compartidos (UserData, Country, FormData)
│   ├── utils/              # Archivo de idioma i18n
│   └── ...
├── server/                # Servidor Express
│   ├── routes/             # Endpoints API REST (usuarios, países)
│   ├── views/              # Plantilla EJS para SSR
│   ├── data/               # Mock JSONs de usuarios y países
│   └── types/              # Tipos de datos para el backend
├── index.html             # HTML base para React con <noscript>
├── tsconfig.server.json   # Configuración TypeScript para el servidor
└── ...
```

---

## 🚀 Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/ohperezv06/poc-abuse-prevention-challenge.git
cd poc-abuse-prevention-challenge
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el frontend

```bash
npm run dev
# App disponible en: http://localhost:5173
```

### 4. Ejecutar el servidor Express (SSR + APIs)

```bash
npm run dev:server
# Servidor en: http://localhost:3000
```

---

## 🎓 Cómo probar el flujo completo (usuario con JavaScript)

1. Asegúrese de que los dos servidores estén corriendo:

   - Frontend en `http://localhost:5173`
   - Backend en `http://localhost:3000`

2. Ir a:

   ```
   http://localhost:5173/?referrer=/checkout&token=abc123
   ```

3. Se cargará el formulario con los datos del usuario precargados desde `/api/meli-users`

4. Si los datos están completos, el captcha aparecerá automáticamente. Completarlo.

5. Una vez el captcha esté verificado, el botón de confirmar y continuar se habilita.

6. Al hacer submit, se redirige a:

   ```
   /checkout?token=abc123
   ```

---

## 🔐 Cómo probar el flujo SSR (usuario sin JavaScript)

1. Desactivar JavaScript en el navegador (DevTools > Settings > Disable JavaScript)

2. Ir a:

   ```
   http://localhost:5173/?referrer=/checkout&token=abc123
   ```

3. El navegador redirigirá automáticamente a:

   ```
   http://localhost:3000/ssr-form?referrer=/checkout&token=abc123
   ```

4. Se mostrará el formulario SSR renderizado desde Express (EJS) con los datos precargados.

5. Al enviar el formulario, el servidor redirige a:

   ```
   /checkout?token=abc123
   ```

---

## 💼 Consideraciones adicionales

- Validación de campos: todos los campos son obligatorios y se valida el captcha antes de enviar
- Captcha real con Google reCAPTCHA v2 (invisible en SSR)
- Diseño responsive implementado con Tailwind (puede ajustarse según feedback)
- Todos los tipos están centralizados para escalabilidad y seguridad de tipo
- El SSR es funcional y cumple con el fallback de `<noscript>`
- El detalle técnico se encuentra en el archivo architecture.md

---

## 📅 Autor y contacto

Desarrollado por: Oscar Hernán Pérez

Correo: [perezvillalobos@gmail.com](mailto\:perezvillalobos@gmail.com)
