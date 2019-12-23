// pages/player/player.js
const API = require('../../lib/api');
const playerManager = wx.getBackgroundAudioManager();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: [],
    currentSong: null,
    isIpx: false,
    // playerManager: null,
    currentUrl: '',
    timeL: '00:00',
    timeR: '00:00',
    playImgArr: ['loop', 'one', 'order', 'shuffle'],
    orderIdx: 0,
    isPlay: true,
    isShowPop: false,
    titleArr: ['列表循环', '单曲循环', '顺序播放', '随机播放'],
    currentIndex: 0,
    sliderValue: 0,
    lrcArr: [],
    marginTop: 0,
    currentLine: 0,
    showLrc:false,
  },
  getSongDetail(ids) { // 获取歌曲详情 ( 需要登录 )
    var that = this;
    API.getSongDetail({
      ids
    }).then(res => {
      console.log('****获取歌曲详情****:', res);
      if (res.code === 200) { //更加严谨
        res.songs.forEach(item => {
          let art = item.ar[0].name;
          for (let i = 1; i < item.ar.length; i++) {
            art = art + '/' + item.ar[i].name;
          }
          item.ar[0].name = art;
          item.dt = parseInt(item.dt / 1000);
        })
        this.setData({
          songList: res.songs,
          currentIndex: 0,
        })
        that.getSongUrl();
      }
    })
  },
  getSongUrl() { // 获取歌曲URL
    var that = this;
    this.setData({
      currentSong: that.data.songList[that.data.currentIndex],
      currentLine:0,
      marginTop:0
    })
    API.getSongUrl({
      id: that.data.currentSong.id
    }).then(res => {
      console.log('****获取音乐url****:', res);
      if (res.code === 200) { //更加严谨
        that.setData({
          currentUrl: res.data[0].url || ''
        })
        that.getSongLrc();
        that.palyMusic();
      }
    })
  },
  getSongLrc() { // 获取歌词
    var that = this;
    API.getLyric({
      id: that.data.currentSong.id
    }).then(res => {
      console.log('****获取歌词****:', res);
      if (res.code === 200) { //更加严谨
        // let arr = that.parseLyric(res.lrc.lyric);

        that.setData({
          lrcArr: that.sliceNull(that.parseLyric(res.lrc.lyric))
        })
        // that.palyMusic();
      }
    })
  },
  parseLyric(text) {
    // console.log("TCL: parseLyric -> text", text)
    let result = [];
    var lines = text.split('\n'); //切割每一行
    var pattern = /\[\d{2}:\d{2}.\d{2}\]/g; //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
      lines = lines.slice(1);
    };
    //上面用'\n'生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
      //提取出时间[xx:xx.xx]
      var time = v.match(pattern),
        //提取歌词
        value = v.replace(pattern, '');
      // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
      time.forEach(function(v1, i1, a1) {
        //去掉时间里的中括号得到xx:xx.xx
        var t = v1.slice(1, -1).split(':');
        //将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
      });
    });
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function(a, b) {
      return a[0] - b[0];
    });
    // console.log("TCL: getSongLrc -> arr", result);
    return result;
  },
  //去除空白
  sliceNull(lrc) {
    var result = []
    for (var i = 0; i < lrc.length; i++) {
      if (lrc[i][1] == "") {} else {
        result.push(lrc[i]);
      }
    }
    return result
  },
  palyMusic() {
    this.setData({
      sliderValue: 0,
      timeL: '00:00',
      timeR: '00:00'
    })
    playerManager.pause();
    playerManager.title = this.data.currentSong.name
    playerManager.epname = this.data.currentSong.name
    playerManager.singer = this.data.currentSong.ar[0].name
    playerManager.coverImgUrl = this.data.currentSong.al.picUrl
    if (this.data.currentUrl == '') {
      console.log('url为空', this.data.currentUrl);
      wx.showToast({
        title: '音乐链接有误',
        duration: 2000
      })
      return
    }
    playerManager.src = this.data.currentUrl;
    playerManager.onCanplay(() => {
      console.log('监听背景音频进入可播放状态事件。 但不保证后面可以流畅播放')
    })
    playerManager.onWaiting(() => {
      console.log('监听音频加载中事件。当音频因为数据不足，需要停下来加载时会触发')
      this.setData({
        isPlay: false
      })
    })
    playerManager.onError(() => {
      console.log('监听背景音频播放错误事件')
    })
    playerManager.onPlay(() => {
      // console.log('监听背景音频播放事件')
      this.setData({
        isPlay: true
      })
    })
    playerManager.onPause(() => {
      // console.log('监听背景音频暂停事件')
      this.setData({
        isPlay: false
      })
    })
    playerManager.onSeeking(() => {
      console.log('监听背景音频开始跳转操作事件')
    })
    playerManager.onSeeked(() => {
      console.log('监听背景音频完成跳转操作事件')
    })
    playerManager.onEnded(() => {
      console.log('监听背景音频自然播放结束事件')
      this.clickNext();
    })
    playerManager.onStop(() => {
      console.log('监听背景音频停止事件')
    })
    playerManager.onTimeUpdate(() => {
      // console.log('播放进度更新事件，前台时会回调', playerManager.currentTime);
      this.updateTime(parseInt(playerManager.currentTime));
    })
    playerManager.onNext(() => {
      console.log('点击下一曲事件（仅iOS)')
    })
    playerManager.onPrev(() => {
      console.log('点击上一曲事件（仅iOS)')
    })

    wx.setNavigationBarTitle({
      title: this.data.currentSong.name
    })
  },
  sliderChange(e) {
    let l = e.detail.value;
    playerManager.seek(l);
    this.updateTime(l);
  },
  updateTime(t) {
    let l = t;
    let r = this.data.currentSong.dt - t;

    let tl = parseInt(l / 60) > 9 ? parseInt(l / 60) : '0' + parseInt(l / 60);
    let tls = parseInt(l % 60) > 9 ? parseInt(l % 60) : '0' + parseInt(l % 60);

    let tr = parseInt(r / 60) > 9 ? parseInt(r / 60) : '0' + parseInt(r / 60);
    let trs = parseInt(r % 60) > 9 ? parseInt(r % 60) : '0' + parseInt(r % 60);
    this.setData({
      sliderValue: l,
      timeL: tl + ':' + tls,
      timeR: tr + ':' + trs
    })
    this.scrollLrc(t);
  },
  scrollLrc(t) {
    for (let i = 0; i < this.data.lrcArr.length; i++) {
      let time = parseFloat(this.data.lrcArr[i][0]);
      if (i <= this.data.lrcArr.length - 2) {
        let time2 = parseFloat(this.data.lrcArr[i + 1][0]);
        if (t > time && t < time2) {
          this.checkCt(i);
          return;
        }
      } else {
        if (t - time > 0) {
          this.checkCt(i);
          return;
        }
      }

    }
  },
  checkCt(idx){
    let ct = this.data.currentLine;
    if (ct == idx){return}
    this.setData({
      currentLine: idx
    })
    // if (idx >= 6){
      this.setData({
        marginTop: idx * 75
      })
    // }
  },
  /*切换播放循环模式*/
  clickLoop(e) {
    let idx = e.currentTarget.dataset.idx;
    this.setData({
      orderIdx: (idx + 1) % 4
    })
  },
  /* 点击 播放/暂停 */
  clickPlayOrPause() {
    if (playerManager.paused) {
      playerManager.play()
    } else {
      playerManager.pause()
    }
  },
  /* 显示列表*/
  clickShowPop() {
    this.setData({
      isShowPop: true
    })
  },
  /* 关闭列表*/
  clickClosePop() {
    this.setData({
      isShowPop: false
    })
  },
  /* 点击上一曲*/
  clickPre() {
    let idx = this.data.currentIndex;
    if (this.data.orderIdx == 0) { //列表循环
      idx = this.data.currentIndex == 0 ? this.data.songList.length - 1 : this.data.currentIndex - 1;
    } else if (this.data.orderIdx == 1) { //单曲循环

    } else if (this.data.orderIdx == 2) { // 顺序播放
      idx = this.data.currentIndex == 0 ? this.data.songList.length - 1 : this.data.currentIndex - 1;
    } else if (this.data.orderIdx == 3) { // 随机播放
      idx = Math.round(Math.random() * this.data.songList.length);
      // console.log('随机数', idx);
    }
    this.setData({
      currentIndex: idx
    })
    this.getSongUrl();
  },
  /* 点击下一曲*/
  clickNext() {
    let idx = this.data.currentIndex;
    if (this.data.orderIdx == 0) { //列表循环
      idx = idx == this.data.songList.length - 1 ? 0 : idx + 1
    } else if (this.data.orderIdx == 1) { //单曲循环

    } else if (this.data.orderIdx == 2) { // 顺序播放
      idx = idx == this.data.songList.length - 1 ? 0 : idx + 1
    } else if (this.data.orderIdx == 3) { // 随机播放
      idx = Math.round(Math.random() * this.data.songList.length);
      // console.log('随机数', idx);
    }
    this.setData({
      currentIndex: idx
    })
    this.getSongUrl();
  },
  /* 点击列表歌曲*/
  clickItem(e) {
    // console.log("TCL: clickItem -> e", e)
    let idx = e.currentTarget.dataset.idx;
    this.setData({
      currentIndex: idx
    })
    this.getSongUrl();
    this.clickClosePop();
  },
  clickTopView(e){
    // console.log("TCL: clickItem -> e", e)
    let show = e.currentTarget.dataset.show;
    this.setData({
      showLrc: show
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var ids = JSON.parse(options.list).join(',');
    this.getSongDetail(ids);

    var that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log('model:', res);
        let model = res.model.substring(0, res.model.indexOf("X")) + "X";
        if (model == 'iPhone X') {
          that.setData({
            isIpx: true
          })
        }
      }
    })
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