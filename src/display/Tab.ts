class Tab extends egret.Sprite{
	public tyMain:ItemType;
	public tySub:ItemType
	private selected:boolean;
	private _mask:egret.Shape;
	private _icon:egret.Bitmap;
	private _w:number;
	public index:number
	public constructor(w:number, i:number ,ty1:ItemType, ty2:ItemType=null) {
		super()
		this.touchEnabled = true
		this.tyMain = ty1
		this.tySub = ty2
		this.index = i
		w = w > 120?120:w
		this._w = w
		this.width = w
		this.createIcon();
		this.createTab();
	}

	public setSelected(v:boolean){
		if(v == this.selected){
			return;
		}
		this.selected = v;
		if(!v){
			this.addChild(this._mask)
		}else{
			this.removeChild(this._mask)
		}
	}

	protected createTab(){
		const w = this._w
		let h = w*1.5
		this.graphics.beginFill(0xFF8C00)
		this.graphics.drawRoundRect(0,0,w,h, 30)
		this.graphics.endFill() 	
		let m = new egret.Shape();
		m.graphics.beginFill(0x000000, 0.5)
		m.graphics.drawRoundRect(0,0,w,h, 30)
		m.graphics.endFill() 
		this.addChild(m)
		this._mask = m
	}

	protected createIcon(){
		const url = IconGenerator.getIconUrl(this.tySub?this.tySub:this.tyMain)
		const iconSize = this._w *0.8
		const padding = this._w *0.1
		let b = new egret.Bitmap() 
		const tex = RES.getRes(url) as egret.Texture
		b.texture = tex
		b.x = padding
		b.y = padding
		b.width = iconSize
		b.height = iconSize
		this.addChild(b)
	}
}