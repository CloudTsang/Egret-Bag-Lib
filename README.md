# Egret-Bag-Lib
 白鹭小游戏-道具菜单库

用Egret做的显示道具菜单的第三方库

做了三种场景：普通的道具查看菜单、商店买卖菜单、道具合成菜单，其中道具合成因为通常还带点别的操作在这个库中应该具备什么功能还没想好。


TODO:


更完善库的功能，增加排序等等；

egret官方文档也是有一搭没一搭的，社区里很多页面不是挂了就是方法变了，我这个库egret build之后虽然会生成3个库代码文件，但是在运用项目的egretproperties.json里配置路径再egret build却不会像其他第三方库那样自动复制文件到libs下，也不知道是漏了什么配置。现在的使用方法是手动把resource文件夹和bin下libs文件夹复制到运用项目下（目录层级都是设置好的直接复制即可），再添加代码使用。

```

BackBag.init(this.stage, ()=>{
    //加载资源的回调
    let bag = new Bag()

    //添加一些测试物品
    bag.add(new Potion(), 5)
    bag.add(new IronRing())
    bag.add(new IronHelmet())
    bag.add(new DoorKey(), 3)
    bag.add(new Recipe())
    bag.add(new Bomb(), 2)
    bag.add(new Excalibur())
    bag.add(new IronSword())
    bag.add(new IronSpear())
    bag.add(new IronSpear())
    bag.add(new WoodBow())
    bag.add(new FireRod())
    bag.add(new BendedBone(),10)
    bag.add(new OakLeaf(), 20)
    bag.add(new Iron(), 999)

    const sw = this.stage.stageWidth;
    const sh = this.stage.stageHeight;

    //生成显示菜单
    let p = new Panel(bag, PanelType.SHOP_BUY, sw*0.8, sw*0.8*1.5)
    p.x = sw*0.1;
    p.y = 0
    this.addChild(p)
})

```

效果：
![pic](https://raw.githubusercontent.com/CloudTsang/Egret-Bag-Lib/main/pic1.png)
![pic](https://raw.githubusercontent.com/CloudTsang/Egret-Bag-Lib/main/pic2.png)
![pic](https://raw.githubusercontent.com/CloudTsang/Egret-Bag-Lib/main/pic3.png)


```
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
```

道具列表的部分按照官方指引使用了ItemRenderer的做法优化过了，会自动复用几个列表项，这点在代码中把获取图标texture的部分注释掉就能明确看到图标是循环的。

```
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

...

class ItemListObj extends eui.ItemRenderer{
	public constructor() {
		super();
		this.skinName = 'resource/eui_skins/itemListObj.exml';
	}

	protected dataChanged(){
		super.dataChanged()
		this.itemIcon.texture = IconGenerator.getIconTexture(this.data.tex)
	}
}

```



