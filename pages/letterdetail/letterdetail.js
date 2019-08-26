
var baseUrl = 'https://www.antleague.com/'
var qiniuBaseUrl = 'https://antleague.com/'
var videoObj
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_img_url: qiniuBaseUrl + 'letters/',
    base_video_url: qiniuBaseUrl + 'letters/',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.video_item)
    if (options.video_item){
      videoObj = JSON.parse(options.video_item);
      wx.setNavigationBarTitle({
        title: videoObj.name,
      })
    }

    this.setData({
      cover: qiniuBaseUrl + 'letters/' + videoObj.cover_img,
      video_url: qiniuBaseUrl + 'letters/' + videoObj.video_path,
      video_title: videoObj.name
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this
    return {
      title: '快乐学习英语字母！',
      path: '/pages/home/home',
      imageUrl: that.data.cover || '/images/share_img.png'
    }
  }
})