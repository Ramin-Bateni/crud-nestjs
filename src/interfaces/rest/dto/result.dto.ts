export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  private readonly _error?: string;
  private readonly _value?: T;

  private constructor(isSuccess: boolean, error?: string, value?: T) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this._error = error;
    this._value = value;
  }

  public static ok<T>(value?: T): Result<T> {
    return new Result<T>(true, undefined, value);
  }

  public static fail<T>(error: string): Result<T> {
    return new Result<T>(false, error);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error("Can't retrieve value from a failed result");
    }
    return this._value!;
  }

  public getError(): string {
    if (this.isSuccess) {
      throw new Error("Can't retrieve error from a successful result");
    }
    return this._error!;
  }
}