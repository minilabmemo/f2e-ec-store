export interface Category {
  [key: string]: CategoryItem
}

export interface CategoryItem {
  path?: string
  key: string
  name: string
  sub_category?: SubCategory
}
export interface SubCategory {
  [key: string]: SunCategoryItem
}
export interface SunCategoryItem {
  key: string
  name: string
}

const categories: Category = {
  all: {
    key: 'all',
    name: '全部'
  },
  hot: {
    key: 'hot',
    name: '熱銷'
  },
  new: {
    key: 'new',
    name: '新商品'
  },
  upper: {
    key: 'upper',
    name: '上衣',
    sub_category: {
      long: {
        key: 'long',
        name: '長袖'
      },
      short: {
        key: 'short',
        name: '短袖'
      },
      shirt: {
        key: 'shirt',
        name: '襯衫'
      },
      tank_top: {
        key: 'tank_top',
        name: '無袖上衣'
      }
    }
  },
  skirt: {
    key: 'skirt',
    name: '裙子',
    sub_category: {
      long: {
        key: 'long',
        name: '長裙'
      },
      short: {
        key: 'short',
        name: '短裙'
      }
    }
  },
  pant: {
    key: 'pant',
    name: '褲子',
    sub_category: {
      long: {
        key: 'long',
        name: '長褲'
      },
      short: {
        key: 'short',
        name: '短褲'
      }
    }
  },
  dress: {
    key: 'dress',
    name: '洋裝'
  },
  coat: {
    key: 'coat',
    name: '外套',
    sub_category: {
      knitted: {
        key: 'knitted',
        name: '針織外套'
      },
      thin: {
        key: 'thin',
        name: '薄外套'
      }
    }
  },
  accessories: {
    key: 'accessories',
    name: '配件'
  }
}

export default categories
