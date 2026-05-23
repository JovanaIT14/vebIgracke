import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Toyland navigation', () => {
  render(<App />);
  expect(screen.getAllByText(/Toyland/i)[0]).toBeInTheDocument();
  expect(screen.getByText(/Korpa/i)).toBeInTheDocument();
});
