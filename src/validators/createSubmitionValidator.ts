import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    console.log("ls", req.body);
    try {
        console.log("ssjssjs");
        schema.parse({ ...req.body });
        next();

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Invalid request params received.",
            data: {},
            error: error
        });
    }
};