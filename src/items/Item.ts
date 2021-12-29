/**道具基类 */
class Item {
	public name:string
	public tyMain:ItemType
	public tySub:ItemType
	public descript:string
	/**图标  */
	public texUrl:string
	/**详细图标路径 */
	public detailTexUrl:string
	/**买入价格 */
	public valueBuy:number = 1000
	/**卖出价格 */
	public valueSell:number = 1000
	public constructor(obj:any) {}

	use(target:any){
		throw new Error("not implemented")
	}
	unuse(target:any){
		throw new Error("not implemented")
	}
	dispose(){
		
	}

	getTypeIconUrl(){
		if(!this.texUrl || this.texUrl == ''){
			this.texUrl = IconGenerator.getIconUrl(this.tySub)
		}
		return this.texUrl
	}

	public static parse(s:string):Item{
        let obj = JSON.parse(s, (key:any, value:any)=>{
            if(key == 'tyMain'){
                return ItemType[value]
            }
			if(key == 'tySub'){
				return ItemType[value]
			}
            return value
        })
		return new Item(obj)
	}
}
 