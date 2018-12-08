/* eslint-disable no-unused-vars */
const path = require('path');
const dotenv = require('dotenv-safe');

dotenv.load({
  allowEmptyValues: true,
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example'),
});

const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`You must set the ${name} environment variable`);
  }
  return process.env[name];
};

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    },
  },
  test: {},
  development: {},
  production: {},
};

module.exports = Object.assign(config.all, config[config.all.env]);
