//use an IIFE to avoid variable leakage since using public variables,
// we dont have any other scripts so this is unnecessary but I do it out of habit

(function(){
    'use strict'; // use this to stop javascript from loosely compiling

    function DOMObj(){
        var self = this;

        self.products = [];

        self.getProducts = function(url) {
            return new Promise (resolve => {
                    $.getJSON(url, function (response) {
                        for (var i = 0; i < response.sales.length; i++) {

                            self.products.push(new ProductObj(response.sales[i], i));

                        }
                        resolve();
                    });
                }
            )
        };

        self.updateProductHTML = function(){
            return new Promise(resolve => {
                for( var i = 0; i < self.products.length; i++){

                    self.products[i].updateHTML();

                }
                resolve();
            })
        };

        self.updateDOM = function() {
            var thisHTML = '';

            for( var i = 0; i < self.products.length; i++) {

                if (i % 3 === 0 ) {
                    thisHTML += "<div class='row'>";
                    console.log("START");
                }

                thisHTML += self.products[i].htmlView;

                if ((i % 3 === 2) || i === (self.products.length - 1) ) {
                    thisHTML += "</div>";
                    console.log("FINISH");
                }
            }
            $("#content").append(thisHTML);
        }
    }

    function ProductObj(product, i) {
        var self = this;

        self.photo = product.photos.medium_half;
        self.title = product.name;
        self.tagline = product.tagline;
        self.url = product.url;

        self.htmlView = "";
        self.index = i;


        self.updateHTML = function() {
            $.get('product-template.html', function(template){
                self.htmlView = template.replace('{image}', self.photo)
                    .replace('{title}', self.title)
                    .replace('{tagline}', self.tagline)
                    .replace('{url}', self.url);

                console.log(self.index + ' product has worked through html')
            })
        };
    }
    // since our code is defined around global variables,
    // this needs to be outside of our promises and hope it runs in time

    // ideally you'd want to avoid having globals and pass variables to their functions instead
    var page = new DOMObj();

    // Using a promise will be faster than a timeout and guarantee that our async functions run in order
    page.getProducts('data.json')
        .then(
            page.updateProductHTML
        )
        .then(setTimeout(() => {
                page.updateDOM();
            }, 400)
        );

})();