# OctoFit Tracker Frontend

The React 19 presentation tier reads data from the OctoFit API.

## API environment

For a GitHub Codespace, define `VITE_CODESPACE_NAME` in `.env.local`. Copy `.env.example` and replace its value with the Codespace name. Production builds call `https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/`.

During Vite development, requests use `/api` and Vite proxies them to `http://127.0.0.1:8000`. This avoids the Codespaces port-authentication redirect and browser CORS checks. When `VITE_CODESPACE_NAME` is not defined, production builds safely use `http://localhost:8000/api/`.

## Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
