describe('Pruebas de Aceptación - Integración con API', () => {
  const baseUrl = 'https://swapi.dev/api';

  describe('API de Personajes', () => {
    it('debe obtener un personaje por ID', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/people/1`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('height');
        expect(response.body).to.have.property('mass');
        expect(response.body).to.have.property('vehicles');
        expect(response.body.vehicles).to.be.an('array');
      });
    });

    it('debe retornar 404 para un personaje inexistente', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/people/999`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });

    it('debe retornar la estructura correcta de un personaje', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/people/1`,
      }).then((response) => {
        const character = response.body;
        
        expect(character).to.have.all.keys(
          'name',
          'height',
          'mass',
          'hair_color',
          'skin_color',
          'eye_color',
          'birth_year',
          'gender',
          'homeworld',
          'films',
          'species',
          'vehicles',
          'starships',
          'created',
          'edited',
          'url'
        );
        
        expect(character.name).to.be.a('string');
        expect(character.vehicles).to.be.an('array');
      });
    });
  });

  describe('API de Vehículos', () => {
    it('debe obtener un vehículo por URL', () => {
      // Primero obtener un personaje para tener una URL de vehículo
      cy.request({
        method: 'GET',
        url: `${baseUrl}/people/1`,
      }).then((characterResponse) => {
        const vehicles = characterResponse.body.vehicles;
        
        if (vehicles.length > 0) {
          cy.request({
            method: 'GET',
            url: vehicles[0],
          }).then((vehicleResponse) => {
            expect(vehicleResponse.status).to.eq(200);
            expect(vehicleResponse.body).to.have.property('name');
            expect(vehicleResponse.body).to.have.property('model');
            expect(vehicleResponse.body).to.have.property('manufacturer');
            expect(vehicleResponse.body).to.have.property('vehicle_class');
          });
        }
      });
    });

    it('debe retornar la estructura correcta de un vehículo', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/people/1`,
      }).then((characterResponse) => {
        const vehicles = characterResponse.body.vehicles;
        
        if (vehicles.length > 0) {
          cy.request({
            method: 'GET',
            url: vehicles[0],
          }).then((vehicleResponse) => {
            const vehicle = vehicleResponse.body;
            
            expect(vehicle).to.have.property('name');
            expect(vehicle).to.have.property('model');
            expect(vehicle).to.have.property('manufacturer');
            expect(vehicle).to.have.property('vehicle_class');
            expect(vehicle).to.have.property('cost_in_credits');
            expect(vehicle).to.have.property('length');
            expect(vehicle).to.have.property('max_atmosphering_speed');
            expect(vehicle).to.have.property('crew');
            expect(vehicle).to.have.property('passengers');
            expect(vehicle).to.have.property('cargo_capacity');
          });
        }
      });
    });
  });

  describe('Flujo Completo: Personaje con Vehículos', () => {
    it('debe obtener un personaje y todos sus vehículos', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/people/1`,
      }).then((characterResponse) => {
        const character = characterResponse.body;
        const vehicleUrls = character.vehicles;
        
        expect(character).to.have.property('name');
        expect(vehicleUrls).to.be.an('array');
        expect(vehicleUrls.length).to.be.greaterThan(0);
        
        // Obtener el primer vehículo para verificar que funciona
        if (vehicleUrls.length > 0) {
          cy.request({ method: 'GET', url: vehicleUrls[0] }).then((vehicleResponse) => {
            expect(vehicleResponse.status).to.eq(200);
            expect(vehicleResponse.body).to.have.property('name');
            expect(vehicleResponse.body).to.have.property('vehicle_class');
          });
        }
      });
    });

    it('debe manejar personajes sin vehículos', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/people/2`, // C-3PO no tiene vehículos
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.vehicles).to.be.an('array');
        expect(response.body.vehicles.length).to.eq(0);
      });
    });
  });

  describe('Rendimiento y Tiempos de Respuesta', () => {
    it('debe responder en un tiempo razonable', () => {
      const startTime = Date.now();
      
      cy.request({
        method: 'GET',
        url: `${baseUrl}/people/1`,
      }).then(() => {
        const responseTime = Date.now() - startTime;
        expect(responseTime).to.be.lessThan(5000); // Menos de 5 segundos
      });
    });
  });
});



