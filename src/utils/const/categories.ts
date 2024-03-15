export class Category {
  [key: string]: CategoryItem;

  constructor(data: { [key: string]: CategoryItem }) {
    Object.keys(data).forEach(key => {
      this[key] = data[key];
    });
  }
}
Category.prototype.getName = function(this: Category) {
  return Object.values(this).map(item => item.name);
} as any;


export interface CategoryItem {
  name: string;
  list: string[];
  path?: string;
}


const categories = new Category({
  all: {
    name: "全部",
    list: [],
    path: "",
  },
  hot: {
    name: "熱銷",
    list: []
  },
  new: {
    name: "新商品",
    list: []
  },
  upper: {
    name: "上衣",
    list: ["長袖", "五分袖", "襯衫"]
  },
  skirt: {
    name: "裙子",
    list: ["長裙", "短裙", "中長裙"]
  },
  pants: {
    name: "褲子",
    list: ["長褲", "短褲", "五分褲"]
  },
  coat: {
    name: "外套",
    list: ["冬天外套", "薄外套", "小外套"]
  },
  accessories: {
    name: "配件",
    list: []
  },
  styles: {
    name: "Styles",
    list: []
  }
});

export default categories;
