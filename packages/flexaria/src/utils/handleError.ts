import { logger } from './logger';

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error('An unexpected error occurred');
  }
  process.exit(1);
};
