import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: (origin, callback) => {
        const whitelist = [process.env.FRONTEND_URL];
        if (!origin || whitelist.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Connection blocked by CORS"), false);
    },
    credentials: true,
};