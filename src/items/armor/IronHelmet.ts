class IronHelmet extends Item{
	public constructor() {
		super(null)
		this.name = '铁头盔'
		this.descript = '铁制头盔，能防御住威力较低的攻击'
		
		this.tyMain = ItemType.ARMOR
		this.tySub = ItemType.HELMET
	}
}