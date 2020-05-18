var fs = require("fs")

const development = {
  database: process.env.DB_NAME || 'easytv',
  username: process.env.DB_USER || 'easytv',
  password: process.env.DB_PASS || 'easytv',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql' ||'sqlite' || 'postgres',
};

const testing = {
  database: process.env.DB_NAME || 'easytv',
  username: process.env.DB_USER || 'easytv',
  password: process.env.DB_PASS || 'easytv',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql' ||'sqlite' || 'postgres',
};

const production = {
  database: process.env.DB_NAME || fs.readFileSync(process.env.DB_NAME_FILE, 'utf8').trim(),
  username: process.env.DB_USER || fs.readFileSync(process.env.DB_USER_FILE, 'utf8').trim(),
  password: process.env.DB_PASS || fs.readFileSync(process.env.DB_PASS_FILE, 'utf8').trim(),
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql' ||'sqlite' || 'postgres',
};


module.exports = {
  development,
  testing,
  production,
};
