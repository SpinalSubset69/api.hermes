import { app } from "./app";
import logger from './util/logger';

app.listen(3000, () => {
    logger.info('Server Running on Port 3000');
});