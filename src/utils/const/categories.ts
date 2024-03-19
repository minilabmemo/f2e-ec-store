export interface Category {
  [key: string]: CategoryItem;
}


export interface CategoryItem {
  key: string;
  name: string;
  sub_category?:SubCategory;
}
export interface SubCategory {
  [key: string]: SunCategoryItem;
}
export interface SunCategoryItem {
  key: string;
  name: string;
  
}

const categories :Category= {
  all: {
    key:"all",
    name: "全部",


  },
  hot: {
    key:"hot",
    name: "熱銷",

  
  },
  new: {
    key:"new",
    name: "新商品",
  
  },
  upper: {
    key:"upper",
    name: "上衣",
    sub_category: 
    {
      long: {
      key:"long",
      name: "長袖",
    
    },  
    shirt: {
      key:"shirt",
      name: "襯衫",
    }}
  },
  skirt: {
    key:"skirt",
    name: "裙子",
    sub_category: 
    {
      long: {
      key:"long",
      name: "長裙",
    
    },  
    short: {
      key:"short",
      name: "短裙",
    }}
  },
  pants: {
    key:"pants",
    name: "褲子",
    sub_category: 
    {
      long: {
      key:"long",
      name: "長褲",
    
    },  
    short: {
      key:"short",
      name: "短褲",
    }}
  },
  coat: {
    key:"coat",
    name: "外套",
    sub_category: 
    {
      knitted: {
      key:"knitted",
      name: "針織外套",
    
    },  
    thin: {
      key:"thin",
      name: "薄外套",
    }}
  },
  accessories: {
    key:"accessories",
    name: "配件",
  },
  styles: {
    key:"styles",
    name: "Style",
  }
};

export default categories;
