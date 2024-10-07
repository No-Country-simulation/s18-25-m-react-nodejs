// Check if the app is running correctly

import { Response, Request } from "express";

export const healthcheck = (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "Server up and running",
  });
};
