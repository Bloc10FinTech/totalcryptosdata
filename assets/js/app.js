$(function () {

    var config = window.config = {};

    //delay time configuration
    config.delayTime = 50;

	// Local storage settings
	var themeSettings = getThemeSettings();

	// Elements
 
	var $styleLink = $('#theme-style');
	var $colorOptions = $('#color-options');

	// Color switcher
	var $colorOptionsColorBtns = $colorOptions.find('.color-item');  

	// /////////////////////////////////////////////////

	// Initial state

	// On setting event, set corresponding options

	// Update customize view based on options

	// Update theme based on options

	/************************************************
	*				Initial State
	*************************************************/

	setThemeSettings();

	/************************************************
	*					Events
	*************************************************/

	// set theme type
	$colorOptionsColorBtns.on('click', function() { 
		themeSettings.themeName = $(this).data('theme');

		setThemeSettings();
	}); 

	function setThemeSettings() {
        setThemeState();
        setThemeControlsState();
        saveThemeSettings(); 
	}

	/************************************************
	*			Update theme based on options
	*************************************************/

	function setThemeState() {
		// set theme type
		if (themeSettings.themeName) {
			$styleLink.attr('href', '/styles/theme/theme-' + themeSettings.themeName + '.css');
		}
		else {
			$styleLink.attr('href', '/styles/theme/theme-blue.css');
		} 
	}

	/************************************************
	*			Update theme controls based on options
	*************************************************/

	function setThemeControlsState() {
		// set color switcher
		$colorOptionsColorBtns.each(function() {
			if($(this).data('theme') === themeSettings.themeName) {
				$(this).addClass('active');
			}
			else {
				$(this).removeClass('active');
			}
		}); 
	}
 

	/************************************************
	*				Storage Functions
	*************************************************/

	function getThemeSettings() {
		var settings = (localStorage.getItem('themeSettings')) ? JSON.parse(localStorage.getItem('themeSettings')) : {}; 
		return settings;
	}

	function saveThemeSettings() {
		localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
	}


	/************************************************
	*				Tables
	*************************************************/ 
    /*$('#bigGainers-table').DataTable({
        "paging":   false, 
        "info":     false,
        "searching": false
    });
    $('#bigLoosers-table').DataTable({
        "paging":   false, 
        "info":     false,
        "searching": false
    });
    $('#totalCryptos-table').DataTable({
        "paging":   false, 
        "info":     false,
        "searching": false
    });*/


});