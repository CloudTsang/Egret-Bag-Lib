class Bomb extends Item{
	public constructor() {
		super(null)
		this.name = '炸弹'
		this.descript = '造成少量爆炸伤害'
		
		this.tyMain = ItemType.NORMAL
		this.tySub = ItemType.BATTLE
	}
}