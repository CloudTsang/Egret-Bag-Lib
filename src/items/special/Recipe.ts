class Recipe extends Item{
	public recipeID:number
	public constructor() {
		super(null)
		this.name = '配方'
		this.descript = '记载着合成公式'
		
		this.tyMain = ItemType.SPECIAL
		this.tySub = ItemType.RECIPE
	}
}