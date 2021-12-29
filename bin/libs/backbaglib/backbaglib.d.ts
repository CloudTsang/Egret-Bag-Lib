/**道具基类 */
declare class Item {
    name: string;
    tyMain: ItemType;
    tySub: ItemType;
    descript: string;
    /**图标  */
    texUrl: string;
    /**详细图标路径 */
    detailTexUrl: string;
    /**买入价格 */
    valueBuy: number;
    /**卖出价格 */
    valueSell: number;
    constructor(obj: any);
    use(target: any): void;
    unuse(target: any): void;
    dispose(): void;
    getTypeIconUrl(): string;
    static parse(s: string): Item;
}
declare class IronArmor extends Item {
    constructor();
}
declare class BagObj {
    item: Item;
    name: string;
    num: number;
    tex: string;
    discardable: boolean;
    useable: boolean;
    constructor(i: Item, n: number);
    use(): void;
    discard(n?: number): boolean;
}
declare class IconGenerator {
    private static dic;
    static dispose(): void;
    static getIconTexture(key: string): egret.Texture;
    static getIconUrl(ty: ItemType): string;
}
declare class ItemDetail extends eui.Component {
    private containerIcon;
    private containerDetail;
    private txtDetail;
    private txtNum;
    constructor();
    setItem(bo: BagObj): void;
}
interface IlistObj {
    name: string;
    tex: any;
    num: number;
    item: Item;
}
declare class ItemList extends eui.Component {
    static readonly ITEM_SELECTED: string;
    private itemListContainer;
    private itemListScroller;
    protected rawdata: IlistObj[];
    protected collectdata: eui.ArrayCollection;
    private _itemHeight;
    private _ty;
    constructor(ty: PanelType);
    setData(d: IlistObj[]): any;
    selectItem(i: 1 | -1): IlistObj;
    protected onComplete(e: any): void;
    refreshList(): void;
    refreshItem(obj: IlistObj): void;
    protected onItemSelected(e: any): void;
}
declare class ItemListObj extends eui.ItemRenderer {
    protected itemIcon: eui.Image;
    protected txtName: eui.Label;
    protected txtNum: eui.Label;
    protected tex: egret.Texture;
    constructor();
    protected dataChanged(): void;
}
declare class ItemListBuyObj extends ItemListObj {
    constructor();
    protected dataChanged(): void;
}
declare class ItemListSellObj extends ItemListObj {
    constructor();
    protected dataChanged(): void;
}
declare class ItemOpPanel extends eui.Component {
    static readonly ITEM_USE: string;
    static readonly ITEM_DISCARD: string;
    private btnRight;
    private btnLeft;
    private _item;
    private _bag;
    private _ty;
    constructor(b: Bag, ty: PanelType);
    setItem(obj: BagObj): void;
    protected onAdded(e: any): void;
    dispose(): void;
    protected rightBtnHandler(e: any): void;
    protected leftBtnHandler(e: any): void;
}
/**道具菜单使用场景 */
declare enum PanelType {
    /**道具背包 */
    BACKBAG = 0,
    /**商店买入*/
    SHOP_BUY = 1,
    /**商店卖出 */
    SHOP_SELL = 2,
    /**合成*/
    ALCHMIST = 3,
}
declare class Panel extends egret.Sprite {
    private _width;
    private _height;
    protected _panel: egret.Sprite;
    protected _detail: ItemDetail;
    protected _btns: ItemOpPanel;
    protected _tabs: Tab[];
    protected _tabWidth: number;
    protected _curTab: number;
    protected _curBobj: BagObj;
    protected _list: ItemList;
    protected _shadowFilter: egret.DropShadowFilter;
    protected _bag: Bag;
    protected _ty: PanelType;
    protected _allTab: ItemType;
    constructor(bag: Bag, t: PanelType, w: number, h: number);
    protected createTabs(y?: number): number;
    protected createPanel(y?: number): number;
    protected createDetail(y?: number): number;
    protected createBtns(y?: number): void;
    protected createList(): void;
    protected onTabSelected(e: egret.TouchEvent): void;
    protected switchTab(t: Tab): void;
    protected onBagChange(e: egret.Event): void;
    protected showDetail(e: egret.Event): void;
    dispose(): void;
    protected onKeyUp(e: any): void;
}
declare class Tab extends egret.Sprite {
    tyMain: ItemType;
    tySub: ItemType;
    private selected;
    private _mask;
    private _icon;
    private _w;
    index: number;
    constructor(w: number, i: number, ty1: ItemType, ty2?: ItemType);
    setSelected(v: boolean): void;
    protected createTab(): void;
    protected createIcon(): void;
}
declare enum ItemType {
    ALL = 0,
    NORMAL = 1,
    WEAPON = 2,
    ARMOR = 3,
    ACCESSORY = 4,
    LOOT = 5,
    SPECIAL = 6,
    RECOVER = 7,
    BATTLE = 8,
    SWORD = 9,
    CLAYMORE = 10,
    SPEAR = 11,
    BOW = 12,
    ROD = 13,
    HELMET = 14,
    ARMOR2 = 15,
    RING = 16,
    MINE = 17,
    PLANT = 18,
    BONE = 19,
    KEY = 20,
    RECIPE = 21,
}
declare class BackBag {
    static readonly RES_LOADED: string;
    static init(stage: egret.Stage, cb: () => void): void;
}
declare class IronRing extends Item {
    constructor();
}
declare class Bag extends egret.EventDispatcher {
    static readonly BAG_EVENT_ADD: string;
    static readonly BAG_EVENT_DISCARD: string;
    protected arr: BagObj[];
    protected obj: {
        [key: string]: BagObj;
    };
    constructor();
    filter(ty1: ItemType, ty2?: ItemType): BagObj[];
    add(i: Item, n?: number): void;
    /**丢弃n个道具，返回剩余数量 */
    discard(i: Item, n?: number): number;
}
declare class IronHelmet extends Item {
    constructor();
}
declare class BendedBone extends Item {
    constructor();
}
declare class Iron extends Item {
    constructor();
}
declare class OakLeaf extends Item {
    constructor();
}
declare class Bomb extends Item {
    constructor();
}
declare class Potion extends Item {
    constructor();
}
declare class DoorKey extends Item {
    KeyID: number;
    constructor();
}
declare class Recipe extends Item {
    recipeID: number;
    constructor();
}
declare class Excalibur extends Item {
    constructor();
}
declare class FireRod extends Item {
    constructor();
}
declare class IronSpear extends Item {
    constructor();
}
declare class IronSword extends Item {
    constructor();
}
declare class WoodBow extends Item {
    constructor();
}
