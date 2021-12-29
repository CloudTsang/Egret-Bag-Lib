interface IlistObj{
	name:string
	tex:any
	num:number
	item:Item
}

class ItemList extends eui.Component{
	public static readonly ITEM_SELECTED:string = 'ITEM_SELECTED'
	private itemListContainer:eui.List
	private itemListScroller:eui.Scroller

	protected rawdata:IlistObj[];
	protected collectdata:eui.ArrayCollection

	private _itemHeight:number = -1
	private _ty:PanelType
	public constructor(ty:PanelType) {
		super();
		this.touchEnabled = true
		this._ty = ty
		this.addEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		this.skinName = 'resource/eui_skins/itemlist.exml'
	}

	public setData(d:IlistObj[]){
		this.rawdata = d
		this.refreshList()
		return this.itemListContainer.selectedItem
	}

	public selectItem(i:1|-1){
		const container = this.itemListContainer
		const newi = container.selectedIndex + i
		
		if(newi <= -1){
			return null
		}else if(newi >= this.collectdata.length){
			return null
		}
		if(this._itemHeight == -1){
			const li = container.getChildAt(0);
			if(li){
				this._itemHeight = li.height
			}
		}
		container.selectedIndex = newi
		
		const cn = container.numChildren;
	
		if(i == 1){
			if(newi+1 > (container.getChildAt(cn-1) as ItemListObj).itemIndex){
				container.scrollV += this._itemHeight
			}
		}else{
			if(newi == 0){
				container.scrollV=0
			}
			else if(container.scrollV > 0 && newi-1 < (container.getChildAt(0) as ItemListObj).itemIndex){
				container.scrollV -= this._itemHeight
			}
		}
		return this.rawdata[newi]
		
	}

	protected onComplete(e:any){
		if(!this.itemListContainer){
			return
		}
		this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this)
		
		this.refreshList()
		this.itemListContainer.selectedIndex = 0;
		this.itemListContainer.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemSelected, this)
		this.itemListContainer.useVirtualLayout = true
	}

	public refreshList(){
		const container = this.itemListContainer
		if(!container){
			return
		}
		this.collectdata = new eui.ArrayCollection(this.rawdata)
		container.dataProvider = this.collectdata
		switch(this._ty){
			case PanelType.SHOP_BUY:
				container.itemRenderer = ItemListBuyObj
				break
			case PanelType.SHOP_SELL:
				container.itemRenderer = ItemListSellObj
				break
			default:
				container.itemRenderer = ItemListObj
				break
		}
		
		container.selectedIndex = 0; 
		
		// this.itemListContainer.validateDisplayList()
		
	}

	public refreshItem(obj:IlistObj){
		if(!this.collectdata){
			return
		}
		this.collectdata.refresh()
	}

	protected onItemSelected(e){			
		const item = this.itemListContainer.selectedItem
		const evt = new egret.Event(ItemList.ITEM_SELECTED)
		evt.data = item
		this.dispatchEvent(evt)
	}
}