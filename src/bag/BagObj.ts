class BagObj {
	public item:Item

	public name:string
	public num:number
	public tex:string

	public discardable:boolean
	public useable:boolean
	
	public constructor(i:Item, n:number) {
		this.item = i
		this.num = n
		this.name = i.name
		this.tex = i.getTypeIconUrl()

		this.discardable = i.tyMain != ItemType.SPECIAL
		this.useable = i.tyMain == ItemType.NORMAL
	}

	public use(){
		// this.item.use()
		this.num --
	}
	public discard(n:number=1){
		if(!this.discardable){
			console.log("Special items can not be discarded.")
			return false
		}
		if(n > this.num){
			this.num = 0
			return true
		}
		
		this.num -= n
		return true
		
	}

}