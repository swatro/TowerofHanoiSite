var DataParser =  {
	getMoves : function(data){
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
	
}