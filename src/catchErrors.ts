import { yupToFormErrors } from "formik";
import { NextApiHandler } from "next/types/index";
import { ErrorResponse } from "./types";
import ValidationError from "yup/lib/ValidationError";

const catchErrors =
  (handler: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      console.error(e);
      if (e instanceof ValidationError) {
        const body: ErrorResponse<{}> = {
          message: "Validation Error",
          fieldErrors: yupToFormErrors(e),
        };
        return res.status(400).json(body);
      }

      const body: ErrorResponse = {
        message: e.message || "Internal Server Error",
      };
      return res.status(e.statusCode || 500).json(body);
    }
  };

export default catchErrors;
