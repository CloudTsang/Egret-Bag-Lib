class Iron extends Item{

	public constructor() {
		super(null)
		this.name = '铁矿石'
		this.descript = '坚硬适中且容易开采的矿石'
		
		this.tyMain = ItemType.LOOT
		this.tySub = ItemType.MINE
	}
}