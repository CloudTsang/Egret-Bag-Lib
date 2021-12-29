class Bag extends egret.EventDispatcher{
	public static readonly BAG_EVENT_ADD:string = 'BAG_EVENT_ADD'
	public static readonly BAG_EVENT_DISCARD:string = 'BAG_EVENT_DISCARD'

	protected arr:BagObj[]
	protected obj:{[key:string]:BagObj}
	public constructor() {
		super()
		this.arr = []
		this.obj = {}
	}

	public filter(ty1:ItemType, ty2:ItemType=null){
		if(ty1 == ItemType.ALL){
			return this.arr
		}
		
		const ret = this.arr.filter((v:BagObj)=>{
			if(ty2){
				return v.item.tySub == ty2
			}
			return v.item.tyMain == ty1
		})
		return ret
	}

	public add(i:Item, n:number = 1){
		const k:string = `${i.tyMain}_${i.tySub}`
		const evt = new egret.Event(Bag.BAG_EVENT_ADD);
		if(this.obj[k]){
			this.obj[k].num += n
		}else{
			let a = new BagObj(i, n)
			this.obj[k] = a
			this.arr.push(a)
		}
		evt.data = this.obj[k]
		this.dispatchEvent(evt);
	}

	/**丢弃n个道具，返回剩余数量 */
	public discard(i:Item, n:number = 1){
		const k:string = `${i.tyMain}_${i.tySub}`
		const evt = new egret.Event(Bag.BAG_EVENT_DISCARD)
		let a = this.obj[k]
		if(a){	
			if(n > a.num) n = a.num
			a.num -= n
			if(a.num == 0){
				delete this.obj[k]
				const i = this.arr.indexOf(a)
				this.arr.splice(i,1 )
			}
			evt.data = {
				item:a,
				allDiscarded:a.num == 0
			}
			this.dispatchEvent(evt);
			return a.num
		}else{
			return -1
		}
		
	}
}