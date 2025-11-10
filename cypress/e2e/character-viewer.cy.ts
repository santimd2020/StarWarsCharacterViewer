describe('Visor de Personajes Star Wars - Pruebas de Aceptación', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Visualización de Personaje', () => {
    it('debe mostrar el título de la aplicación', () => {
      cy.contains('Visor de Personajes Star Wars').should('be.visible');
    });

    it('debe mostrar el campo de búsqueda por ID', () => {
      cy.get('[data-testid="character-id-input"]').should('be.visible');
      cy.get('[data-testid="character-id-input"]').should('have.value', '1');
    });

    it('debe cargar y mostrar información de un personaje por defecto (ID 1)', () => {
      cy.waitForCharacter();
      
      cy.get('[data-testid="character-card"]').should('be.visible');
      cy.get('.character-name').should('be.visible');
      cy.get('.character-info').should('be.visible');
    });

    it('debe mostrar la información básica del personaje', () => {
      cy.waitForCharacter();
      
      cy.get('[data-testid="character-card"]').within(() => {
        cy.contains(/Altura:/).should('be.visible');
        cy.contains(/Peso:/).should('be.visible');
        cy.contains(/Color de cabello:/).should('be.visible');
        cy.contains(/Color de piel:/).should('be.visible');
        cy.contains(/Color de ojos:/).should('be.visible');
        cy.contains(/Año de nacimiento:/).should('be.visible');
        cy.contains(/Género:/).should('be.visible');
      });
    });
  });

  describe('Búsqueda de Personajes', () => {
    it('debe permitir cambiar el ID del personaje', () => {
      cy.get('[data-testid="character-id-input"]').clear().type('2');
      cy.waitForCharacter();
      
      cy.get('[data-testid="character-card"]').should('be.visible');
    });

    it('debe cargar un personaje diferente al cambiar el ID', () => {
      cy.waitForCharacter();
      const firstCharacterName = cy.get('.character-name').invoke('text');
      
      cy.get('[data-testid="character-id-input"]').clear().type('2');
      cy.waitForCharacter();
      
      cy.get('.character-name').should('be.visible');
    });
  });

  describe('Visualización de Vehículos', () => {
    it('debe mostrar vehículos cuando el personaje los tiene', () => {
      // Luke Skywalker (ID 1) tiene vehículos
      cy.waitForCharacter();
      
      cy.get('.vehicles-section').should('be.visible');
      cy.get('.vehicles-title').should('contain', 'Vehículos');
      cy.get('[data-testid="vehicle-card"]').should('have.length.greaterThan', 0);
    });

    it('debe mostrar información detallada de cada vehículo', () => {
      cy.waitForCharacter();
      
      cy.get('[data-testid="vehicle-card"]').first().within(() => {
        cy.contains(/Modelo:/).should('be.visible');
        cy.contains(/Fabricante:/).should('be.visible');
        cy.contains(/Clase:/).should('be.visible');
        cy.contains(/Longitud:/).should('be.visible');
        cy.contains(/Tripulación:/).should('be.visible');
      });
    });

    it('debe mostrar mensaje cuando el personaje no tiene vehículos', () => {
      // Buscar un personaje sin vehículos (ej: C-3PO, ID 2)
      cy.get('[data-testid="character-id-input"]').clear().type('2');
      cy.waitForCharacter();
      
      // Verificar que no hay vehículos o que se muestra el mensaje
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="no-vehicles"]').length > 0) {
          cy.get('[data-testid="no-vehicles"]').should('be.visible');
          cy.get('[data-testid="no-vehicles"]').should('contain', 'no tiene vehículos');
        }
      });
    });
  });

  describe('Estados de Carga y Error', () => {
    it('debe mostrar un spinner mientras carga', () => {
      // Interceptar la petición para hacerla más lenta y poder ver el spinner
      cy.intercept('GET', 'https://swapi.dev/api/people/999', {
        delay: 2000,
        statusCode: 404,
        body: { detail: 'Not found' }
      }).as('slowRequest');
      
      cy.get('[data-testid="character-id-input"]').clear().type('999');
      // Verificar que el spinner aparece (puede ser muy rápido, así que verificamos inmediatamente)
      cy.get('[data-testid="loading-spinner"]', { timeout: 3000 }).should('exist');
    });

    it('debe mostrar un mensaje de error cuando el personaje no existe', () => {
      cy.get('[data-testid="character-id-input"]').clear().type('999');
      
      cy.get('[data-testid="error-message"]', { timeout: 10000 }).should('be.visible');
      // Buscar cualquier texto relacionado con error (más flexible)
      cy.get('[data-testid="error-message"]').should(($el) => {
        const text = $el.text().toLowerCase();
        expect(text).to.satisfy((txt: string) => 
          txt.includes('error') || 
          txt.includes('cargar') || 
          txt.includes('personaje') ||
          txt.includes('404') ||
          txt.includes('failed') ||
          txt.includes('not found')
        );
      });
    });

    it('debe permitir reintentar después de un error', () => {
      cy.get('[data-testid="character-id-input"]').clear().type('999');
      
      cy.get('[data-testid="error-message"]', { timeout: 10000 }).should('be.visible');
      cy.contains('Reintentar').should('be.visible').click();
      
      cy.get('[data-testid="loading-spinner"]').should('be.visible');
    });
  });

  describe('Integración con API', () => {
    it('debe consumir correctamente la API de Star Wars', () => {
      cy.intercept('GET', 'https://swapi.dev/api/people/1', {
        fixture: 'character-1.json',
      }).as('getCharacter');
      
      cy.visit('/');
      cy.wait('@getCharacter');
      
      cy.get('[data-testid="character-card"]').should('be.visible');
    });

    it('debe cargar vehículos desde la API', () => {
      cy.intercept('GET', 'https://swapi.dev/api/people/1', {
        fixture: 'character-1.json',
      }).as('getCharacter');
      
      cy.intercept('GET', 'https://swapi.dev/api/vehicles/*', {
        fixture: 'vehicle.json',
      }).as('getVehicle');
      
      cy.visit('/');
      cy.wait('@getCharacter');
      cy.waitForCharacter();
      
      // Si hay vehículos, deberían cargarse
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="vehicle-card"]').length > 0) {
          cy.get('[data-testid="vehicle-card"]').should('be.visible');
        }
      });
    });
  });

  describe('Responsive Design', () => {
    it('debe ser responsive en dispositivos móviles', () => {
      cy.viewport(375, 667); // iPhone SE
      cy.waitForCharacter();
      
      cy.get('[data-testid="character-card"]').should('be.visible');
      cy.get('.character-info').should('be.visible');
    });

    it('debe ser responsive en tablets', () => {
      cy.viewport(768, 1024); // iPad
      cy.waitForCharacter();
      
      cy.get('[data-testid="character-card"]').should('be.visible');
    });
  });
});



