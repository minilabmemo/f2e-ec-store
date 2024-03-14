

// export interface Category {
//   [key: number]: {main: string; list: string[], path?: string};/

//   getMain(): string[];
// }
//TODO path
const categories = {
  1: {
    main: "全部",
    list: [],
    path: "",
  },
  2: {
    main: "熱銷",
    list: []
  },
  3: {
    main: "新商品",
    list: []
  },
  4: {
    main: "上衣",
    list: ["長袖", "五分袖", "襯衫"]
  },
  5: {
    main: "裙子",
    list: ["長裙", "短裙", "中長裙"]
  },
  6: {
    main: "褲子",
    list: ["長褲", "短褲", "五分褲"]
  },
  7: {
    main: "外套",
    list: ["冬天外套", "薄外套", "小外套"]
  },
  8: {
    main: "配件",
    list: []
  },
  9: {
    main: "Styles",
    list: []
  },
  getMain(): string[] {
    return Object.values(this).map((item: {main: string}) => item.main);
  }

}
export default categories;