
module.exports = (app, config, notify, winston) => {
  // obtention des modifs
  app.get(config.endpoint, (req, res) => {
    winston.log('debug', 'GET > notify');
    reponses.push(res);
  });
};
