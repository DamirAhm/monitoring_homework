import {logger} from "../utils/logger.js";

export const exceptionLoggerHook = (req, rep, error) => {
    logger.error(error.name);
}