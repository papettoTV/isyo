var setting = {
	host : process.env.DB_HOST,
	port : process.env.DB_PORT,
	database : process.env.DB_NAME
};

module.exports = {
  mongodb_dev: setting
};
