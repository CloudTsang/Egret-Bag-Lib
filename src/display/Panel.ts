/**道具菜单使用场景 */
enum PanelType{
	/**道具背包 */
	BACKBAG,
	/**商店买入*/
	SHOP_BUY,
	/**商店卖出 */
	SHOP_SELL,
	/**合成*/
	ALCHMIST  
}

class Panel extends egret.Sprite{
	private _width:number;
	private _height:number;

	protected _panel:egret.Sprite;
	protected _detail:ItemDetail;
	protected _btns:ItemOpPanel;

	protected _tabs:Tab[];
	protected _tabWidth:number;
	protected _curTab:number;
	protected _curBobj:BagObj;

	protected _list:ItemList

	protected _shadowFilter:egret.DropShadowFilter
	protected _bag:Bag
	protected _ty:PanelType
	protected _allTab:ItemType
	public constructor(bag:Bag, t:PanelType, w:number, h:number) {
		super();
		this._width = w
		this._height = h
		this._bag = bag
		this._ty = t
		this.touchEnabled = true
		if(t == PanelType.ALCHMIST){
			this._allTab = ItemType.LOOT
		}else{
			this._allTab = ItemType.ALL
		}

		let curY = this.createTabs();
		curY = this.createPanel(curY);
		curY = this.createDetail(curY);
		this.createBtns(curY);

		this.createList();
		
		this._shadowFilter = new egret.DropShadowFilter(10,45,null,0.5)
		this.filters = [this._shadowFilter]

		bag.addEventListener(Bag.BAG_EVENT_ADD, this.onBagChange, this)
		bag.addEventListener(Bag.BAG_EVENT_DISCARD, this.onBagChange, this)
		
		const arr = bag.filter(this._allTab)
		if(arr.length != 0){
			this._detail.setItem(arr[0])
			this._btns.setItem(arr[0])
		}else{
			this._detail.setItem(null)
			this._btns.setItem(null)
		}
		this._list.setData(arr)

		// document.addEventListener('keydown', (e)=>{this.onKeyDown(e)});
		document.addEventListener('keyup', (e)=>{this.onKeyUp(e)})
	}

	protected createTabs(y:number=0){
		let tabArr:any[]
		switch(this._ty){
			case PanelType.ALCHMIST:
				tabArr = [
					ItemType.ALL,
					ItemType.MINE,
					ItemType.PLANT,
					ItemType.BONE
				]
				break
			default:
				tabArr = [
					ItemType.ALL,
					ItemType.NORMAL,
					ItemType.WEAPON,
					ItemType.ARMOR,
					ItemType.ACCESSORY,
					ItemType.LOOT,
					ItemType.SPECIAL,
				]
		}
		const tabsWid = this._width / tabArr.length
		let tabs:Tab[] = []
		for(let i=0;i<tabArr.length;i++){
			let t:Tab;
			if(this._ty == PanelType.ALCHMIST && i!=0){
				t = new Tab(tabsWid, i , ItemType.LOOT, tabArr[i])
			}else{
				t = new Tab(tabsWid, i , tabArr[i])
			}
			t.x = i*t.width
			t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabSelected, this);
			this.addChild(t)
			tabs.push(t)
		}
		this._tabs = tabs
		this._tabWidth = tabs[0].width
		this._curTab = 0;
		tabs[0].setSelected(true)
		return tabs[0].width
	}

	protected createPanel(y:number=0){
		let p = new egret.Sprite()
		p.graphics.beginFill(0xFF8C00)
		p.graphics.drawRoundRect(0,y,this._width,this._height-y, 50)
		p.graphics.endFill()
		this._panel = p
		this.addChild(this._panel)
		return this._height
	}

	protected createDetail(y:number=0){
		let d = new ItemDetail()
		d.width = this._width
		d.y = y + 25
		this.addChild(d)
		this._detail = d
		return d.height + y + 25
	}

	protected createBtns(y:number=0){
		let b = new ItemOpPanel(this._bag, this._ty)
		b.width = this._width
		b.y = y + 15
		this.addChild(b)
		this._btns = b
	}

	protected createList(){
		const w = this._width
		let l = new ItemList(this._ty)
		l.width = w
		l.height = this._height -this._tabWidth
		l.y = this._tabWidth
		l.addEventListener(ItemList.ITEM_SELECTED, this.showDetail, this)
		this.addChild(l)
		this._list = l
	}

	protected onTabSelected(e:egret.TouchEvent){
		const t = e.currentTarget as Tab;
		this.switchTab(t)
	}

	protected switchTab(t:Tab){
		const ct = this._tabs[this._curTab]
		if(ct==t){
			return;
		}
		if(ct){
			ct.setSelected(false)
		}
		this._curTab = t.index;
		t.setSelected(true)
		let  arr:BagObj[] = this._bag.filter(t.tyMain==ItemType.ALL?this._allTab:t.tyMain, t.tySub)
		
		const obj = this._list.setData(arr)
		if(obj){
			const obj2 = obj as BagObj 
			this._detail.setItem(obj2)
			this._btns.setItem(obj2)
		}
	}

	protected onBagChange(e:egret.Event){
		// const bobj = e.data as BagObj;
		// if(bobj.item.tyMain == this._curTab.type || this._curTab.type == ItemTypeMain.ALL){
		// 	//背包道具变动 刷新列表
		// }
		if(e.data.allDiscarded){
			const tab = this._tabs[this._curTab]
			const arr = this._bag.filter(tab.tyMain, tab.tySub)
			const obj = this._list.setData(arr) 
			if(obj){
				const obj2 = obj as BagObj 
				this._detail.setItem(obj2)
				this._btns.setItem(obj2)
			}
		}
	}

	protected showDetail(e:egret.Event){
		const bobj = e.data as BagObj
		this._curBobj = bobj
		this._detail.setItem(bobj)
		this._btns.setItem(bobj)
	}

	public dispose(){
		for(let t of this._tabs){
			t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabSelected, this);
		}
		this._bag.removeEventListener(Bag.BAG_EVENT_ADD, this.onBagChange, this)
		this._bag.removeEventListener(Bag.BAG_EVENT_DISCARD, this.onBagChange, this)
	}

	protected onKeyUp(e:any){
		const LEFT = 37;
    	const UP = 38;
    	const RIGHT = 39;
    	const DOWN = 40;
		switch(e.keyCode){
			case UP:
				var obj = this._list.selectItem(-1) as BagObj
				if(obj){
					this._detail.setItem(obj)
					this._btns.setItem(obj)
				}
				break
			case DOWN:
				var obj = this._list.selectItem(1) as BagObj
				if(obj){
					this._detail.setItem(obj)
					this._btns.setItem(obj)
				}
				break
			case RIGHT:
				var i = this._curTab + 1
				if(i >= this._tabs.length){
					i = 0
				}
				this.switchTab(this._tabs[i])
				break
			case LEFT:
				var i = this._curTab - 1
				if(i<0){
					i = this._tabs.length-1
				}
				this.switchTab(this._tabs[i])
				break
		}
	}
}