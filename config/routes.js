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
  'post /api/sliderData':'ApiController.sliderData',
  '/api/biggestGainers':'ApiController.biggestGainers',
  '/api/userRegistration':'ApiController.userRegistration',
  '/pro':'HomeController.pro',
  'GET /widget/gainers': { view: 'widget/gainers_widget',locals: {layout: false}},
  'GET /widget/losers': { view: 'widget/losers_widget',locals: {layout: false}},
  'GET /widget/gainers_losers': { view: 'widget/gainers_losers_widget',locals: {layout: false}},
  
  'GET /widget_sm/gainers': { view: 'widget_sm/gainers_widget',locals: {layout: false}},
  'GET /widget_sm/losers': { view: 'widget_sm/losers_widget',locals: {layout: false}},
  'GET /widget_sm/gainers_losers': { view: 'widget_sm/gainers_losers_widget',locals: {layout: false}},
 
  '/home': {view: 'homepage'},
  '/login':{view: 'login'},
  '/about':'HomeController.about',
  '/TCindex':'HomeController.TC_index',
  'post /doLogin':'AuthController.doLogin'

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
