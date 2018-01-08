
module.exports = (app, config, notify, responses, winston) => {
  // obtention des modifs
  app.get(config.endpoint, (req, res) => {
    winston.log('debug', 'GET > notify');
    responses.push(res);
  });
};
