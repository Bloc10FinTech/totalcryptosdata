module.exports.cron = {
  //CREATE LIST OF EXCHANGES
  myFirstJob: {
    //schedule: '*/30 * * * * *',
	schedule: '00 01 00 * * *',
    onTick: function () {
      CronService.createExchange();
    }
  },
  //STORE TICKERS OF EXCHANGES HAVING LESS THAN 100 PRODUCTS
  mySecondJob: {
	schedule: '00 */5 * * * *',
    onTick: function () {
      CronService.createExchangeTickers1();
    }
  },
  //STORE TICKERS OF EXCHANGES HAVING MORE THAN 100 PRODUCTS
  myThirdJob: {
	schedule: '00 */7 * * * *',
    onTick: function () {
      CronService.createExchangeTickers2();
    }
  },
  //SEND SOCKET UPDATES ON PAGE
  myFourthJob: {
	schedule: '00 */5 * * * *',
    onTick: function () {
      CronService.socketUpdates();
    }
  }
};