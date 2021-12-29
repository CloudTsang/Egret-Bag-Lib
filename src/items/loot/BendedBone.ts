class BendedBone extends Item{

	public constructor() {
		super(null)
		this.name = '弯曲的骨头'
		this.descript = '不太坚硬的野兽的骨头'
		
		this.tyMain = ItemType.LOOT
		this.tySub = ItemType.BONE
	}
}