describe("Web Interface", () => {
  beforeEach(() => {
    cy.intercept(
      {
        url: "**/api/**",
      },
      (req) => {
        req.headers["x-get-extra-records"] = "true";
        console.log(`====REQUEST=URL===: ${req.url}`);
        console.log("Modified Headers:", req.headers);
        req.continue();
      }
    ).as("api");
  });

  it("should display records when the button is clicked", () => {
    // Visit the home page
    cy.visit("http://localhost:3000");

    // Click the "Fetch Records" button
    cy.get("#fetchRecordsBtn").click();

    // Check that the records appear in the list
    cy.get("#recordsList")
      .children()
      .should("have.length", 3)
      .and(($li) => {
        expect($li.eq(0)).to.contain("1: Record 1");
        expect($li.eq(1)).to.contain("2: Record 2");
        expect($li.eq(2)).to.contain("3: Record 3");
      });
  });
});
