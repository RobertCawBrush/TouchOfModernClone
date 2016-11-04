/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	//we are using an IIFE to restrict our variables to a local scope and avoid variable leakage,
	// we don't have any other scripts so this is unnecessary but I do it out of habit and it doesn't hurt
	(function () {
	    'use strict'; // use this to stop javascript from loosely compiling

	    function DOMObj() {
	        var self = this;

	        self.products = [];

	        self.getProducts = function (url) {
	            return new Promise(function (resolve) {

	                var template = '';

	                //initially this line was in updateHTML and was called more than once
	                $.get('product-template.html', function (tempTemplate) {
	                    template = tempTemplate;
	                });

	                $.getJSON(url, function (response) {
	                    for (var i = 0; i < response.sales.length; i++) {

	                        self.products.push(new ProductObj(response.sales[i], i, template));
	                    }
	                    resolve();
	                });
	            });
	        };

	        self.updateProductHTML = function () {
	            //This line here still uses a for loop but behind the scenes.
	            //Promise.all also consumes/resolves all of my promises set in updateHTML
	            return Promise.all(self.products.map(function (product) {
	                return product.updateHTML();
	            }));
	        };

	        self.updateDOM = function () {
	            return new Promise(function (resolve) {
	                var thisHTML = '';

	                for (var i = 0; i < self.products.length; i++) {

	                    if (i % 3 === 0) {
	                        thisHTML += "<div class='row'>";
	                    }

	                    thisHTML += self.products[i].htmlView;

	                    if (i % 3 === 2 || i === self.products.length - 1) {
	                        thisHTML += "</div>";
	                    }

	                    if (i === self.products.length - 1) {
	                        $("#content").append(thisHTML);
	                        $('html').toggleClass('loading');
	                    }
	                }
	                resolve();
	            });
	        };
	    }

	    function ProductObj(product, i, template) {
	        var self = this;

	        self.photo = product.photos.medium_half;
	        self.title = product.name;
	        self.tagline = product.tagline;
	        self.url = product.url;
	        self.description = product.description;

	        self.htmlView = "";
	        self.index = i;

	        self.updateHTML = function () {
	            return new Promise(function (resolve) {
	                self.htmlView = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace('{description}', self.description);

	                resolve();
	            });
	        };
	    }

	    function addUtilities() {
	        return new Promise(function (resolve) {

	            // add delete code
	            var delBtnArray = document.getElementsByClassName('delete-button');

	            Array.from(delBtnArray).forEach(function (element) {
	                element.addEventListener('click', function (event) {
	                    var targetElement = event.target.parentElement;

	                    $(targetElement).fadeOut(400, function () {
	                        targetElement.remove();
	                    });
	                });
	            });

	            //add text overlay on mouseover
	            var imageArray = document.getElementsByClassName('img-responsive');

	            Array.from(imageArray).forEach(function (element) {

	                element.addEventListener('mouseenter', function () {
	                    $(element).parents('a').parents('div').children().filter('.description').toggleClass('hidden');
	                });
	                element.addEventListener('mouseleave', function () {
	                    $(element).parents('a').parents('div').children().filter('.description').toggleClass('hidden');
	                });
	            });
	            resolve();
	        });
	    }

	    // since our code is defined around global variables,
	    // out DOMObj needs to be outside of our promises and hope it runs in time
	    // ideally you'd want to avoid having globals and pass variables to their functions instead
	    var page = new DOMObj();

	    // Using a promise will be faster than a timeout and consistently run our async functions in order
	    page.getProducts('data.json').then(page.updateProductHTML).then(page.updateDOM).then(addUtilities);
	})();

/***/ }
/******/ ]);