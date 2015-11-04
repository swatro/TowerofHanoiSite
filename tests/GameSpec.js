
describe("The game", function() {

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

  it("should indicate when the game is over", function(){
  	var indexThatGameIsOn = 9;
  	var totalStates = 10;
  	var isGameOver = Game.isGameOver(indexThatGameIsOn, totalStates);

  	expect(isGameOver).toBe(true);
  })

  it("should get the number Of remaining moves", function(){
    var indexThatGameIsOn = 2;
    var totalStates = 10;
    var remainingMoves = Game.calculateRemainingMoves(indexThatGameIsOn, totalStates);

    expect(remainingMoves).toBe(7)
  })

  it("should get the y locations for the disks given the level in the tower", function(){
    var numberOfDisk = 4;
    var startRadius = 10;
    var disks = Game.createDisks(numberOfDisk, startRadius);
    var heightLocations = Game.createDiskYLocationsForTowerLevel(disks);

    expect(heightLocations[1]).toBe(160)
    expect(heightLocations[2]).toBe(105)
    expect(heightLocations[3]).toBe(60)
    expect(heightLocations[4]).toBe(25)
  })

  it("should create the html for all disks", function(){
    var numberOfDisks = 2;
    var startRadius = 10;
    var disks = Game.createDisks(numberOfDisks, startRadius);
    var diskHtml = Game.createDiskHtml(numberOfDisks, startRadius, disks);

    var expectedOutput = '<circle id = "circle_A" cx="50" cy="25" r="10"></circle><circle id = "circle_B" cx="50" cy="60" r="15"></circle>';
    expect(diskHtml).toBe(expectedOutput);
  })

  it("should create the html for all towers", function(){
    var numberOfDisks = 3;
    var startRadius = 10;
    var towers = Game.createTowers(numberOfDisks, startRadius);  
    var towerHtml = Game.createTowerHtml(towers);

    var expectedOutput = '<rect x=25 y=10 width="50" height="130"/><rect x=85 y=10 width="50" height="130"/><rect x=145 y=10 width="50" height="130"/>'
    expect(towerHtml).toBe(expectedOutput);
  })
});