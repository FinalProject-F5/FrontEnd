describe("LandingPage Tests", () => {
  beforeEach(() => {
    // Visitar la página principal antes de cada prueba
    cy.visit("http://localhost:5173"); // Cambia el puerto si es diferente
  });

  it("should display the header", () => {
    // Verificar que el header se muestra correctamente
    cy.get("header").should("be.visible");
  });

  it("should display the latest experiences", () => {
    // Verificar que las tarjetas de experiencias se muestran
    cy.get(".grid .card").should("have.length", 6); // Verifica que hay 6 tarjetas
  });

  it("should display the hero inviting to register", () => {
    // Verificar que el hero con el mensaje de registro está presente
    cy.contains("Want to explore more experiences?").should("be.visible");
    cy.contains("Register").should("be.visible");
    cy.contains("Login").should("be.visible");
  });

  it('should navigate to register page when clicking "Register"', () => {
    // Simular clic en el botón de registro y verificar la navegación
    cy.contains("Register").click();
    cy.url().should("include", "/register");
  });

  it('should navigate to login page when clicking "Login"', () => {
    // Simular clic en el botón de inicio de sesión y verificar la navegación
    cy.contains("Login").click();
    cy.url().should("include", "/login");
  });
