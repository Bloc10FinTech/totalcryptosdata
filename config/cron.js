module.exports.cron = {
  myFirstJob: {
    //schedule: '*/30 * * * * *',
	schedule: '00 */5 * * * *',
    onTick: function () {
      CronService.updateExchange();
    }
  }
};