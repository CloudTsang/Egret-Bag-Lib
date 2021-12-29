var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**道具基类 */
var Item = (function () {
    function Item(obj) {
        /**买入价格 */
        this.valueBuy = 1000;
        /**卖出价格 */
        this.valueSell = 1000;
    }
    Item.prototype.use = function (target) {
        throw new Error("not implemented");
    };
    Item.prototype.unuse = function (target) {
        throw new Error("not implemented");
    };
    Item.prototype.dispose = function () {
    };
    Item.prototype.getTypeIconUrl = function () {
        if (!this.texUrl || this.texUrl == '') {
            this.texUrl = IconGenerator.getIconUrl(this.tySub);
        }
        return this.texUrl;
    };
    Item.parse = function (s) {
        var obj = JSON.parse(s, function (key, value) {
            if (key == 'tyMain') {
                return ItemType[value];
            }
            if (key == 'tySub') {
                return ItemType[value];
            }
            return value;
        });
        return new Item(obj);
    };
    return Item;
}());
__reflect(Item.prototype, "Item");
var IronArmor = (function (_super) {
    __extends(IronArmor, _super);
    function IronArmor() {
        var _this = _super.call(this, null) || this;
        _this.name = '铁盔甲';
        _this.descript = '铁制护甲，能防御住威力较低的攻击';
        _this.tyMain = ItemType.ARMOR;
        _this.tySub = ItemType.ARMOR;
        return _this;
    }
    return IronArmor;
}(Item));
__reflect(IronArmor.prototype, "IronArmor");
var BagObj = (function () {
    function BagObj(i, n) {
        this.item = i;
        this.num = n;
        this.name = i.name;
        this.tex = i.getTypeIconUrl();
        this.discardable = i.tyMain != ItemType.SPECIAL;
        this.useable = i.tyMain == ItemType.NORMAL;
    }
    BagObj.prototype.use = function () {
        // this.item.use()
        this.num--;
    };
    BagObj.prototype.discard = function (n) {
        if (n === void 0) { n = 1; }
        if (!this.discardable) {
            console.log("Special items can not be discarded.");
            return false;
        }
        if (n > this.num) {
            this.num = 0;
            return true;
        }
        this.num -= n;
        return true;
    };
    return BagObj;
}());
__reflect(BagObj.prototype, "BagObj");
var IconGenerator = (function () {
    function IconGenerator() {
    }
    IconGenerator.dispose = function () {
        for (var key in IconGenerator.dic) {
            RES.destroyRes(key);
        }
        IconGenerator.dic = {};
    };
    IconGenerator.getIconTexture = function (key) {
        if (IconGenerator.dic[key]) {
            return IconGenerator.dic[key];
        }
        try {
            var t = RES.getRes(key);
            IconGenerator.dic[key] = t;
            return t;
        }
        catch (err) {
            console.log("IconGenerator getIconTexture Error: ", err);
            return null;
        }
    };
    IconGenerator.getIconUrl = function (ty) {
        var url = "";
        switch (ty) {
            case ItemType.ALL:
                url = 'all';
                break;
            case ItemType.NORMAL:
                url = 'normal';
                break;
            case ItemType.WEAPON:
                url = 'weapon';
                break;
            case ItemType.ARMOR:
                url = 'armor';
                break;
            case ItemType.ACCESSORY:
                url = 'accessory';
                break;
            case ItemType.LOOT:
                url = 'loot';
                break;
            case ItemType.SPECIAL:
                url = 'special';
                break;
            case ItemType.RECOVER:
                url = 'recoveritem';
                break;
            case ItemType.BATTLE:
                url = 'battle';
                break;
            case ItemType.SWORD:
                url = 'sword';
                break;
            case ItemType.CLAYMORE:
                url = 'claymore';
                break;
            case ItemType.SPEAR:
                url = 'spear';
                break;
            case ItemType.BOW:
                url = 'bow';
                break;
            case ItemType.ROD:
                url = 'rod';
                break;
            case ItemType.HELMET:
                url = 'helmet';
                break;
            case ItemType.ARMOR2:
                url = 'armor2';
                break;
            case ItemType.MINE:
                url = 'mine';
                break;
            case ItemType.PLANT:
                url = 'plant';
                break;
            case ItemType.BONE:
                url = 'bones';
                break;
            case ItemType.KEY:
                url = 'keys';
                break;
            case ItemType.RECIPE:
                url = 'recipe';
                break;
            case ItemType.RING:
                url = 'ring';
                break;
            default:
                throw new Error("wrong item type");
        }
        url = 'icon_item_main_json#' + url;
        return url;
    };
    IconGenerator.dic = {};
    return IconGenerator;
}());
__reflect(IconGenerator.prototype, "IconGenerator");
var ItemDetail = (function (_super) {
    __extends(ItemDetail, _super);
    function ItemDetail() {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/eui_skins/itemdetail.exml';
        return _this;
    }
    ItemDetail.prototype.setItem = function (bo) {
        this.visible = bo != null;
        if (bo == null) {
            return;
        }
        var i = bo.item;
        if (!i.detailTexUrl || i.detailTexUrl == '') {
            this.containerIcon.visible = false;
            this.containerIcon.percentWidth = 0;
            this.containerDetail.percentWidth = 100;
        }
        else {
            this.containerIcon.visible = true;
            this.containerIcon.percentWidth = 25;
            this.containerDetail.percentWidth = 75;
        }
        this.txtDetail.text = i.descript;
        this.txtNum.text = 'x' + bo.num;
    };
    return ItemDetail;
}(eui.Component));
__reflect(ItemDetail.prototype, "ItemDetail");
var ItemList = (function (_super) {
    __extends(ItemList, _super);
    function ItemList(ty) {
        var _this = _super.call(this) || this;
        _this._itemHeight = -1;
        _this.touchEnabled = true;
        _this._ty = ty;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        _this.skinName = 'resource/eui_skins/itemlist.exml';
        return _this;
    }
    ItemList.prototype.setData = function (d) {
        this.rawdata = d;
        this.refreshList();
        return this.itemListContainer.selectedItem;
    };
    ItemList.prototype.selectItem = function (i) {
        var container = this.itemListContainer;
        var newi = container.selectedIndex + i;
        if (newi <= -1) {
            return null;
        }
        else if (newi >= this.collectdata.length) {
            return null;
        }
        if (this._itemHeight == -1) {
            var li = container.getChildAt(0);
            if (li) {
                this._itemHeight = li.height;
            }
        }
        container.selectedIndex = newi;
        var cn = container.numChildren;
        if (i == 1) {
            if (newi + 1 > container.getChildAt(cn - 1).itemIndex) {
                container.scrollV += this._itemHeight;
            }
        }
        else {
            if (newi == 0) {
                container.scrollV = 0;
            }
            else if (container.scrollV > 0 && newi - 1 < container.getChildAt(0).itemIndex) {
                container.scrollV -= this._itemHeight;
            }
        }
        return this.rawdata[newi];
    };
    ItemList.prototype.onComplete = function (e) {
        if (!this.itemListContainer) {
            return;
        }
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.refreshList();
        this.itemListContainer.selectedIndex = 0;
        this.itemListContainer.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemSelected, this);
        this.itemListContainer.useVirtualLayout = true;
    };
    ItemList.prototype.refreshList = function () {
        var container = this.itemListContainer;
        if (!container) {
            return;
        }
        this.collectdata = new eui.ArrayCollection(this.rawdata);
        container.dataProvider = this.collectdata;
        switch (this._ty) {
            case PanelType.SHOP_BUY:
                container.itemRenderer = ItemListBuyObj;
                break;
            case PanelType.SHOP_SELL:
                container.itemRenderer = ItemListSellObj;
                break;
            default:
                container.itemRenderer = ItemListObj;
                break;
        }
        container.selectedIndex = 0;
        // this.itemListContainer.validateDisplayList()
    };
    ItemList.prototype.refreshItem = function (obj) {
        if (!this.collectdata) {
            return;
        }
        this.collectdata.refresh();
    };
    ItemList.prototype.onItemSelected = function (e) {
        var item = this.itemListContainer.selectedItem;
        var evt = new egret.Event(ItemList.ITEM_SELECTED);
        evt.data = item;
        this.dispatchEvent(evt);
    };
    ItemList.ITEM_SELECTED = 'ITEM_SELECTED';
    return ItemList;
}(eui.Component));
__reflect(ItemList.prototype, "ItemList");
var ItemListObj = (function (_super) {
    __extends(ItemListObj, _super);
    function ItemListObj() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.skinName = 'resource/eui_skins/itemListObj.exml';
        return _this;
    }
    ItemListObj.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.tex = IconGenerator.getIconTexture(this.data.tex);
        this.itemIcon.texture = this.tex;
    };
    return ItemListObj;
}(eui.ItemRenderer));
__reflect(ItemListObj.prototype, "ItemListObj");
var ItemListBuyObj = (function (_super) {
    __extends(ItemListBuyObj, _super);
    function ItemListBuyObj() {
        return _super.call(this) || this;
    }
    ItemListBuyObj.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.txtNum.text = this.data.item.valueBuy + 'G';
    };
    return ItemListBuyObj;
}(ItemListObj));
__reflect(ItemListBuyObj.prototype, "ItemListBuyObj");
var ItemListSellObj = (function (_super) {
    __extends(ItemListSellObj, _super);
    function ItemListSellObj() {
        return _super.call(this) || this;
    }
    ItemListSellObj.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.txtNum.text = this.data.item.valueSell + 'G';
    };
    return ItemListSellObj;
}(ItemListObj));
__reflect(ItemListSellObj.prototype, "ItemListSellObj");
var ItemOpPanel = (function (_super) {
    __extends(ItemOpPanel, _super);
    function ItemOpPanel(b, ty) {
        var _this = _super.call(this) || this;
        _this._bag = b;
        _this._ty = ty;
        _this.addEventListener(eui.UIEvent.ADDED_TO_STAGE, _this.onAdded, _this);
        _this.skinName = 'resource/eui_skins/itemOpBtnPanel.exml';
        return _this;
    }
    ItemOpPanel.prototype.setItem = function (obj) {
        this._item = obj;
        if (obj == null) {
            this.btnLeft.visible = false;
            this.btnRight.visible = false;
            return;
        }
        switch (this._ty) {
            case PanelType.BACKBAG:
                this.btnLeft.visible = obj.discardable;
                this.btnRight.visible = obj.useable;
                break;
            case PanelType.SHOP_SELL:
                this.btnLeft.visible = obj.discardable;
                break;
            case PanelType.SHOP_BUY:
                this.btnLeft.visible = false;
                this.btnRight.visible = true;
                break;
            case PanelType.ALCHMIST:
                this.btnLeft.visible = true;
                this.btnRight.visible = true;
                break;
        }
    };
    ItemOpPanel.prototype.onAdded = function (e) {
        var bL = this.btnLeft;
        var bR = this.btnRight;
        switch (this._ty) {
            case PanelType.BACKBAG:
                bL.visible = true;
                bL.label = '丢弃';
                bR.visible = true;
                bR.label = '使用';
                break;
            case PanelType.SHOP_BUY:
                bL.visible = false;
                bR.visible = true;
                bR.label = '购买';
                break;
            case PanelType.SHOP_SELL:
                bR.visible = false;
                bL.visible = true;
                bL.label = '售卖';
                break;
            case PanelType.ALCHMIST:
                bL.visible = true;
                bL.label = '拿出';
                bR.visible = true;
                bR.label = '放入';
                break;
        }
        this.removeEventListener(eui.UIEvent.ADDED_TO_STAGE, this.onAdded, this);
        this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightBtnHandler, this);
        this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leftBtnHandler, this);
    };
    ItemOpPanel.prototype.dispose = function () {
        this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rightBtnHandler, this);
        this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.leftBtnHandler, this);
    };
    ItemOpPanel.prototype.rightBtnHandler = function (e) {
    };
    ItemOpPanel.prototype.leftBtnHandler = function (e) {
        this._bag.discard(this._item.item);
    };
    ItemOpPanel.ITEM_USE = 'ITEM_USE';
    ItemOpPanel.ITEM_DISCARD = 'ITEM_DISCARD';
    return ItemOpPanel;
}(eui.Component));
__reflect(ItemOpPanel.prototype, "ItemOpPanel");
/**道具菜单使用场景 */
var PanelType;
(function (PanelType) {
    /**道具背包 */
    PanelType[PanelType["BACKBAG"] = 0] = "BACKBAG";
    /**商店买入*/
    PanelType[PanelType["SHOP_BUY"] = 1] = "SHOP_BUY";
    /**商店卖出 */
    PanelType[PanelType["SHOP_SELL"] = 2] = "SHOP_SELL";
    /**合成*/
    PanelType[PanelType["ALCHMIST"] = 3] = "ALCHMIST";
})(PanelType || (PanelType = {}));
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel(bag, t, w, h) {
        var _this = _super.call(this) || this;
        _this._width = w;
        _this._height = h;
        _this._bag = bag;
        _this._ty = t;
        _this.touchEnabled = true;
        if (t == PanelType.ALCHMIST) {
            _this._allTab = ItemType.LOOT;
        }
        else {
            _this._allTab = ItemType.ALL;
        }
        var curY = _this.createTabs();
        curY = _this.createPanel(curY);
        curY = _this.createDetail(curY);
        _this.createBtns(curY);
        _this.createList();
        _this._shadowFilter = new egret.DropShadowFilter(10, 45, null, 0.5);
        _this.filters = [_this._shadowFilter];
        bag.addEventListener(Bag.BAG_EVENT_ADD, _this.onBagChange, _this);
        bag.addEventListener(Bag.BAG_EVENT_DISCARD, _this.onBagChange, _this);
        var arr = bag.filter(_this._allTab);
        if (arr.length != 0) {
            _this._detail.setItem(arr[0]);
            _this._btns.setItem(arr[0]);
        }
        else {
            _this._detail.setItem(null);
            _this._btns.setItem(null);
        }
        _this._list.setData(arr);
        // document.addEventListener('keydown', (e)=>{this.onKeyDown(e)});
        document.addEventListener('keyup', function (e) { _this.onKeyUp(e); });
        return _this;
    }
    Panel.prototype.createTabs = function (y) {
        if (y === void 0) { y = 0; }
        var tabArr;
        switch (this._ty) {
            case PanelType.ALCHMIST:
                tabArr = [
                    ItemType.ALL,
                    ItemType.MINE,
                    ItemType.PLANT,
                    ItemType.BONE
                ];
                break;
            default:
                tabArr = [
                    ItemType.ALL,
                    ItemType.NORMAL,
                    ItemType.WEAPON,
                    ItemType.ARMOR,
                    ItemType.ACCESSORY,
                    ItemType.LOOT,
                    ItemType.SPECIAL,
                ];
        }
        var tabsWid = this._width / tabArr.length;
        var tabs = [];
        for (var i = 0; i < tabArr.length; i++) {
            var t = void 0;
            if (this._ty == PanelType.ALCHMIST && i != 0) {
                t = new Tab(tabsWid, i, ItemType.LOOT, tabArr[i]);
            }
            else {
                t = new Tab(tabsWid, i, tabArr[i]);
            }
            t.x = i * t.width;
            t.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabSelected, this);
            this.addChild(t);
            tabs.push(t);
        }
        this._tabs = tabs;
        this._tabWidth = tabs[0].width;
        this._curTab = 0;
        tabs[0].setSelected(true);
        return tabs[0].width;
    };
    Panel.prototype.createPanel = function (y) {
        if (y === void 0) { y = 0; }
        var p = new egret.Sprite();
        p.graphics.beginFill(0xFF8C00);
        p.graphics.drawRoundRect(0, y, this._width, this._height - y, 50);
        p.graphics.endFill();
        this._panel = p;
        this.addChild(this._panel);
        return this._height;
    };
    Panel.prototype.createDetail = function (y) {
        if (y === void 0) { y = 0; }
        var d = new ItemDetail();
        d.width = this._width;
        d.y = y + 25;
        this.addChild(d);
        this._detail = d;
        return d.height + y + 25;
    };
    Panel.prototype.createBtns = function (y) {
        if (y === void 0) { y = 0; }
        var b = new ItemOpPanel(this._bag, this._ty);
        b.width = this._width;
        b.y = y + 15;
        this.addChild(b);
        this._btns = b;
    };
    Panel.prototype.createList = function () {
        var w = this._width;
        var l = new ItemList(this._ty);
        l.width = w;
        l.height = this._height - this._tabWidth;
        l.y = this._tabWidth;
        l.addEventListener(ItemList.ITEM_SELECTED, this.showDetail, this);
        this.addChild(l);
        this._list = l;
    };
    Panel.prototype.onTabSelected = function (e) {
        var t = e.currentTarget;
        this.switchTab(t);
    };
    Panel.prototype.switchTab = function (t) {
        var ct = this._tabs[this._curTab];
        if (ct == t) {
            return;
        }
        if (ct) {
            ct.setSelected(false);
        }
        this._curTab = t.index;
        t.setSelected(true);
        var arr = this._bag.filter(t.tyMain == ItemType.ALL ? this._allTab : t.tyMain, t.tySub);
        var obj = this._list.setData(arr);
        if (obj) {
            var obj2 = obj;
            this._detail.setItem(obj2);
            this._btns.setItem(obj2);
        }
    };
    Panel.prototype.onBagChange = function (e) {
        // const bobj = e.data as BagObj;
        // if(bobj.item.tyMain == this._curTab.type || this._curTab.type == ItemTypeMain.ALL){
        // 	//背包道具变动 刷新列表
        // }
        if (e.data.allDiscarded) {
            var tab = this._tabs[this._curTab];
            var arr = this._bag.filter(tab.tyMain, tab.tySub);
            var obj = this._list.setData(arr);
            if (obj) {
                var obj2 = obj;
                this._detail.setItem(obj2);
                this._btns.setItem(obj2);
            }
        }
    };
    Panel.prototype.showDetail = function (e) {
        var bobj = e.data;
        this._curBobj = bobj;
        this._detail.setItem(bobj);
        this._btns.setItem(bobj);
    };
    Panel.prototype.dispose = function () {
        for (var _i = 0, _a = this._tabs; _i < _a.length; _i++) {
            var t = _a[_i];
            t.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabSelected, this);
        }
        this._bag.removeEventListener(Bag.BAG_EVENT_ADD, this.onBagChange, this);
        this._bag.removeEventListener(Bag.BAG_EVENT_DISCARD, this.onBagChange, this);
    };
    Panel.prototype.onKeyUp = function (e) {
        var LEFT = 37;
        var UP = 38;
        var RIGHT = 39;
        var DOWN = 40;
        switch (e.keyCode) {
            case UP:
                var obj = this._list.selectItem(-1);
                if (obj) {
                    this._detail.setItem(obj);
                    this._btns.setItem(obj);
                }
                break;
            case DOWN:
                var obj = this._list.selectItem(1);
                if (obj) {
                    this._detail.setItem(obj);
                    this._btns.setItem(obj);
                }
                break;
            case RIGHT:
                var i = this._curTab + 1;
                if (i >= this._tabs.length) {
                    i = 0;
                }
                this.switchTab(this._tabs[i]);
                break;
            case LEFT:
                var i = this._curTab - 1;
                if (i < 0) {
                    i = this._tabs.length - 1;
                }
                this.switchTab(this._tabs[i]);
                break;
        }
    };
    return Panel;
}(egret.Sprite));
__reflect(Panel.prototype, "Panel");
var Tab = (function (_super) {
    __extends(Tab, _super);
    function Tab(w, i, ty1, ty2) {
        if (ty2 === void 0) { ty2 = null; }
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.tyMain = ty1;
        _this.tySub = ty2;
        _this.index = i;
        w = w > 120 ? 120 : w;
        _this._w = w;
        _this.width = w;
        _this.createIcon();
        _this.createTab();
        return _this;
    }
    Tab.prototype.setSelected = function (v) {
        if (v == this.selected) {
            return;
        }
        this.selected = v;
        if (!v) {
            this.addChild(this._mask);
        }
        else {
            this.removeChild(this._mask);
        }
    };
    Tab.prototype.createTab = function () {
        var w = this._w;
        var h = w * 1.5;
        this.graphics.beginFill(0xFF8C00);
        this.graphics.drawRoundRect(0, 0, w, h, 30);
        this.graphics.endFill();
        var m = new egret.Shape();
        m.graphics.beginFill(0x000000, 0.5);
        m.graphics.drawRoundRect(0, 0, w, h, 30);
        m.graphics.endFill();
        this.addChild(m);
        this._mask = m;
    };
    Tab.prototype.createIcon = function () {
        var url = IconGenerator.getIconUrl(this.tySub ? this.tySub : this.tyMain);
        var iconSize = this._w * 0.8;
        var padding = this._w * 0.1;
        var b = new egret.Bitmap();
        var tex = RES.getRes(url);
        b.texture = tex;
        b.x = padding;
        b.y = padding;
        b.width = iconSize;
        b.height = iconSize;
        this.addChild(b);
    };
    return Tab;
}(egret.Sprite));
__reflect(Tab.prototype, "Tab");
var ItemType;
(function (ItemType) {
    ItemType[ItemType["ALL"] = 0] = "ALL";
    ItemType[ItemType["NORMAL"] = 1] = "NORMAL";
    ItemType[ItemType["WEAPON"] = 2] = "WEAPON";
    ItemType[ItemType["ARMOR"] = 3] = "ARMOR";
    ItemType[ItemType["ACCESSORY"] = 4] = "ACCESSORY";
    ItemType[ItemType["LOOT"] = 5] = "LOOT";
    ItemType[ItemType["SPECIAL"] = 6] = "SPECIAL";
    ItemType[ItemType["RECOVER"] = 7] = "RECOVER";
    ItemType[ItemType["BATTLE"] = 8] = "BATTLE";
    ItemType[ItemType["SWORD"] = 9] = "SWORD";
    ItemType[ItemType["CLAYMORE"] = 10] = "CLAYMORE";
    ItemType[ItemType["SPEAR"] = 11] = "SPEAR";
    ItemType[ItemType["BOW"] = 12] = "BOW";
    ItemType[ItemType["ROD"] = 13] = "ROD";
    ItemType[ItemType["HELMET"] = 14] = "HELMET";
    ItemType[ItemType["ARMOR2"] = 15] = "ARMOR2";
    ItemType[ItemType["RING"] = 16] = "RING";
    ItemType[ItemType["MINE"] = 17] = "MINE";
    ItemType[ItemType["PLANT"] = 18] = "PLANT";
    ItemType[ItemType["BONE"] = 19] = "BONE";
    ItemType[ItemType["KEY"] = 20] = "KEY";
    ItemType[ItemType["RECIPE"] = 21] = "RECIPE";
})(ItemType || (ItemType = {}));
var BackBag = (function () {
    function BackBag() {
    }
    BackBag.init = function (stage, cb) {
        var _this = this;
        RES.loadConfig("resource/bag.res.json", "resource/")
            .then(function () {
            return RES.loadGroup("backbag", 0);
        })
            .then(function () {
            var theme = new eui.Theme("resource/bag.thm.json", stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                cb();
            }, _this);
        });
    };
    // public static init(){
    // 	RES.loadConfig("resource/bag.res.json", "resource/");
    // 	RES.loadGroup("backbag", 0); 
    // }
    BackBag.RES_LOADED = 'RES_LOADED';
    return BackBag;
}());
__reflect(BackBag.prototype, "BackBag");
var IronRing = (function (_super) {
    __extends(IronRing, _super);
    function IronRing() {
        var _this = _super.call(this, null) || this;
        _this.name = '铁指环';
        _this.descript = '铁制指环，稍微增加佩戴者的力量';
        _this.tyMain = ItemType.ACCESSORY;
        _this.tySub = ItemType.RING;
        return _this;
    }
    return IronRing;
}(Item));
__reflect(IronRing.prototype, "IronRing");
var Bag = (function (_super) {
    __extends(Bag, _super);
    function Bag() {
        var _this = _super.call(this) || this;
        _this.arr = [];
        _this.obj = {};
        return _this;
    }
    Bag.prototype.filter = function (ty1, ty2) {
        if (ty2 === void 0) { ty2 = null; }
        if (ty1 == ItemType.ALL) {
            return this.arr;
        }
        var ret = this.arr.filter(function (v) {
            if (ty2) {
                return v.item.tySub == ty2;
            }
            return v.item.tyMain == ty1;
        });
        return ret;
    };
    Bag.prototype.add = function (i, n) {
        if (n === void 0) { n = 1; }
        var k = i.tyMain + "_" + i.tySub;
        var evt = new egret.Event(Bag.BAG_EVENT_ADD);
        if (this.obj[k]) {
            this.obj[k].num += n;
        }
        else {
            var a = new BagObj(i, n);
            this.obj[k] = a;
            this.arr.push(a);
        }
        evt.data = this.obj[k];
        this.dispatchEvent(evt);
    };
    /**丢弃n个道具，返回剩余数量 */
    Bag.prototype.discard = function (i, n) {
        if (n === void 0) { n = 1; }
        var k = i.tyMain + "_" + i.tySub;
        var evt = new egret.Event(Bag.BAG_EVENT_DISCARD);
        var a = this.obj[k];
        if (a) {
            if (n > a.num)
                n = a.num;
            a.num -= n;
            if (a.num == 0) {
                delete this.obj[k];
                var i_1 = this.arr.indexOf(a);
                this.arr.splice(i_1, 1);
            }
            evt.data = {
                item: a,
                allDiscarded: a.num == 0
            };
            this.dispatchEvent(evt);
            return a.num;
        }
        else {
            return -1;
        }
    };
    Bag.BAG_EVENT_ADD = 'BAG_EVENT_ADD';
    Bag.BAG_EVENT_DISCARD = 'BAG_EVENT_DISCARD';
    return Bag;
}(egret.EventDispatcher));
__reflect(Bag.prototype, "Bag");
var IronHelmet = (function (_super) {
    __extends(IronHelmet, _super);
    function IronHelmet() {
        var _this = _super.call(this, null) || this;
        _this.name = '铁头盔';
        _this.descript = '铁制头盔，能防御住威力较低的攻击';
        _this.tyMain = ItemType.ARMOR;
        _this.tySub = ItemType.HELMET;
        return _this;
    }
    return IronHelmet;
}(Item));
__reflect(IronHelmet.prototype, "IronHelmet");
var BendedBone = (function (_super) {
    __extends(BendedBone, _super);
    function BendedBone() {
        var _this = _super.call(this, null) || this;
        _this.name = '弯曲的骨头';
        _this.descript = '不太坚硬的野兽的骨头';
        _this.tyMain = ItemType.LOOT;
        _this.tySub = ItemType.BONE;
        return _this;
    }
    return BendedBone;
}(Item));
__reflect(BendedBone.prototype, "BendedBone");
var Iron = (function (_super) {
    __extends(Iron, _super);
    function Iron() {
        var _this = _super.call(this, null) || this;
        _this.name = '铁矿石';
        _this.descript = '坚硬适中且容易开采的矿石';
        _this.tyMain = ItemType.LOOT;
        _this.tySub = ItemType.MINE;
        return _this;
    }
    return Iron;
}(Item));
__reflect(Iron.prototype, "Iron");
var OakLeaf = (function (_super) {
    __extends(OakLeaf, _super);
    function OakLeaf() {
        var _this = _super.call(this, null) || this;
        _this.name = '橡树叶';
        _this.descript = '随处可见的树木叶子';
        _this.tyMain = ItemType.LOOT;
        _this.tySub = ItemType.PLANT;
        return _this;
    }
    return OakLeaf;
}(Item));
__reflect(OakLeaf.prototype, "OakLeaf");
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        var _this = _super.call(this, null) || this;
        _this.name = '炸弹';
        _this.descript = '造成少量爆炸伤害';
        _this.tyMain = ItemType.NORMAL;
        _this.tySub = ItemType.BATTLE;
        return _this;
    }
    return Bomb;
}(Item));
__reflect(Bomb.prototype, "Bomb");
var Potion = (function (_super) {
    __extends(Potion, _super);
    function Potion() {
        var _this = _super.call(this, null) || this;
        _this.name = '回复药';
        _this.descript = '回复小量生命值';
        _this.tyMain = ItemType.NORMAL;
        _this.tySub = ItemType.RECOVER;
        return _this;
    }
    return Potion;
}(Item));
__reflect(Potion.prototype, "Potion");
var DoorKey = (function (_super) {
    __extends(DoorKey, _super);
    function DoorKey() {
        var _this = _super.call(this, null) || this;
        _this.name = '钥匙';
        _this.descript = '似乎能打开某个地方的锁';
        _this.tyMain = ItemType.SPECIAL;
        _this.tySub = ItemType.KEY;
        return _this;
    }
    return DoorKey;
}(Item));
__reflect(DoorKey.prototype, "DoorKey");
var Recipe = (function (_super) {
    __extends(Recipe, _super);
    function Recipe() {
        var _this = _super.call(this, null) || this;
        _this.name = '配方';
        _this.descript = '记载着合成公式';
        _this.tyMain = ItemType.SPECIAL;
        _this.tySub = ItemType.RECIPE;
        return _this;
    }
    return Recipe;
}(Item));
__reflect(Recipe.prototype, "Recipe");
var Excalibur = (function (_super) {
    __extends(Excalibur, _super);
    function Excalibur() {
        var _this = _super.call(this, null) || this;
        _this.name = '誓约胜利之剑';
        _this.descript = '传说中的宝剑';
        _this.tyMain = ItemType.WEAPON;
        _this.tySub = ItemType.CLAYMORE;
        _this.valueBuy = 99999;
        return _this;
    }
    return Excalibur;
}(Item));
__reflect(Excalibur.prototype, "Excalibur");
var FireRod = (function (_super) {
    __extends(FireRod, _super);
    function FireRod() {
        var _this = _super.call(this, null) || this;
        _this.name = '火焰之杖';
        _this.descript = '寄宿火之魔力的法杖';
        _this.tyMain = ItemType.WEAPON;
        _this.tySub = ItemType.ROD;
        return _this;
    }
    return FireRod;
}(Item));
__reflect(FireRod.prototype, "FireRod");
var IronSpear = (function (_super) {
    __extends(IronSpear, _super);
    function IronSpear() {
        var _this = _super.call(this, null) || this;
        _this.name = '铁长枪';
        _this.descript = '铁制长枪，能贯穿敌人的铠甲';
        _this.tyMain = ItemType.WEAPON;
        _this.tySub = ItemType.SPEAR;
        return _this;
    }
    return IronSpear;
}(Item));
__reflect(IronSpear.prototype, "IronSpear");
var IronSword = (function (_super) {
    __extends(IronSword, _super);
    function IronSword() {
        var _this = _super.call(this, null) || this;
        _this.name = '铁片手剑';
        _this.descript = '铁制短剑，轻盈而容易使用';
        _this.tyMain = ItemType.WEAPON;
        _this.tySub = ItemType.SWORD;
        return _this;
    }
    return IronSword;
}(Item));
__reflect(IronSword.prototype, "IronSword");
var WoodBow = (function (_super) {
    __extends(WoodBow, _super);
    function WoodBow() {
        var _this = _super.call(this, null) || this;
        _this.name = '木弓';
        _this.descript = '简易的木质长弓，有效射程10米左右';
        _this.tyMain = ItemType.WEAPON;
        _this.tySub = ItemType.BOW;
        return _this;
    }
    return WoodBow;
}(Item));
__reflect(WoodBow.prototype, "WoodBow");
