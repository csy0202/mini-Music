// pages/songListDetail/songListDetail.js
const API = require('../../lib/api');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    playList:{},
    recommendSongs: [],
    naviH:0
  },
  getPlayList(id) { // 获得每日推荐歌曲 ( 需要登录 )
    API.getPlaylistDetail({id,s:5}).then(res => {
      console.log('****获取歌单详情****:', res);
      if (res.code === 200) { //更加严谨
        res.playlist.tracks.forEach(item => {
          let art = item.ar[0].name;
          for (let i = 1; i < item.ar.length; i++) {
            art = art + '/' + item.ar[i].name;
          }
          item.ar[0].name = art;
        })
        this.setData({
          playList:res.playlist,
          recommendSongs: res.playlist.tracks
        })
      }
    })
  },
  clickSong(e) {
    console.log('item', e);
    let arr = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/player/player?list=' + JSON.stringify(arr),
    })
  },
  clickSongList() {
    let arr = [];
    this.data.recommendSongs.forEach(item => {
      arr.push(item.id);
    })
    // let arr = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/player/player?list=' + JSON.stringify(arr),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('options', options);
    // let id = 2829883282;
    this.getPlayList(options.id);
    this.setData({
      naviH: app.globalData.naviBarH
    })
  },
/**
 * 监听用户滑动页面事件--返回页面在垂直方向已滚动的距离（单位px）
 */
  onPageScroll(e){

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})