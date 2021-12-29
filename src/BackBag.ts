class BackBag {
	// public static init(){
	// 	RES.loadConfig("resource/bag.res.json", "resource/");
	// 	RES.loadGroup("backbag", 0); 
	// }
	public static readonly RES_LOADED:string = 'RES_LOADED'
	public static init(stage:egret.Stage, cb:()=>void){
		RES.loadConfig("resource/bag.res.json", "resource/")
		.then(()=>{
			return RES.loadGroup("backbag", 0)
		})
		.then(()=>{
			let theme = new eui.Theme("resource/bag.thm.json", stage);
			theme.addEventListener(eui.UIEvent.COMPLETE, () => {
				cb()
			}, this);
		})
        
        
	}
}