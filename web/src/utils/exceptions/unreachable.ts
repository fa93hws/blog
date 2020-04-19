export class UnreachableException extends Error {
  constructor(field: never) {
    super(`unreachable condition: ${field}`);
  }
}
