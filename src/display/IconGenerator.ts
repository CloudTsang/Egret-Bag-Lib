class IconGenerator {
	private static dic:{[key:string]:egret.Texture}={}

	public static dispose(){
		for(let key in IconGenerator.dic){
			RES.destroyRes(key)
		}
		IconGenerator.dic = {}
	}

	public static getIconTexture(key:string):egret.Texture{
		if(IconGenerator.dic[key]){
			return IconGenerator.dic[key]
		}
		try{
			const t = RES.getRes(key) as egret.Texture;
			IconGenerator.dic[key] = t
			return t
		}catch(err){
			console.log("IconGenerator getIconTexture Error: ", err)
			return null
		}
		
	}

	public static getIconUrl(ty:ItemType):string{
		let url:string = ""
		switch(ty){
			case ItemType.ALL:
				url = 'all'
				break
			case ItemType.NORMAL:
				url = 'normal'
				break
			case ItemType.WEAPON:
				url = 'weapon'
				break
			case ItemType.ARMOR:
				url = 'armor'
				break
			case ItemType.ACCESSORY:
				url = 'accessory'
				break
			case ItemType.LOOT:
				url = 'loot'
				break
			case ItemType.SPECIAL:
				url = 'special'
				break
			case ItemType.RECOVER:
				url = 'recoveritem'
				break
			case ItemType.BATTLE:
				url = 'battle'
				break
			case ItemType.SWORD:
				url = 'sword'
				break
			case ItemType.CLAYMORE:
				url = 'claymore'
				break
			case ItemType.SPEAR:
				url = 'spear'
				break
			case ItemType.BOW:
				url = 'bow'
				break
			case ItemType.ROD:
				url = 'rod'
				break
			case ItemType.HELMET:
				url = 'helmet'
				break
			case ItemType.ARMOR2:
				url = 'armor2'
				break
			case ItemType.MINE:
				url = 'mine'
				break
			case ItemType.PLANT:
				url = 'plant'
				break
			case ItemType.BONE:
				url = 'bones'
				break
			case ItemType.KEY:
				url = 'keys'
				break
			case ItemType.RECIPE:
				url = 'recipe'
				break
			case ItemType.RING:
				url = 'ring'
				break
			default:
				throw new Error("wrong item type")
		}
		url = 'icon_item_main_json#' + url
		return url
	}
}