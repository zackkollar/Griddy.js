/* jshint asi: true */

/*!
	 _______  ______    ___   ______   ______   __   __            ___  _______ 
	|       ||    _ |  |   | |      | |      | |  | |  |          |   ||       |
	|    ___||   | ||  |   | |  _    ||  _    ||  |_|  |          |   ||  _____|
	|   | __ |   |_||_ |   | | | |   || | |   ||       |          |   || |_____ 
	|   ||  ||    __  ||   | | |_|   || |_|   ||_     _| ___   ___|   ||_____  |
	|   |_| ||   |  | ||   | |       ||       |  |   |  |   | |       | _____| |
	|_______||___|  |_||___| |______| |______|   |___|  |___| |_______||_______|
	Version 0.0.1
*/

//
// Source
//

debug = false;

// modified $.style.insertRule with custom stylesheet ID
(function( $ )
 {
     $.style={
         insertRule:function(selector,rules,contxt)
         {
			 if(debug) {
             	console.log(selector+" { "+rules+" } ");
			 }
             $("#griddy-styles").append("\n"+selector+" { "+rules+" } ");
         }
     }; 
 })( jQuery );

// the plugin functions for jQuery
(function($) {
    $.fn.griddy = function (gridSize, colClassName) {
        $("<style>", {"id" : "griddy-styles"}).appendTo("head");
        function defaultFor(arg, val) { return typeof arg !== 'undefined' ? arg : val; }
        var sel = $(this).selector;
        gridSize = gridSize || 1024;
        colClassName = colClassName || "col";
        // grid size
        $.style.insertRule([sel], 'max-width:'+gridSize+'px;');
        // grid columns super
        $.style.insertRule([sel+" > [class*='"+colClassName+"-']"], 'float: left;');
        // after grid
        $.style.insertRule([sel+':after'], 'content:""; display:table; clear:both;');
        // columns for grid
        for(var curCol = 2; curCol <= 12; curCol++) {
            for(var curSize = 1; curSize < curCol; curSize++) {
                var colMath = ((100/curCol)*curSize);
                $.style.insertRule(["."+colClassName+"-"+curSize+"-"+curCol], 'width:'+colMath+'%;');
            }
        }
        // gutter tags
        $.style.insertRule(['*, *:after, *:before'], '-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box;');
        $.style.insertRule([sel+" [class*='"+colClassName+"-']"], 'padding-right: 20px;');
        $.style.insertRule([sel+" [class*='"+colClassName+"-']:last-of-type"], 'padding-right: 0px;');
    };
}) (jQuery);