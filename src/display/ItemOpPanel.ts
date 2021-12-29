class ItemOpPanel extends eui.Component{
	public static readonly ITEM_USE:string = 'ITEM_USE'
	public static readonly ITEM_DISCARD:string = 'ITEM_DISCARD'
	private btnRight:eui.Button
	private btnLeft:eui.Button
	private _item:BagObj
	private _bag:Bag
	private _ty:PanelType
	public constructor(b:Bag, ty:PanelType) {
		super()
		this._bag = b
		this._ty = ty
		this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
		this.skinName = 'resource/eui_skins/itemOpBtnPanel.exml'
	}

	public setItem(obj:BagObj){
		this._item = obj
		if(obj == null){
			this.btnLeft.visible = false
			this.btnRight.visible = false
			return
		}
		switch(this._ty){
			case PanelType.BACKBAG:
				this.btnLeft.visible = obj.discardable
				this.btnRight.visible = obj.useable
				break
			case PanelType.SHOP_SELL:
				this.btnLeft.visible = obj.discardable
				break
			case PanelType.SHOP_BUY:
				this.btnLeft.visible = false
				this.btnRight.visible = true
				break
			case PanelType.ALCHMIST:
				this.btnLeft.visible = true
				this.btnRight.visible = true
				break

		}
	}

	protected onAdded(e:any){
		const bL = this.btnLeft
		const bR = this.btnRight
		switch(this._ty){
			case PanelType.BACKBAG:
				bL.visible = true
				bL.label = '丢弃'
				bR.visible = true
				bR.label = '使用'
				break
			case PanelType.SHOP_BUY:
				bL.visible = false
				bR.visible = true
				bR.label = '购买'
				break
			case PanelType.SHOP_SELL:
				bR.visible = false
				bL.visible = true
				bL.label = '售卖'
				break
			case PanelType.ALCHMIST:
				bL.visible = true
				bL.label = '拿出'
				bR.visible = true
				bR.label = '放入'
				break
		}

		this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this)
		this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightBtnHandler, this);
		this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leftBtnHandler, this);
	}

	public dispose(){
		this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rightBtnHandler, this);
		this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.leftBtnHandler, this);
	}

	protected rightBtnHandler(e:any){
	}

	protected leftBtnHandler(e:any){
		this._bag.discard(this._item.item)
	}
}