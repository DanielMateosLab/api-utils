export type SuccessResponse<Payload = {}> = {
  status: "success";
} & Payload;

export type ErrorResponse<FieldErrors = undefined> = {
  status: "error";
  name: string;
  message: string;
  /** Used in forms field validation or to give more details */
  fieldErrors?: FieldErrors;
};

export type ApiResponse<SuccessPayload = {}, FieldErrors = undefined> =
  | SuccessResponse<SuccessPayload>
  | ErrorResponse<FieldErrors>;
