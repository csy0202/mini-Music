// pages/songList/songList.js
const API = require('../../lib/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     hotList:[],
     songList:[]
  },
  getPlaylistHot() { // 新碟上架
    API.getPlaylistHot().then(res => {
      console.log('****热门歌单****:', res);
      if (res.code === 200) { //更加严谨
        this.setData({ // 只取数组的前6个数据
          hotList: res.tags
        })
        this.getTopPlaylistHighquality(this.data.hotList[0].playlistTag.name);
      }
    })
  },
  getTopPlaylistHighquality(tag,updateTime){
    API.getTopPlaylistHighquality({
      limit:30,
      order:'hot'
      // before:nil
    }).then(res => {
      console.log('****精品歌单****:', res);
      if (res.code === 200) { //更加严谨
        // this.setData({ // 只取数组的前6个数据
        //   hotList: res.tags
        // })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPlaylistHot();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})