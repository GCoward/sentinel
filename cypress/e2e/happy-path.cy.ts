describe("Sentinel dashboard", () => {
  it("logs in, passes a11y smoke checks, and invites a teammate", () => {
    cy.visit("/login");
    cy.get('input[name="email"]').clear().type("admin@sentinel.app");
    cy.get('input[name="password"]').clear().type("Sentinel123!");
    cy.contains("button", "Sign in").click();

    cy.url().should("include", "/dashboard");
    cy.contains("Adoption and revenue momentum").should("be.visible");

    cy.injectAxe();
    cy.checkA11y(undefined, {
      includedImpacts: ["critical", "serious"],
    });

    cy.intercept({ method: "POST", url: "**/api/users" }).as("inviteUser");
    cy.contains("button", "Invite teammate").click();
    cy.get('[role="dialog"]').should("be.visible");

    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="name"]')
        .should("be.visible")
        .click({ force: true })
        .clear({ force: true })
        .type("Taylor Brooks", { delay: 20, force: true })
        .should("have.value", "Taylor Brooks");

      cy.get('input[name="email"]')
        .should("be.visible")
        .click({ force: true })
        .clear({ force: true })
        .type("taylor@sentinel.app", { delay: 20, force: true })
        .should("have.value", "taylor@sentinel.app");

      cy.get('select[name="role"]').select("Support");
      cy.contains("button", "Send invite").should("be.enabled").click();
    });

    cy.wait("@inviteUser", { timeout: 20000 }).its("response.statusCode").should("equal", 201);
    cy.contains("Taylor Brooks", { timeout: 10000 }).should("be.visible");
  });
});
