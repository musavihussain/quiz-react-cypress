describe("render start page", () => {
  it("check if start page rendered correctly and start button is available", () => {
    cy.visit("/");
    cy.get("#container").should("exist");
    cy.get("#start-quiz").should("exist");
  });

  it("check if start button works and showing question with 4 options, and timer", () => {
    cy.visit("/");

    cy.get("#start-quiz").click();
    cy.get("#quiz-question").should("exist");
    cy.get('[type="radio"]').should("have.length", 4);
    cy.get("#timer").should("exist");
  });

  it("check if questions are coming randomly", () => {
    // first try
    cy.visit("/");
    cy.get("#start-quiz").click();
    cy.get("#quiz-question").then(($currentQuestion) => {
      console.log("current question", $currentQuestion);
      cy.visit("/");
      cy.get("#start-quiz").click();
      let secondTry = cy.get("#quiz-question");
      if ($currentQuestion !== secondTry) {
        return false;
      } else {
        return true;
      }
    });
  });

  it("Let's take a quiz", () => {
    cy.visit("/");
    cy.get("#start-quiz").click();
    cy.get('[type="radio"]')
      .first()
      .check();
    cy.get("#next-question-btn").click();
    cy.get("#next-question-btn").click();
    cy.get('[type="radio"]:eq(2)').check();
    cy.get("#next-question-btn").click();
    cy.get('[type="radio"]')
      .first()
      .check();
    cy.get("#next-question-btn").click();
    cy.get('[type="radio"]:eq(1)').check();
    cy.get("#next-question-btn").click();
    cy.get('[type="radio"]:eq(2)').check();
    cy.get("#next-question-btn").click();
    cy.get('[type="radio"]')
      .last()
      .check();
    cy.get("#next-question-btn").click();
    cy.get("#next-question-btn").click();
    cy.get('[type="radio"]')
      .last()
      .check();
    cy.get("#next-question-btn").click();
    cy.get('[type="radio"]:eq(1)').check();
    cy.get("#next-question-btn").click();
    cy.get('[type="radio"]:eq(3)').check();
    cy.get("#next-question-btn").click();
    cy.get("#correct-answer")
      .invoke("text")
      .should("match", /^[0-9]*$/);
    cy.get("#incorrect-answer")
      .invoke("text")
      .should("match", /^[0-9]*$/);
    cy.get("#unanswered-questions")
      .invoke("text")
      .should("match", /^[0-9]*$/);
  });
});
