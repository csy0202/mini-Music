const API = require('../../lib/api');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[],
    titles: ['推荐', 'LOOK直播', '归去来兮', '现场', '翻唱', '广场', 'MV', '舞蹈', 'ACG音乐', '萌宠', '生活', '最佳饭制'],
    currentIndex:0,
    videoList:[],
    videoIndex:-1,
    playUrl:'/images/video/video_play.png',
    pauseUrl:'/images/video/video_pause.png'
  },
  getVideoGroupList() { // 获取视频标签列表
    const that = this;
    const arr = [];
     API.getVideoGroupList().then(res =>{
       console.log('****获取视频标签列表****:', res);
       if (res.code === 200) { //更加严谨
         for (let i = 0; i < res.data.length;i++){
           let item = res.data[i];
           if (that.data.titles.indexOf(item.name) > -1){
              arr.push(item);
              console.log('+++++++++++++++++',item.name);
           }
         }
         this.setData({ // 只取数组的前6个数据
           tabs:arr
         })
         this.getVideoGroup();
       }
     })
  },
  clickIndex(e){
    //  console.log(e);
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentIndex:index
    })
    this.getVideoGroup();
  },
  // 获取视频标签下的视频
  getVideoGroup(){
    const {currentIndex} = this.data;
    let that = this;
    const obj = this.data.tabs[currentIndex];
    API.getVideoGroup({ id: obj.id}).then(res => {
      console.log('****获取视频标签下的视频****:', res);
      res.datas.forEach(item =>{
        let dur = item.data.durationms;
        let min = parseInt(dur / 1000 / 60) > 9 ? parseInt(dur / 1000 / 60) : '0' + parseInt(dur / 1000 / 60);
        let sec = parseInt(dur / 1000 % 60) > 9 ? parseInt(dur / 1000 % 60) : '0' + parseInt(dur / 1000 % 60);

        item.data.durationms = min + ':' + sec;
      })
      if (res.code === 200) { //更加严谨
          that.setData({
            videoList:res.datas
          })
      }
    })
  },
  videoPlay(e){
    const index = e.currentTarget.dataset.index;
    this.setData({
      videoIndex: index
    })
    
  },
  videoPause(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      videoIndex: -1
    })

  },
  videoEnd(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      videoIndex: -1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getVideoGroupList();
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