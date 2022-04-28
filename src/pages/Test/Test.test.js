import { fireEvent, render, screen } from '@testing-library/react';
import { Test } from './index';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

test('test Test component', () => {
  render(<Test />);
  screen.debug();
  expect(screen.getByDisplayValue('dog')).toBeInTheDocument();
  fireEvent.click(screen.getByText('change'));
  screen.debug();
  expect(screen.getByDisplayValue('cat')).toBeInTheDocument();
});
