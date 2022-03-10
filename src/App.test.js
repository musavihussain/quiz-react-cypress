import { render, screen } from '@testing-library/react';
import App from './App';

test('At initial stage, check if start button is available', () => {
  render(<App />);
  expect(screen.getByRole('button', {name: /start quiz/i }));
});



