
  var startData = '[{"tower1":{"disks":[{"diskName":"A"},{"diskName":"B"}]},'
  				+ '	 "tower2":{"disks":[]},'
  				+ '	 "tower3":{"disks":[]}},' 
  				+ '	{"tower1":{"disks":[{"diskName":"B"}]},'
  				+ '	 "tower2":{"disks":[{"diskName":"A"}]},'
  				+ '	 "tower3":{"disks":[]}},' 
  				+ '	{"tower1":{"disks":[]},'
  				+ '	 "tower2":{"disks":[{"diskName":"A"}]},'
  				+ '	 "tower3":{"disks":[{"diskName":"B"}]}},' 
  				+ ' {"tower1":{"disks":[]},'
  				+ '	 "tower2":{"disks":[]},'
  				+ '	 "tower3":{"disks":[{"diskName":"A"},{"diskName":"B"}]}}]';	

describe("The data parser", function() { 

  it("should calculate the first disk moves to the second tower", function() {
  	var moves = DataParser.getMoves(startData);

  	var expectFirstMove = {
  		"circle" : 'A',
  		"tower"  : "tower2",
  		"level"  : 1
  	}
    expect(moves[0]).toEqual(expectFirstMove);
  });
});
