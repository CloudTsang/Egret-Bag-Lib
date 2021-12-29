class ItemListObj extends eui.ItemRenderer{
	protected itemIcon:eui.Image
	protected txtName:eui.Label
	protected txtNum:eui.Label
	protected tex:egret.Texture
	public constructor() {
		super();
		this.touchEnabled  = true
		this.skinName = 'resource/eui_skins/itemListObj.exml';
	}

	protected dataChanged(){
		super.dataChanged()
		this.tex = IconGenerator.getIconTexture(this.data.tex)
		this.itemIcon.texture = this.tex
	}
}


class ItemListBuyObj extends ItemListObj{
	public constructor() {
		super();	
	}
	protected dataChanged(){
		super.dataChanged()
		this.txtNum.text = this.data.item.valueBuy + 'G'
	}
}

class ItemListSellObj extends ItemListObj{
	public constructor() {
		super();	
	}
	protected dataChanged(){
		super.dataChanged()
		this.txtNum.text = this.data.item.valueSell + 'G'
	}
}