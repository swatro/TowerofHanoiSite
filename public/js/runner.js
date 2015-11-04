var towerLocations = {};
var heightLocations = {};
var moves = [];
var index = 0;
var startRadius = 10; 
var numberOfDisks = 0;

var move = function(){
  Pencil.updateMoveButton(Game.isGameOver(index, moves.length), Game.calculateRemainingMoves(index, moves.length)); 

  var circleName = "#circle_" + moves[index].circle;
  var xLocation = towerLocations[moves[index].tower];
  var yLocation = heightLocations[moves[index].level];
  Pencil.drawCircle(circleName, xLocation, yLocation);
}

var playGame = function(){
  move(index);
  index++;
}

var setMoveData = function(numberOfDisks){
  $.ajax(
    {
      url : "/data/" + numberOfDisks, 
      success: function(result) {
        moves = DataParser.getMoves(result);
        Pencil.updateMoveButton(false, moves.length);
        Pencil.updateResetButton(false);
      },
      error: function(result){
        Pencil.updateMoveButton(true, 0)
        Pencil.updateResetButton(true);
      }
    })
}

var setGame = function(options){
  numberOfDisks = options.selectedOptions[0].value;
  setMoveData(numberOfDisks)

  index = 0;
  var disks = Game.createDisks(numberOfDisks, startRadius); 
  var towers = Game.createTowers(numberOfDisks, startRadius);

  towerLocations = Game.createDiskXLocationsPerTower(towers[0].getWidth());
  heightLocations = Game.createDiskYLocationsForTowerLevel(disks);
  Pencil.drawGame(Game.createTowerHtml(towers), Game.createDiskHtml(numberOfDisks, startRadius, disks), towers[0].getHeight());
}

var resetGame = function(){
  index = 0;
  var disks = Game.createDisks(numberOfDisks, startRadius); 

  for (var i in disks){
    var circleName = "#" + disks[i].getDiskId();
    var xLocation = towerLocations["tower1"];
    var yLocation = disks[i].getYLocation()
    Pencil.drawCircle(circleName, xLocation, yLocation)
  }

  Pencil.updateMoveButton(false, moves.length)
}
