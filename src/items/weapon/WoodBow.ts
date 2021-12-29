class WoodBow extends Item{

	public constructor() {
		super(null)
		this.name = '木弓'
		this.descript = '简易的木质长弓，有效射程10米左右'
		
		this.tyMain = ItemType.WEAPON
		this.tySub = ItemType.BOW
	}
}