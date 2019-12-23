// pages/rankList/rankList.js
const API = require('../../lib/api');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guanfang: ['云音乐飙升榜', '云音乐新歌榜', '云音乐热歌榜', '网易原创歌曲榜', '人气榜', '畅销榜'],
    recommend: ['江小白', '说唱TOP榜', '云音乐电音榜', 'ACG音乐榜', '欧美新歌榜', '抖音排行榜'],
    goblist: ['美国Billboard周榜', 'UK排行榜周榜', 'Beatport全球电子舞曲榜', '日本Oricin周榜', 'iTunes榜', '香港电台中文歌曲龙虎榜'],
    ranks:[]
    // morelist: ['云音乐古典音乐榜', '云音乐韩语榜', '赞赏榜', '新声榜', '歌手榜', '云音乐欧美热歌榜', '电竞音乐榜', '', '', '', '', '', '', '', '', '', '', '',]
  },
  getToplist() {
    API.getToplist().then(res => {
      // console.log('****所有榜单****:', res);
      if (res.code === 200) { //更加严谨
        let rankList = [{
            name: '官方榜',
            list: []
          },
          {
            name: '推荐榜',
            list: []
          },
          {
            name: '全球榜',
            list: []
          },
          {
            name: '更多榜单',
            list: []
          }
        ]

        for (let i = 0; i < res.list.length; i++) {
          let item = res.list[i];
          let has = false;
          // console.log('11111111111', item.name);
          for (let l = 0; l < this.data.guanfang.length; l++) {
            let gname = this.data.guanfang[l];
            if (item.name.indexOf(gname) != -1) {
              has = true;
              console.log('333333333', item.name);
              rankList[0].list.push(item);
              break;
            }
          }
          if (has) {
            continue;
          }

          for (let l = 0; l < this.data.recommend.length; l++) {
            let gname = this.data.recommend[l];
            if (item.name.indexOf(gname) != -1) {
              has = true;
              // console.log('333333333', item.name);
              rankList[1].list.push(item);
              break;
            }
          }
          if (has) {
            continue;
          }
          for (let l = 0; l < this.data.goblist.length; l++) {
            let gname = this.data.goblist[l];
            if (item.name.indexOf(gname) != -1) {
              has = true;
              // console.log('333333333', item.name);
              rankList[2].list.push(item);
              break;
            }
          }
          if (has) {
            continue;
          }
          rankList[3].list.push(item);
          // console.log('222222222222', item.name);
        }

        this.setData({ // 只取数组的前6个数据
          // newAlbum: res.albums.slice(0, 3)
          ranks: rankList
        })
        console.log('++++++++++++',this.data.ranks);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getToplist();
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