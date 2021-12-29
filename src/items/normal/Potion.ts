class Potion extends Item{
	public constructor() {
		super(null)
		this.name = '回复药'
		this.descript = '回复小量生命值'
		
		this.tyMain = ItemType.NORMAL
		this.tySub = ItemType.RECOVER
	}
}