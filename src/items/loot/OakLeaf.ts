class OakLeaf extends Item{

	public constructor() {
		super(null)
		this.name = '橡树叶'
		this.descript = '随处可见的树木叶子'
		
		this.tyMain = ItemType.LOOT
		this.tySub = ItemType.PLANT
	}
}