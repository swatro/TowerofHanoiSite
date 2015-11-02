towerLocations = {};
heightLocations = {};
moves = [];

runCode = function() {

  var forwardElement = document.getElementById('forwardButton');
  index = 0; 
  forwardElement.addEventListener('click', function(){
    move(index);
    index++;
  }, false);
}

var calculateMoves = function(data){
  var data = JSON.parse(data);
  var movesToBeMade = []
  for (var index=0; index<data.length-1; index++){
    var currentState = data[index];
    var nextState = data[index+1];
    for (var towerIndex in currentState){
      if (currentState[towerIndex].disks.length > nextState[towerIndex].disks.length){
        movesToBeMade[index] = {circle : currentState[towerIndex].disks[0].diskName}; 
      }
      if (currentState[towerIndex].disks.length < nextState[towerIndex].disks.length){
        movesToBeMade[index] = {circle : nextState[towerIndex].disks[0].diskName}; 
      }            
    }

  }
  for (var index=0; index< movesToBeMade.length; index++){
    var disk = movesToBeMade[index].circle;
    var towers = data[index+1];
    for (var tower in towers){
      for (var towerDisks in towers[tower].disks){
        if (towers[tower].disks[towerDisks].diskName == disk){
          movesToBeMade[index].tower = tower;
          movesToBeMade[index].level = towers[tower].disks.length;
        }
      }
    }
  }
  return movesToBeMade
}

var move = function(index){

  var circleName = "#circle_" + moves[index].circle;
  var xLocation = towerLocations[moves[index].tower];
  var yLocation = heightLocations[moves[index].level]

  var circle = d3.selectAll(circleName)
  .transition()
  .delay(100)
  .duration(1000)
  .attr("cy", function() { return yLocation; })
  .attr("cx", function() { return xLocation; })
  .each("end",function(){return});
}

var changeDisks = function(options){
  var numberOfDisks = options.selectedOptions[0].value;
  $('svg').remove();

  index = 0; 
  var diskHtml = '';
  var radius = 10; 
  var yStart  = 0;
  for (var i=0; i<numberOfDisks; i++){
    yStart += 2* radius + 5; 
    heightLocations[numberOfDisks-i]= yStart;
    var circleId = "circle_" + String.fromCharCode('A'.charCodeAt() + i);
    diskHtml += '<circle id = "' + circleId + '" cx="50" cy="' + yStart + '" r="' + radius + '"></circle>';
    radius += 5;
  }
  var towerHeight = yStart + radius-5;
  var towerx = 50 - radius
  var towerWidth = 2* radius
  var distanceBetweenTowers = 10;

  var towerxLocations = []
  towerxLocations[0] = towerx;
  towerxLocations[1] = towerxLocations[0] + towerWidth + distanceBetweenTowers;
  towerxLocations[2] = towerxLocations[1] + towerWidth + distanceBetweenTowers;


  towerLocations["tower1"] = 50;
  towerLocations["tower2"] = towerLocations["tower1"] + (towerWidth +distanceBetweenTowers) ; 
  towerLocations["tower3"] = towerLocations["tower2"] + (towerWidth +distanceBetweenTowers);
  $(".game").append('<svg width="1000" height="' + towerHeight + ' ">' 
    + '<rect x='+ towerxLocations[0] + '  y=10 width="' + towerWidth + '" height="' + towerHeight + '"/>'
    + '<rect x='+ towerxLocations[1] + ' y=10 width="' + towerWidth + '" height="' + towerHeight + '"/>'
    + '<rect x='+ towerxLocations[2] + ' y=10 width="' + towerWidth + '" height="' + towerHeight + '"/>'
    +  diskHtml 
    + '</svg>');
  
  $.ajax(
    {
      url : "/data/" + numberOfDisks, 
      success: function(result) {
        moves = calculateMoves(result);
      }
    })
}