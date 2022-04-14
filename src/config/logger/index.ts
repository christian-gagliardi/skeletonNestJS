import Logger from './log';
import {StreamOptions} from 'morgan';
import * as morgan from 'morgan';

const stream: StreamOptions = {
  write: (message) => Logger.http(message.trim())
};

const skip = () => {
  const env = !process.env.NODE_ENV ? 'development' : process.env.NODE_ENV;
  return env === 'development';
};

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream,
  skip
});

export default morganMiddleware;
