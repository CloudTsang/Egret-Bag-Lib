class ItemDetail extends eui.Component{
	private containerIcon:eui.Component
	private containerDetail:eui.Component
	private txtDetail:eui.Label
	private txtNum:eui.Label
	public constructor() {
		super()
		this.skinName = 'resource/eui_skins/itemdetail.exml'
	}

	public setItem(bo:BagObj){
		this.visible = bo!=null
		if(bo==null){
			return
		}
		const i = bo.item
		if(!i.detailTexUrl || i.detailTexUrl == ''){
			this.containerIcon.visible = false
			this.containerIcon.percentWidth = 0
			this.containerDetail.percentWidth = 100
		}else{
			this.containerIcon.visible = true
			this.containerIcon.percentWidth = 25
			this.containerDetail.percentWidth = 75
		}
		this.txtDetail.text = i.descript
		this.txtNum.text = 'x'+bo.num
	}
}