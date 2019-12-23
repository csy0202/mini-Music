// pages/songList/songList.js
const API = require('../../lib/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
     hotList:[],
     songList:[],
     currentIndex:0,
     lastTime:0,
     hasNoData:false
  },
  clickIndex(e) {
     console.log(e);
    const index = e.detail;
    this.setData({
      currentIndex: index
    })
    // this.getVideoGroup();
    this.getTopPlaylistHighquality(this.data.hotList[this.data.currentIndex].name,0,false);
  },
  getPlaylistHot() { // 新碟上架
    API.getPlaylistHot().then(res => {
      console.log('****热门歌单****:', res);
      if (res.code === 200) { //更加严谨
        res.tags.unshift({name:'精品'});
        this.setData({ // 只取数组的前6个数据
          hotList: res.tags
        })
        this.getTopPlaylistHighquality(this.data.hotList[this.data.currentIndex].name,0,false);
      }
    })
  },
  getTopPlaylistHighquality(tag,updateTime,ispull){
    console.log('刷新时间：', updateTime, ispull);
    let data = {};
    if (tag != '精品'){
      data['cat'] = tag;
    }
    if (updateTime != 0){
      data['before'] = updateTime;
    }
    data['limit'] = 12;
    
    API.getTopPlaylistHighquality(data).then(res => {
      console.log('****精品歌单****:', res);
      if (res.code === 200) { //更加严谨
        res.playlists.forEach(item => {
          let result = item.playCount;
          if (item.playCount > 100000000) {
            let num = parseFloat(item.playCount / 100000000);
            result = Math.round(num * 10) / 10 + '亿';
          } else if (item.playCount > 10000) {
            result = parseInt(item.playCount / 10000) + '万';
          }
          item.playCount = result;
        })
        this.setData({ // 只取数组的前6个数据
          songList: ispull ? this.data.songList.concat(res.playlists) :res.playlists,
          lastTime: res.lasttime,
          hasNoData: res.playlists.length < 12
        })
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
    
    if (!this.data.hasNoData){
      this.getTopPlaylistHighquality(this.data.hotList[this.data.currentIndex].name, this.data.lastTime, true);
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})