import '@testing-library/jest-dom';

// Suppress React 18 warnings and API errors in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('ReactDOMTestUtils.act') ||
       args[0].includes('Warning: An update to') ||
       args[0].includes('act(...)') ||
       args[0].includes('Error fetching assignments') ||
       args[0].includes('API Error'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
