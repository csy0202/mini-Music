// const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const API_BASE_URL = 'http://192.168.4.248:3000';


// const API_BASE_URL = 'http://musicapi.leanapp.cn';
const request = (url, data) => {
  let _url = API_BASE_URL + url;
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: "get",
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
         "Cookie": "MUSIC_U=28fb6cc9152a2846eeaea45e4adec32b849fc1aeff01d9ca746916972aec097ac0617b5bdfc48d0139f4f1674f807e1c41049cea1c6bb9b6; __remember_me=true; __csrf=ebbb785e81d8b96dfe9a2c343ebb66d7"
      },
      success(request) {
        resolve(request.data)

      },
      fail(error) {
        reject(error)
      }
    })
  });
}


module.exports = {
  getBanner: (data) => {
    return request('/banner', data)//个性推荐轮播
  },
  getPersonalized: (data) => {
    return request('/personalized', data)//推荐歌单
  },
  getNewAlbum: (data) => {
    return request('/album/newest', data)//新碟
  },
  getNewSong: (data) => {
    return request('/top/song', data)//新歌
  },
  getPersonalizedNewSong: (data) => {
    return request('/personalized/newsong', data)//推荐新歌
  },
  getVideoGroupList: (data) => {
    return request('/video/group/list', data)//获取视频标签列表
  },
  getVideoGroup: (data) => {
    return request('/video/group', data)//获取视频标签下的视频
  },
  loginCellphone: (data) => {
    return request('/login/cellphone', data)//获取视频标签下的视频
  },
  
  gethotsongs: (data) => {
    return request('/search/hot', data)//热搜接口
  },
  searchSuggest: (data) => {
    return request('/search/suggest', data)//搜索建议接口
  },
  searchResult: (data) => {
    return request('/search', data)//搜索结果接口
  },
  getsongsheet: (data) => {
    return request('/top/playlist', data)//热门歌单接口
  },
  getNewSong: (data) => {
    return request('/personalized/newsong', data)//最新音乐接口
  },
  getRecommendSongs: (data) => {
    return request('/recommend/songs', data)//每日推荐歌曲( 需要登录 )
  },
  getPlaylistHot: (data) => {
    return request('/playlist/hot', data)//热门歌单分类
  },
  getTopPlaylistHighquality: (data) => {
    return request('/top/playlist/highquality', data)// 获取精品歌单
  },
  getDjRadios: (data) => {
    return request('/dj/recommend', data)//电台推荐接口
  },

 
  // getTopComments:(data)=>{
  //   return request('/comment/hot',data)
  // },
  getProgramRecommend: (data) => {
    return request('/program/recommend', data)//推荐节目接口
  },
  getRecommendType: (data) => {
    return request('/dj/recommend/type', data)//所有电台分类推荐
  },
  getRecommendMV: (data) => {
    return request('/personalized/mv', data)//推荐MV
  },
  getNewMv: (data) => {
    return request('/mv/first', data)//最新MV
  },
  getNewEst: (data) => {
    return request('/album/newest', data)//最新专辑
  },
  getTopList: (data) => {
    return request('/top/list', data)//排行榜
  },
  getDjList: (data) => {
    return request('/dj/catelist', data) //电台分类
  },
  getPay: (data) => {
    return request('/dj/paygift', data)//付费精品
  },
  getSonger: (data) => {
    return request('/toplist/artist', data)//歌手排行
  },

}