
describe("The game", function() {
  it("should calculate remaining moves", function() {
  	var remainingMoves = Game.getRemainingMoves(3, 1)
    expect(remainingMoves).toBe(6);
  });

  it("should initialize generate Disks with incrementing radii", function(){
  	var numberOfDisk = 3;
  	var startRadius = 10;
  	var disks = Game.createDisks(numberOfDisk, startRadius);

  	expect(disks[0].getRadius()).toBe(10);
  	expect(disks[1].getRadius()).toBe(15);
  	expect(disks[2].getRadius()).toBe(20);	
  })

  it("should initiaize the Disk start yLocation", function(){
  	var numberOfDisk = 3;
  	var startRadius = 10;
  	var disks = Game.createDisks(numberOfDisk, startRadius);

  	expect(disks[0].getYLocation()).toBe(25);
  	expect(disks[1].getYLocation()).toBe(60);
  	expect(disks[2].getYLocation()).toBe(105);	
  })

  it("should initialize the disk name", function(){
  	var numberOfDisk = 3;
  	var startRadius = 10;
  	var disks = Game.createDisks(numberOfDisk, startRadius);

  	expect(disks[0].getDiskId()).toBe("circle_A");
  	expect(disks[1].getDiskId()).toBe("circle_B");
  	expect(disks[2].getDiskId()).toBe("circle_C");
  })

  it("should initialize the towers with a width", function(){
  	var numberOfDisks = 3;
  	var startRadius = 10;
  	var towers = Game.createTowers(numberOfDisks, startRadius);

  	expect(towers[0].getWidth()).toBe(50)
  })

  it("should initialize the towers with a height", function(){
  	var numberOfDisks = 3;
  	var startRadius = 10;
  	var towers = Game.createTowers(numberOfDisks, startRadius);

  	expect(towers[0].getHeight()).toBe(130)
  })

  it("should initialize the tower with an x location", function(){
	var numberOfDisks = 3;
  	var startRadius = 10;
  	var towers = Game.createTowers(numberOfDisks, startRadius);

  	expect(towers[0].getXLocation()).toBe(25)
  	expect(towers[1].getXLocation()).toBe(85)
  	expect(towers[2].getXLocation()).toBe(145)

  })

  it("should create the disks y locations per tower", function(){
  	var towerWidth = 50;
  	var diskXLocations = Game.createDiskXLocationsPerTower(towerWidth);

  	expect(diskXLocations["tower1"]).toBe(50)
  	expect(diskXLocations["tower2"]).toBe(110)
  	expect(diskXLocations["tower3"]).toBe(170)
  })

});