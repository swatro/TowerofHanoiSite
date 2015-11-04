Pencil = {
	updateMoveButton : function(status, remainingMoves){
	  $('#forwardButton').attr('disabled', status); 
	  $('#remainingMoves').text(remainingMoves);
	},

	updateResetButton : function(status){
	  $('#resetButton').attr('disabled', status); 
	},
	
	drawCircle : function(circleName, xLocation, yLocation){
	  var circle = d3.selectAll(circleName)
	    .transition()
	    .delay(100)
	    .duration(1000)
	    .attr("cy", function() { return yLocation; })
	    .attr("cx", function() { return xLocation; })
	    .each("end",function(){return});
	},

	drawGame : function(towerHtml, diskHtml, towerHeight){
	  $('svg').remove();
	  $(".game").append('<svg width="1000" height="' + towerHeight + ' ">' 
	    + towerHtml
	    + diskHtml
	    + '</svg>');
	}
}