var setting = {
	host : process.env.DB_HOST,
	port : process.env.DB_PORT,
	database : process.env.DB_NAME,
	password : process.env.DB_PASSWORD
};

module.exports = {
  mongodb_dev: setting
};
