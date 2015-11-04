Game = {
	startingXLocationForDisks : 50,
	radiusIncrement : 5, 
	distanceBetweenDisks : 5,
	diskStartingXLocation: 50,
	distanceBetweenTowers: 10,

	createDisks : function(numberOfDisks, startRadius){
		var yStart = 0; 

		return _.map(_.range(numberOfDisks), function(i){
			var diskRadius = startRadius + i*Game.radiusIncrement;
			yStart += 2*diskRadius + Game.distanceBetweenDisks 
			var diskId = "circle_" + String.fromCharCode('A'.charCodeAt() + i);
			return Disk(diskRadius, yStart, diskId);
		})
	},

	createTowers : function(numberOfDisks, startRadius){
		var maxRadius = startRadius + Game.radiusIncrement*numberOfDisks;
		var width = 2*maxRadius;  
		var height = 2*numberOfDisks*startRadius + numberOfDisks*Game.distanceBetweenDisks + Game.radiusIncrement*(numberOfDisks-1)*numberOfDisks;
		height += maxRadius; 

		return _.map(_.range(3), function(i){
			var xLocation = Game.diskStartingXLocation - maxRadius + i*(width+ Game.distanceBetweenTowers);
			return Tower(width, height, xLocation)
		})
	},

	createDiskXLocationsPerTower : function(towerWidth){
		var diskXLocationsPerTower = [];

		diskXLocationsPerTower["tower1"] = Game.startingXLocationForDisks;
  		diskXLocationsPerTower["tower2"] = diskXLocationsPerTower["tower1"] + (towerWidth +Game.distanceBetweenTowers); 
  		diskXLocationsPerTower["tower3"] = diskXLocationsPerTower["tower2"] + (towerWidth +Game.distanceBetweenTowers);

		return diskXLocationsPerTower;
	},

	createDiskYLocationsForTowerLevel : function(disks){
		var ylocations = {};
		_.each(disks, function(num, key){
			ylocations[disks.length - key] = num.getYLocation();
		})
      	return ylocations;
	},

	isGameOver : function(index, totalNumberOfMoves){
		return index+1 == totalNumberOfMoves;
	},

	calculateRemainingMoves : function(index, totalStates){
		return totalStates - index - 1; 
	},

	createDiskHtml : function(numberOfDisks, startRadius, disks){
		return _.reduce(disks, function(output, disk){ return output + disk.getHtml();}, "");
	},

	createTowerHtml : function(towers){
		return _.reduce(towers, function(output, tower){ return output + tower.getHtml();}, "");
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
		}, 

		getHtml : function(){
			return '<circle id = "' 
	                  + this.getDiskId() 
	                  + '" cx="50" cy="' 
	                  + this.getYLocation() 
	                  + '" r="' 
	                  + this.getRadius() 
	                  + '"></circle>';
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
		},

		getHtml : function(){
			return '<rect x='
					 + this.getXLocation() 
	                 + ' y=10 width="' 
	                 + this.getWidth() 
	                 + '" height="' 
	                 + this.getHeight() 
	                 + '"/>';
		}
	}
}
