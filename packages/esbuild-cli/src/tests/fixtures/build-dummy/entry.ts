import { bar } from './bar';

function foo() {
  const b = bar();
  return {
    foo: process.env.NODE_ENV,
    bar: b,
  };
}

foo();
