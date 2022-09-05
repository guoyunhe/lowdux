import { render, screen } from '@testing-library/react';
import React from 'react';
import { store, useLowduxSelector } from '.';

test('selector', async () => {
  store.set('foo', { bar: 'hi' });
  const App = () => {
    const bar = useLowduxSelector<string>('foo.bar');
    return <div>{bar}</div>;
  };
  render(<App />);
  expect(await screen.findByText('hi')).toBeTruthy();
});
