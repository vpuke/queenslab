<img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif" width="100%">

# Queenslab assignment

## Overview

An assigment demonstrating card validation using Zod, unit testing with Vitest, and E2E testing with Cypress.
I have chosen to use React with Vite for the assignment `npm create vite@latest` as `npx create-react-app` is deprecated.

## Algorithms

These assignments are located in `src/utils/index.ts` and are also tested by Vitest.

## Features

- Validate card numbers: `XXXX XXXX XXXX XXXX`
- Validates what kind of card it is (Visa, Mastercard, Discover, Amex).
- Validates if the date of expiry is in the past.
- Validates CVV numbers, should be 3-4 digits.
- Unit tests with Vitest
- E2E tests with Cypress, one passing test and one failing.

## Getting Started

### Prerequisites

- Node.js. 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/vpuke/queenslab.git
cd queenslab
npm install
npm run dev
```

### Testing Vitest

```bash
npm run test
```

### Testing Cypress

```bash
npm run cy:open-e2e
```
