/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
    try {
        
    } catch (err: any) {
        res.status(400).json({
            message: `Something went wrong ${err.message}`,
            err
        })
    }
}