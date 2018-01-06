
module.exports = (app, config, winston) => {
  // obtention des modifs
  app.get(config.endpoint, (req, res) => {
    winston.log('debug', 'GET > notify');
    reponses.push(res);
  });
};
