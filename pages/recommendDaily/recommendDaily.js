// pages/recommendDaily/recommendDaily.js
const API = require('../../lib/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendSongs:[]
  },
  getRecommendSongs() { // 获得每日推荐歌曲 ( 需要登录 )
    API.getRecommendSongs().then(res => {
      console.log('****每日推荐歌曲****:', res);
      if (res.code === 200) { //更加严谨
        res.recommend.forEach(item => {
          if (item.alias.length > 0){
            item.alias[0] = '(' + item.alias[0] + ')';
          }else{
            item.alias[0] = '';
          }
          let art = item.artists[0].name;
          for (let i = 1; i < item.artists.length;i++){
            art = art + '/' + item.artists[i].name;
          }
          item.artists[0].name = art;
        })
        this.setData({
          recommendSongs: res.recommend
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecommendSongs();
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