export type ErrorResponse<FieldErrors = undefined> = {
  message: string;
  /** Used in forms field validation or to give more details */
  fieldErrors?: FieldErrors;
};
