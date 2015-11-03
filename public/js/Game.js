Game = {
	startingXLocationForDisks : 50,
	radiusIncrement : 5, 
	distanceBetweenDisks : 5,
	diskStartingXLocation: 50,
	distanceBetweenTowers: 10,

	createDisks : function(numberOfDisks, startRadius){
		var disks = [];
		var yStart = 0; 

		for (var i = 0; i < numberOfDisks; i++){
			var diskRadius = startRadius + i*Game.radiusIncrement;
			yStart += 2*diskRadius + Game.distanceBetweenDisks 
			var diskId = "circle_" + String.fromCharCode('A'.charCodeAt() + i);
			disks[i] = Disk(diskRadius, yStart, diskId);
		}
		return disks;
	},

	createTowers : function(numberOfDisks, startRadius){
		var towers = [];

		var maxRadius = startRadius + Game.radiusIncrement*numberOfDisks;
		var width = 2*maxRadius;  
		var height = 2*numberOfDisks*startRadius + numberOfDisks*Game.distanceBetweenDisks + Game.radiusIncrement*(numberOfDisks-1)*numberOfDisks;
		height += maxRadius; 

		for (var i =0; i<3; i++){
			var xLocation = Game.diskStartingXLocation - maxRadius + i*(width+ Game.distanceBetweenTowers);
			towers[i] = Tower(width, height, xLocation)
		}

		return towers;
	},

	createDiskXLocationsPerTower : function(towerWidth){
		var diskXLocationsPerTower = [];

		diskXLocationsPerTower["tower1"] = Game.startingXLocationForDisks;
  		diskXLocationsPerTower["tower2"] = diskXLocationsPerTower["tower1"] + (towerWidth +Game.distanceBetweenTowers) ; 
  		diskXLocationsPerTower["tower3"] = diskXLocationsPerTower["tower2"] + (towerWidth +Game.distanceBetweenTowers);

		return diskXLocationsPerTower;
	},

	createDiskYLocationsPerDisk : function(disks){
		var diskYlocationsPerDisk = [];
		for (var diskIndex in disks){
			diskYlocationsPerDisk[diskIndex] = disks[diskIndex].getYLocation();
		}
		return diskYlocationsPerDisk;
	},

	isGameOver : function(index, totalNumberOfMoves){
		return index+1 == totalNumberOfMoves;
	},

	calculateRemainingMoves : function(index, totalStates){
		return totalStates - index - 1; 
	}

}


var Disk = function(radius, yStart, diskId){
	return {
		getRadius : function(){
			return radius;
		},

		getYLocation : function() {
			return yStart;
		},

		getDiskId : function(){
			return diskId;
		}
	}
}

var Tower = function(width, height, xLocation) {
	return {
		getWidth : function(){
			return width;
		},

		getHeight : function(){
			return height;
		},

		getXLocation : function(){
			return xLocation;
		}
	}
}
