/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //SITE URLS AND DATA
  '/': {controller: 'home'},
  '/headerFooterData':'HomeController.headerFooterData',
  '/gainersLosers':'HomeController.gainersLosers',
  '/tabData/:tab':'HomeController.tabData',
  '/tabDataAll/:tab':'HomeController.tabDataAll',
  '/volume-24-hour-currency':'HomeController.volume_24_hour_currency',
  '/volume_24_hour_currency_data':'HomeController.volume_24_hour_currency_data',
  '/volume-24-hour-currency/:symbol':'HomeController.volume_24_hour_currency_symbol',
  '/volume_24_hour_currency_symbol_data/:symbol':'HomeController.volume_24_hour_currency_symbol_data',
  '/volume-24-hour-market/:market':'HomeController.volume_24_hour_market',
  '/volume_24_hour_market_data/:market':'HomeController.volume_24_hour_market_data',
  '/product_history_chart/:market':'HomeController.product_history_chart',
  '/volume-24-hour-exchange':'HomeController.volume_24_hour_exchange',
  '/volume_24_hour_exchange_data':'HomeController.volume_24_hour_exchange_data',
  '/exchange/:exchangeName':'HomeController.exchange',
  '/exchange_data/:exchangeName':'HomeController.exchange_data',
  '/tc-history':'HomeController.tc_history',
  '/tc_history_data':'HomeController.tc_history_data',
  '/new-listing':'HomeController.new_listing',
  '/gainers-and-losers':'HomeController.gainers_and_losers',
  '/gainers_and_losers_data':'HomeController.gainers_and_losers_data',
  '/gainers':'HomeController.gainers',
  '/gainers_data':'HomeController.gainers_data',
  '/losers':'HomeController.losers',
  '/losers_data':'HomeController.losers_data',
  '/exchange_prices/:tab':'HomeController.exchange_prices',
  '/exchange_prices/:tab/details':'HomeController.exchange_prices_details',
  '/fix':'HomeController.fix',
  '/fix_data/databysymbol/:symbol':'HomeController.fix_data_by_symbol',
  '/fix_price_sources/:base_currency/:quote_currency':'HomeController.fix_price_sources',
  '/fx':'HomeController.fx',
  '/fx_data/databysymbol/:symbol':'HomeController.fx_data_by_symbol',
  '/crypto-arbitrage':'HomeController.crypto_arbitrage',
  '/exchanges_currencies':'HomeController.exchanges_currencies',
  'post /predator':'HomeController.predator',
  '/ico':'HomeController.ico',
  '/ico_data':'HomeController.ico_data',
  '/pro':'HomeController.pro',
  '/home': {view: 'homepage'},
  '/login':{view: 'login'},
  '/about':'HomeController.about',
  '/ninja_trader':'HomeController.ninja_trader',
  '/TCindex':'HomeController.TC_index',
  '/ninjatrader': { view: 'ninjatrader',locals: {layout: false}},
  'post /doLogin':'AuthController.doLogin',
  
  //APIS SERVICES
  '/api':'HomeController.documentation',
  '/api/documentation':'HomeController.documentation',
  '/api/tcPrices':'ApiController.tcPrices',
  '/api/symbolsUSDPrices':'ApiController.symbolsUSDPrices',
  '/api/symbolsUSDPrices/:currency':'ApiController.symbolUSDPrice',
  '/api/productsPrices':'ApiController.productsPrices',
  '/api/productsPrices/:product':'ApiController.productPrice',
  '/api/topProductsPrices':'ApiController.topProductsPrices',
  '/api/tcHistory24H':'ApiController.tcHistory24H',
  '/api/tcHistory7D':'ApiController.tcHistory7D',
  '/api/topGainersLosers/:time':'ApiController.topGainersLosers',
  '/api/fixPrice/:symbol':'ApiController.fixPrice',
  '/api/fixPrices':'ApiController.fixPrices',
  'post /api/sliderData':'ApiController.sliderData',
  '/api/currencyFullNames':'ApiController.currencyFullNames',
  '/api/biggestGainers':'ApiController.biggestGainers',
  '/api/productPriceHistoryChart/:product':'ApiController.productPriceHistoryChart',
  '/api/productPriceHistoryChart/:product/:days':'ApiController.productPriceHistoryChartDays',
  '/api/productPriceHistoryChartMinute/:product':'ApiController.productPriceHistoryChartMinute',
  
  //APIS SERVICES ENCRYPTED
  '/api/tcPricesInc':'ApiController.tcPricesInc',
  '/api/symbolsUSDPricesInc':'ApiController.symbolsUSDPricesInc',
  '/api/symbolsUSDPricesInc/:currency':'ApiController.symbolUSDPriceInc',
  '/api/productsPricesInc':'ApiController.productsPricesInc',
  '/api/productsPricesInc/:product':'ApiController.productPriceInc',
  '/api/topProductsPricesInc':'ApiController.topProductsPricesInc',
  '/api/tcHistory24HInc':'ApiController.tcHistory24HInc',
  '/api/tcHistory7DInc':'ApiController.tcHistory7DInc',
  '/api/topGainersLosersInc/:time':'ApiController.topGainersLosersInc',
  '/api/fixPriceInc/:symbol':'ApiController.fixPriceInc',
  '/api/fixPricesInc':'ApiController.fixPricesInc',
  'post /api/sliderDataInc':'ApiController.sliderDataInc',
  '/api/currencyFullNamesInc':'ApiController.currencyFullNamesInc',
  '/api/biggestGainersInc':'ApiController.biggestGainersInc',
  '/api/productPriceHistoryChartInc/:product':'ApiController.productPriceHistoryChartInc',
  '/api/productPriceHistoryChartInc/:product/:days':'ApiController.productPriceHistoryChartDaysInc',
  '/api/productPriceHistoryChartMinuteInc/:product':'ApiController.productPriceHistoryChartMinuteInc',
  
  //GENERATE EXCEL OF FIX PRICES
  '/api/fixMaster':'ApiController.fixMaster',
  
  //USED TO SEND PREDATOR DATA
  '/predator/currencies':'PredatorTradeController.predators_data',
  'post /predator/predator_create_user_token':'PredatorTradeController.predator_create_user_token',
  'post /predator/predator_update_user_currencies':'PredatorTradeController.predator_update_user_currencies',
  
  //NOT USED AS OF NOW	
  '/api/userRegistration':'ApiController.userRegistration',
  
  //WIDGET URLS
  'GET /widget/gainers': { view: 'widget/gainers_widget',locals: {layout: false}},
  'GET /widget/losers': { view: 'widget/losers_widget',locals: {layout: false}},
  'GET /widget/gainers_losers': { view: 'widget/gainers_losers_widget',locals: {layout: false}},
  
  'GET /widget_sm/gainers': { view: 'widget_sm/gainers_widget',locals: {layout: false}},
  'GET /widget_sm/losers': { view: 'widget_sm/losers_widget',locals: {layout: false}},
  'GET /widget_sm/gainers_losers': { view: 'widget_sm/gainers_losers_widget',locals: {layout: false}},
  
  //WIDGET POWERED BY URLS
  'GET /widgetp/gainers': { view: 'widgetp/gainers_widget',locals: {layout: false}},
  'GET /widgetp/losers': { view: 'widgetp/losers_widget',locals: {layout: false}},
  'GET /widgetp/gainers_losers': { view: 'widgetp/gainers_losers_widget',locals: {layout: false}},
  
  'GET /widget_smp/gainers': { view: 'widget_smp/gainers_widget',locals: {layout: false}},
  'GET /widget_smp/losers': { view: 'widget_smp/losers_widget',locals: {layout: false}},
  'GET /widget_smp/gainers_losers': { view: 'widget_smp/gainers_losers_widget',locals: {layout: false}},	
  

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
