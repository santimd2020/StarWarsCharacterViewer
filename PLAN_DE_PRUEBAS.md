# Plan de Pruebas - Star Wars Character Viewer

## 1. Introducción

Este documento describe el plan de pruebas para la aplicación Star Wars Character Viewer, que permite visualizar personajes de Star Wars y sus vehículos asociados consumiendo la API pública de SWAPI (https://swapi.dev/api/).

## 2. Objetivo

Garantizar la calidad del desarrollo mediante la implementación de pruebas exhaustivas que cubran:
- Funcionalidad del frontend
- Integración con la API externa
- Rendimiento y usabilidad
- Cobertura de código mínima del 70%

## 3. Alcance

### 3.1. Incluido
- Pruebas unitarias de componentes React
- Pruebas unitarias de casos de uso
- Pruebas unitarias de repositorios e infraestructura
- Pruebas de integración con la API
- Pruebas de aceptación end-to-end (E2E)
- Pruebas de UI/UX
- Validación de arquitectura limpia y principios SOLID

### 3.2. Excluido
- Pruebas de carga y estrés (fuera del alcance inicial)
- Pruebas de seguridad avanzadas (no aplicable para API pública)
- Pruebas de accesibilidad automatizadas (se valida manualmente)

## 4. Estrategia de Pruebas

### 4.1. Pirámide de Pruebas

```
        /\
       /E2E\          ← Pruebas de Aceptación (Cypress)
      /------\
     /Integración\    ← Pruebas de Integración
    /------------\
   /  Unitarias   \   ← Pruebas Unitarias (Vitest)
  /----------------\
```

### 4.2. Niveles de Prueba

#### 4.2.1. Pruebas Unitarias (70% del esfuerzo)
- **Herramienta**: Vitest + React Testing Library
- **Cobertura objetivo**: Mínimo 70%
- **Alcance**:
  - Entidades del dominio
  - Casos de uso
  - Repositorios
  - Cliente API
  - Componentes React
  - Hooks personalizados

#### 4.2.2. Pruebas de Integración (20% del esfuerzo)
- **Herramienta**: Vitest + Mocks
- **Alcance**:
  - Integración entre capas (Domain → Application → Infrastructure)
  - Flujo completo de datos desde API hasta UI
  - Manejo de errores entre capas

#### 4.2.3. Pruebas de Aceptación E2E (10% del esfuerzo)
- **Herramienta**: Cypress
- **Alcance**:
  - Flujos completos de usuario
  - Integración real con API externa
  - Validación de UI/UX
  - Pruebas de regresión

## 5. Casos de Prueba Detallados

### 5.1. Pruebas Unitarias

#### 5.1.1. Capa de Dominio
- ✅ Validar estructura de entidades (Character, Vehicle)
- ✅ Validar interfaces de repositorios
- ✅ Validar tipos y contratos

#### 5.1.2. Capa de Aplicación
- ✅ Caso de uso: GetCharacterWithVehiclesUseCase
  - Ejecución exitosa
  - Manejo de errores
  - Validación de parámetros

#### 5.1.3. Capa de Infraestructura
- ✅ SwapiClient
  - Obtener personaje por ID
  - Obtener vehículo por URL
  - Obtener múltiples vehículos
  - Manejo de errores de red
  - Timeouts

- ✅ CharacterRepositoryImpl
  - Obtener personaje con vehículos
  - Manejo de personajes sin vehículos
  - Propagación de errores

#### 5.1.4. Capa de Presentación
- ✅ Componentes React
  - CharacterCard: renderizado, props, información
  - VehicleCard: renderizado, props, información
  - LoadingSpinner: estados
  - ErrorMessage: mensajes, botón de reintentar

- ✅ Hooks
  - useCharacter: carga, errores, refetch

### 5.2. Pruebas de Integración

#### 5.2.1. Flujo Completo de Datos
- ✅ API → Repository → UseCase → Hook → Component
- ✅ Manejo de errores en cascada
- ✅ Transformación de datos entre capas

### 5.3. Pruebas de Aceptación E2E

#### 5.3.1. Visualización de Personaje
- ✅ Mostrar título de la aplicación
- ✅ Mostrar campo de búsqueda
- ✅ Cargar personaje por defecto (ID 1)
- ✅ Mostrar información básica del personaje

#### 5.3.2. Búsqueda de Personajes
- ✅ Cambiar ID del personaje
- ✅ Cargar personaje diferente
- ✅ Validar actualización de UI

#### 5.3.3. Visualización de Vehículos
- ✅ Mostrar vehículos cuando existen
- ✅ Mostrar información detallada de vehículos
- ✅ Mostrar mensaje cuando no hay vehículos

#### 5.3.4. Estados de Carga y Error
- ✅ Mostrar spinner durante carga
- ✅ Mostrar mensaje de error
- ✅ Permitir reintentar después de error

#### 5.3.5. Integración con API
- ✅ Consumir API de personajes
- ✅ Cargar vehículos desde API
- ✅ Manejar errores de API

#### 5.3.6. Responsive Design
- ✅ Funcionar en móviles
- ✅ Funcionar en tablets
- ✅ Funcionar en desktop

### 5.4. Pruebas de API Externa

#### 5.4.1. API de Personajes
- ✅ Obtener personaje por ID
- ✅ Validar estructura de respuesta
- ✅ Manejar 404 para personajes inexistentes

#### 5.4.2. API de Vehículos
- ✅ Obtener vehículo por URL
- ✅ Validar estructura de respuesta
- ✅ Obtener múltiples vehículos

#### 5.4.3. Flujo Completo
- ✅ Obtener personaje y todos sus vehículos
- ✅ Manejar personajes sin vehículos
- ✅ Validar tiempos de respuesta

## 6. Criterios de Aceptación

### 6.1. Funcionales
- ✅ La aplicación debe cargar y mostrar un personaje por defecto
- ✅ El usuario puede buscar personajes por ID
- ✅ Se muestra información completa del personaje
- ✅ Se muestran todos los vehículos asociados al personaje
- ✅ Se manejan correctamente los errores de red
- ✅ La aplicación es responsive

### 6.2. No Funcionales
- ✅ Cobertura de código ≥ 70%
- ✅ Todas las pruebas unitarias pasan
- ✅ Todas las pruebas E2E pasan
- ✅ Tiempo de respuesta de API < 5 segundos
- ✅ Código limpio y mantenible
- ✅ Arquitectura limpia implementada
- ✅ Principios SOLID aplicados

## 7. Herramientas y Tecnologías

### 7.1. Pruebas Unitarias
- **Vitest**: Framework de pruebas
- **React Testing Library**: Pruebas de componentes React
- **@testing-library/user-event**: Simulación de interacciones
- **@vitest/coverage-v8**: Cobertura de código

### 7.2. Pruebas E2E
- **Cypress**: Framework de pruebas end-to-end
- **Cypress Intercept**: Mocking de peticiones HTTP

### 7.3. CI/CD
- **GitHub Actions**: Automatización de pipelines
- **Node.js**: Entorno de ejecución

## 8. Entorno de Pruebas

### 8.1. Desarrollo Local
- Node.js 18+
- Navegadores: Chrome, Firefox, Edge
- Sistema operativo: Windows, Linux, macOS

### 8.2. CI/CD
- GitHub Actions
- Node.js 18 LTS
- Ubuntu Latest

## 9. Métricas y Reportes

### 9.1. Métricas de Cobertura
- Cobertura de líneas: ≥ 70%
- Cobertura de funciones: ≥ 70%
- Cobertura de ramas: ≥ 70%
- Cobertura de declaraciones: ≥ 70%

### 9.2. Reportes
- Reporte HTML de cobertura (generado automáticamente)
- Reportes de Cypress (videos y screenshots)
- Reportes de CI/CD en GitHub Actions

## 10. Plan de Ejecución

### 10.1. Fase 1: Pruebas Unitarias
1. Implementar pruebas de dominio
2. Implementar pruebas de aplicación
3. Implementar pruebas de infraestructura
4. Implementar pruebas de presentación
5. Validar cobertura ≥ 70%

### 10.2. Fase 2: Pruebas de Integración
1. Implementar pruebas de flujo completo
2. Validar integración entre capas
3. Validar manejo de errores

### 10.3. Fase 3: Pruebas E2E
1. Implementar pruebas de aceptación
2. Implementar pruebas de API
3. Validar flujos completos de usuario
4. Validar responsive design

### 10.4. Fase 4: Automatización CI/CD
1. Configurar GitHub Actions
2. Configurar pipeline de pruebas
3. Configurar pipeline de despliegue
4. Validar ejecución automática

## 11. Riesgos y Mitigaciones

### 11.1. Riesgos Identificados
- **API externa no disponible**: Mockear respuestas en pruebas
- **Cambios en API externa**: Usar versionado y mocks
- **Tiempos de respuesta lentos**: Implementar timeouts y retries
- **Cobertura insuficiente**: Revisar y aumentar pruebas

### 11.2. Mitigaciones
- Usar fixtures y mocks para pruebas
- Implementar interceptores en Cypress
- Configurar timeouts apropiados
- Revisar métricas de cobertura regularmente

## 12. Mantenimiento

### 12.1. Actualización de Pruebas
- Actualizar pruebas cuando cambie la funcionalidad
- Revisar y actualizar mocks cuando cambie la API
- Mantener cobertura ≥ 70%

### 12.2. Revisión Periódica
- Revisar métricas de cobertura mensualmente
- Revisar y actualizar casos de prueba trimestralmente
- Actualizar herramientas y dependencias

## 13. Conclusiones

Este plan de pruebas garantiza la calidad del desarrollo mediante:
- Cobertura exhaustiva de código
- Validación de funcionalidad
- Validación de integración
- Validación de experiencia de usuario
- Automatización completa de pruebas

La implementación de este plan asegura que la aplicación cumpla con todos los criterios de evaluación establecidos.



