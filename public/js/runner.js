var towerLocations = {};
var heightLocations = {};
var moves = [];
var index = 0;
var startRadius = 10; 
var distanceBetweenTowers = 10;

var move = function(index){
  updateMoveButton(Game.isGameOver(index, moves.length), Game.calculateRemainingMoves(index, moves.length)); 

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

var playGame = function(){
  move(index);
  index++;
}

var setDisks = function(numberOfDisks, startRadius, disks){
  var diskHtml = '';
  for (var i=0; i<numberOfDisks; i++){
    heightLocations[numberOfDisks-i]= disks[i].getYLocation();
    diskHtml += '<circle id = "' 
                + disks[i].getDiskId() 
                + '" cx="50" cy="' 
                + disks[i].getYLocation() 
                + '" r="' 
                + disks[i].getRadius() 
                + '"></circle>';
  }
  return diskHtml
}

var setTowers = function(towers){
  var towerHtml = ""
  for (var i=0; i<towers.length; i++){
    var tower = towers[i];
    towerHtml += '<rect x='+ tower.getXLocation() 
                           + ' y=10 width="' 
                           + tower.getWidth() 
                           + '" height="' 
                           + tower.getHeight() 
                           + '"/>';

  }
  return towerHtml; 
}

var setMoveData = function(numberOfDisks){
  $.ajax(
    {
      url : "/data/" + numberOfDisks, 
      success: function(result) {
        moves = DataParser.getMoves(result);
        updateMoveButton(false, moves.length)
      },
      error: function(result){
        updateMoveButton(true, 0)
      }
    })
}

var setGame = function(options){
  var numberOfDisks = options.selectedOptions[0].value;
  setMoveData(numberOfDisks)

  $('svg').remove();
  index = 0; 

  var disks = Game.createDisks(numberOfDisks, startRadius); 
  var towers = Game.createTowers(numberOfDisks, startRadius);

  towerLocations = Game.createDiskXLocationsPerTower(towers[0].getWidth());
  heightLocations = Game.createDiskYLocationsPerDisk(disks);

  $(".game").append('<svg width="1000" height="' + towers[0].getHeight() + ' ">' 
    + setTowers(towers)
    + setDisks(numberOfDisks, startRadius, disks) 
    + '</svg>');
}

var updateMoveButton = function(status, remainingMoves){
  $('#forwardButton').attr('disabled', status); 
  $('#remainingMoves').text(remainingMoves);
}
