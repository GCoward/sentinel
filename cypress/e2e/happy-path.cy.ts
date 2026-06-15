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

    cy.contains("button", "Invite teammate").click();
    cy.get('input[name="name"]').type("Taylor Brooks");
    cy.get('input[name="email"]').type("taylor@sentinel.app");
    cy.get('select[name="role"]').select("Support");
    cy.contains("button", "Send invite").click();
    cy.contains("Taylor Brooks").should("be.visible");
  });
});
