// component/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:Array,
    currentIndex:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickTab(e){
      const index = e.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      })
      this.triggerEvent('clickIndex',index);
    }
  }
})
