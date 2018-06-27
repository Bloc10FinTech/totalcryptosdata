module.exports.cron = {
  //CREATE LIST OF EXCHANGES/TOTAL CRYPTO HISTORY OF PAST DATE/DELETE EXCHANGE DATA MORE THAN 15 DAYS
  myFirstJob: {
    //schedule: '00 */5 * * * *',
	schedule: '00 01 00 * * *',
    onTick: function () {
      CronService.createExchange();
    }
  },
  //STORE TICKERS OF EXCHANGES HAVING 100 OR LESS PRODUCTS
  mySecondJob: {
	//schedule: '00 */5 * * * *',
	schedule: '00 50 * * * *',
    onTick: function () {
      CronService.createExchangeTickers1();
    }
  },
  //STORE TICKERS OF EXCHANGES HAVING MORE THAN 100 PRODUCTS
  myThirdJob: {
	//schedule: '00 */7 * * * *',
	schedule: '00 55 * * * *',
    onTick: function () {
      CronService.createExchangeTickers2();
    }
  },
  //SEND SOCKET UPDATES ON PAGE
  myFourthJob: {
	//schedule: '00 */5 * * * *',
	schedule: '00 59 * * * *',
    onTick: function () {
      //CronService.socketUpdates();
    }
  }
};