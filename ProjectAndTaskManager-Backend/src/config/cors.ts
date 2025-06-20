import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: (origin, callback) => {
        const whitelist = [process.env.FRONTEND_URL];
        if (!whitelist.includes(origin)) {
            return callback(null, true);
        }
        if (whitelist.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Conexión bloqueada por CORS"), false);
    },
    credentials: true,
};