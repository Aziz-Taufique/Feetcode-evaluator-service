import { Request, Response } from "express";

import { createSubmitionDto } from "../dtos/createSubmitionDto";


export function addSubmition(req: Request, res: Response) {
    const submittionDto = req.body as createSubmitionDto;

    console.log("foo", submittionDto);

    return res.status(200).json({
        succcess: true,
        error: {},
        message: "Successfully collected the submition.",
        data: submittionDto
    });
}