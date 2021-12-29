class DoorKey extends Item{
	public KeyID:number
	public constructor() {
		super(null)
		this.name = '钥匙'
		this.descript = '似乎能打开某个地方的锁'
		
		this.tyMain = ItemType.SPECIAL
		this.tySub = ItemType.KEY
	}
}