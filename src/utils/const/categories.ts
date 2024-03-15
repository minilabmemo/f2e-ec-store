export class Category {
  [key: string]: CategoryItem;
}


export interface CategoryItem {
  category: string;
  name: string;
  list: string[];
  path?: string;
}


const categories :Category= {
  all: {
    category:"all",
    name: "全部",
    list: [],

  },
  hot: {
    category:"hot",
    name: "熱銷",
    list: [],
  
  },
  new: {
    category:"new",
    name: "新商品",
    list: []
  },
  upper: {
    category:"upper",
    name: "上衣",
    list: ["長袖", "五分袖", "襯衫"]
  },
  skirt: {
    category:"skirt",
    name: "裙子",
    list: ["長裙", "短裙", "中長裙"]
  },
  pants: {
    category:"pants",
    name: "褲子",
    list: ["長褲", "短褲", "五分褲"]
  },
  coat: {
    category:"coat",
    name: "外套",
    list: ["冬天外套", "薄外套", "小外套"]
  },
  accessories: {
    category:"accessories",
    name: "配件",
    list: []
  },
  styles: {
    category:"styles",
    name: "Styles",
    list: []
  }
};

export default categories;
