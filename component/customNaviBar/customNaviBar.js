// component/customNaviBar/customNaviBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  
  },

  /**
   * 组件的初始数据
   */
  data: {
    naviH:0,
    backT:0,
    backH:0,
  },
  /**
   * 组件所在页面生命周期
   */
  pageLifetimes: {
    show: function () {
      // 页面被展示
      // console.log('*****************app.globalData.naviBarH:', app.globalData.naviBarH)
      this.setData({
        naviH: app.globalData.naviBarH,
        backT: app.globalData.menuButtonObject.top * app.globalData.pxScale
        // backH: app.globalData.menuButtonObject.height * app.globalData.pxScale,
      })
    },
    hide: function () {
      // 页面被隐藏
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
     
  }
})
