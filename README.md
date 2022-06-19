# lowdux

low-cost react side-load state management

## Install

```bash
npm install --save lowdux
```

## Usage

### useLowduxState()

Access a state directly

```tsx
import React from 'react';
import { useLowduxState } from 'lowdux';

function App() {
  const [street, setStreet] = useLowduxState<string>('checkout.address.street');
  return (
    <div>
      <label>Street:</label>
      <input
        name="street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
    </div>
  );
}
```

### useLowduxSelector()

Remap state with selector function

```tsx
import React from 'react';
import { useLowduxSelector } from 'lowdux';

interface Product {
  unitPrice: number;
  quantity: number;
}

function App() {
  const totalPrice = useLowduxSelector<number>(
    'checkout.products',
    (products) =>
      products.reduce((prev, curr) => prev + curr.unitPrice * curr.quantity, 0)
  );
  return <div>Total price: {totalPrice}</div>;
}
```
