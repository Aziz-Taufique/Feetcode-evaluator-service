import { string, z } from "zod";

export type createSubmitionDto = z.infer<typeof createSubmiionZodSchema>

export const createSubmiionZodSchema = z.object({
    userId: string(),
    problemId: string(),
    code: string(),
    language: string()
}).strict();