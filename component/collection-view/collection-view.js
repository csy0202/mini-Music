// component/collection-view/collection-view.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     datas : Array,
     type:Number,
    clickTap:Boolean
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
    onTap(e){
      console.log('onTap:',e);
      let item = e.currentTarget.dataset.item;
      this.triggerEvent('clickSongListItem', item);
    }
  }
})
