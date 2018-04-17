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
  '/:tab':'HomeController.tabData',
  '/volume-24-hour-currency':'HomeController.volume_24_hour_currency',
  '/volume-24-hour-currency/:symbol':'HomeController.volume_24_hour_currency_symbol',
  '/volume-24-hour-market/:market':'HomeController.volume_24_hour_market',
  '/volume-24-hour-exchange':'HomeController.volume_24_hour_exhange',
  '/exchange/:exchangeName':'HomeController.exchange',
  '/tc-history':'HomeController.tc_history',
  '/gainers-and-losers':'HomeController.gainers_and_losers',
  '/api/documentation':'HomeController.documentation',
  '/api/tcPrices':'ApiController.tcPrices',
  '/api/symbolsUSDPrices':'ApiController.symbolsUSDPrices',
  '/api/symbolsUSDPrices/:currency':'ApiController.symbolUSDPrice',
  '/api/productsPrices':'ApiController.productsPrices',
  '/api/productsPrices/:product':'ApiController.productPrice',
  '/api/topProductsPrices':'ApiController.topProductsPrices',
  '/api/topGainersLosers':'ApiController.topGainersLosers',
  '/api/userRegistration':'ApiController.userRegistration',
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
