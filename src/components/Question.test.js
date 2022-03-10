import { render, screen } from "@testing-library/react";
import Question from "./Question";
import quizDataJSON from "../data/quiz.json";

test("There should be a question and four choices", () => {
  render(<Question data={quizDataJSON.data[1]} />);
  const quizQuestion = document.getElementById("quiz-question");
  const quizChoices = screen.getAllByRole("radio").length;
  expect(quizQuestion).toBeVisible();
  expect(quizChoices).toBe(4);
});
