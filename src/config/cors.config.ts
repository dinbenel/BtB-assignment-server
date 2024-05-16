import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const whitelist = ['http://localhost:5173'];
export const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
