# Visor de Personajes Star Wars

Aplicación frontend desarrollada con Angular y TypeScript que permite visualizar personajes de Star Wars y sus vehículos asociados, consumiendo la API pública de [SWAPI](https://swapi.dev/api/).

## 🎯 Características

- Visualización de información básica de personajes de Star Wars
- Visualización de vehículos asociados a cada personaje
- Búsqueda de personajes por ID
- Interfaz responsive y moderna
- Arquitectura limpia con separación de responsabilidades
- Cobertura de pruebas superior al 70%
- Pruebas de aceptación end-to-end

## 🏗️ Arquitectura

El proyecto sigue los principios de **Arquitectura Limpia** y **SOLID**, organizado en las siguientes capas:

```
src/
├── domain/              # Capa de Dominio
│   ├── entities/        # Entidades del negocio
│   └── repositories/    # Interfaces de repositorios
├── application/         # Capa de Aplicación
│   └── use-cases/       # Casos de uso
├── infrastructure/      # Capa de Infraestructura
│   ├── api/            # Cliente HTTP
│   └── repositories/   # Implementación de repositorios
└── presentation/        # Capa de Presentación
    ├── components/     # Componentes Angular
    ├── pages/          # Páginas
    ├── services/       # Servicios Angular
    └── app/            # Módulo principal
```

### Principios SOLID Aplicados

- **Single Responsibility**: Cada clase/componente tiene una única responsabilidad
- **Open/Closed**: Extensible mediante interfaces, cerrado para modificación
- **Liskov Substitution**: Las implementaciones cumplen los contratos de las interfaces
- **Interface Segregation**: Interfaces específicas y cohesivas
- **Dependency Inversion**: Dependencias hacia abstracciones, no implementaciones

## 🚀 Instalación

### Requisitos Previos

- Node.js 18.x o superior
- npm 9.x o superior

### Pasos de Instalación

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd star-wars-character-viewer
```

2. Instalar dependencias:
```bash
npm install
```

## 💻 Uso

### Desarrollo

Ejecutar el servidor de desarrollo:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### Construcción

Generar la versión de producción:
```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`

### Vista Previa de Producción

Previsualizar la versión de producción:
```bash
npm run preview
```

## 🧪 Pruebas

### Pruebas Unitarias

Ejecutar todas las pruebas unitarias:
```bash
npm run test
```

Ejecutar pruebas con cobertura:
```bash
npm run test:coverage
```

Abrir interfaz de pruebas:
```bash
npm run test:ui
```

### Pruebas de Aceptación (E2E)

Ejecutar pruebas E2E en modo headless:
```bash
npm run test:e2e
```

Abrir Cypress en modo interactivo:
```bash
npm run test:e2e:open
```

**Nota**: Asegúrate de tener la aplicación corriendo (`npm start`) antes de ejecutar las pruebas E2E.

## 📊 Cobertura de Pruebas

El proyecto mantiene una cobertura de código superior al 70% en todas las métricas:

- **Líneas**: ≥ 70%
- **Funciones**: ≥ 70%
- **Ramas**: ≥ 70%
- **Declaraciones**: ≥ 70%

Los reportes de cobertura se generan en la carpeta `coverage/` después de ejecutar `npm run test:coverage`.

## 🔍 Linting

Ejecutar el linter:
```bash
npm run lint
```

Corregir automáticamente problemas de linting:
```bash
npm run lint:fix
```

## 📁 Estructura del Proyecto

```
.
├── src/
│   ├── domain/                    # Capa de dominio
│   │   ├── entities/              # Entidades
│   │   └── repositories/          # Interfaces de repositorios
│   ├── application/               # Capa de aplicación
│   │   └── use-cases/             # Casos de uso
│   ├── infrastructure/            # Capa de infraestructura
│   │   ├── api/                   # Cliente API
│   │   └── repositories/          # Implementación de repositorios
│   ├── presentation/              # Capa de presentación
│   │   ├── components/            # Componentes React
│   │   ├── pages/                 # Páginas
│   │   └── hooks/                 # Hooks personalizados
│   ├── test/                      # Configuración de pruebas
│   ├── main.tsx                   # Punto de entrada
│   └── index.css                  # Estilos globales
├── cypress/                       # Pruebas E2E
│   ├── e2e/                       # Especificaciones E2E
│   ├── fixtures/                  # Datos de prueba
│   └── support/                   # Comandos personalizados
├── .github/                       # GitHub Actions
│   └── workflows/                 # Pipelines CI/CD
├── PLAN_DE_PRUEBAS.md            # Plan de pruebas detallado
└── README.md                      # Este archivo
```

## 🔄 CI/CD

El proyecto incluye pipelines de CI/CD configurados con GitHub Actions:

- **Tests**: Ejecuta pruebas unitarias y valida cobertura
- **E2E**: Ejecuta pruebas end-to-end
- **Build**: Construye la aplicación para producción

Los pipelines se ejecutan automáticamente en:
- Push a ramas `main` o `develop`
- Pull requests a ramas `main` o `develop`

## 📝 Plan de Pruebas

Para más detalles sobre la estrategia de pruebas, casos de prueba y criterios de aceptación, consulta el archivo [PLAN_DE_PRUEBAS.md](./PLAN_DE_PRUEBAS.md).

## 🛠️ Tecnologías Utilizadas

- **Angular 17**: Framework de UI
- **TypeScript**: Tipado estático
- **Angular CLI**: Build tool y dev server
- **Jasmine & Karma**: Framework de pruebas unitarias
- **Cypress**: Pruebas end-to-end
- **Axios**: Cliente HTTP
- **ESLint**: Linter de código
- **RxJS**: Programación reactiva

## 📄 Licencia

Este proyecto es parte de una prueba técnica y está disponible para fines educativos.

## 👤 Autor

Desarrollado como parte de una prueba técnica para Ingeniero de Software.

## 🤝 Contribuciones

Este es un proyecto de prueba técnica. Las contribuciones no son esperadas, pero cualquier feedback es bienvenido.

---

**Nota**: Esta aplicación consume la API pública de SWAPI. Asegúrate de tener conexión a internet para que funcione correctamente.

