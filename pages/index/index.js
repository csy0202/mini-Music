//index.js
const API = require('../../lib/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickTap:true,
    banner: [],
    subPages: [{
        title: '每日推荐',
        imageUrl: '/images/find/icon_1.png',
      pagePath: '/pages/recommendDaily/recommendDaily'
      },
      {
        title: '歌单',
        imageUrl: '/images/find/icon_2.png',
        pagePath: '/pages/songList/songList'
      },
      {
        title: '排行榜',
        imageUrl: '/images/find/icon_3.png',
        pagePath: '/pages/rankList/rankList'
      },
      {
        title: '电台',
        imageUrl: '/images/find/icon_4.png',
        pagePath: ''
      },
      {
        title: '直播',
        imageUrl: '/images/find/icon_5.png',
        pagePath: ''
      }],
    recommendList:[], //新歌推荐
    newAlbum:[],//新碟
    newSong: [],//新歌
  },

  clickTitle(e){
    const data = e.currentTarget.dataset;
    this.setData({
      clickTap: data.tap
    })

  },
  loginCellphone(){
    API.loginCellphone({
      phone: '17621299909',
      password:'csy19890202csy'
    }).then(res => {
      console.log('****登录****:', res);
      if (res.code === 200) { //更加严谨
        // this.setData({
        //   banner: res.banners
        // })
      }
    })
  },
  getBanner() { // 轮播图
    API.getBanner({
      type: 2
    }).then(res => {
      console.log('****轮播****:', res);
      if (res.code === 200) { //更加严谨
        this.setData({
          banner: res.banners
        })
      }
    })
  },
  getPersonalized(){// 获取推荐歌单
    API.getPersonalized().then(res=>{
      console.log('****推荐****:', res);
      if (res.code === 200) { //更加严谨
        let list = res.result.slice(0, 6);
       list.forEach(item => {
         let result = item.playCount;
         if (item.playCount > 100000000){
           let num = parseFloat(item.playCount / 100000000);
           result = Math.round(num * 10) / 10 + '亿';
         } else if (item.playCount > 10000){
           result = parseInt(item.playCount / 10000) + '万';
         }
         item.playCount = result;
       })
        this.setData({ // 只取数组的前6个数据
          recommendList: list
        })
      }
    })
  },
  getNewAlbum(){ // 新碟上架
    API.getNewAlbum().then(res=>{
      console.log('****新碟上架****:', res);
      if (res.code === 200) { //更加严谨
        this.setData({ // 只取数组的前6个数据
          newAlbum: res.albums.slice(0,3)
        })
      }
    })
  },
  getPersonalizedNewSong(){
    API.getPersonalizedNewSong().then(res => {
      console.log('****新歌****:', res);
      let songs = res.result.slice(0, 3);
      songs.forEach(item => {
        item.picUrl = item.song.album.picUrl;
      });
      if (res.code === 200) { //更加严谨
        this.setData({ // 只取数组的前6个数据
          newSong: songs
        })
      }
    })
  },
  clickSongListItem(e){
    console.log('clickSongListItem',e);
    // let arr = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/songListDetail/songListDetail?id=' + e.detail.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loginCellphone();
    this.getBanner();
    this.getPersonalized();
    this.getNewAlbum();
    this.getPersonalizedNewSong();
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