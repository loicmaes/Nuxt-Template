export class NotFoundError extends Error {
  public entity: string;

  constructor(entity: string, message?: string) {
    super(message);
    this.entity = entity;
  }
}
export class UniqueConstraintError extends Error {}
