const app = getApp()

var baseUrl = 'https://www.antleague.com/'

var list = null
var page = 1
var pSize = 20
var typeid
var isEnd = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    base_img_url: baseUrl + 'letter/',
    base_video_url: baseUrl + 'letter/',
    is_end: isEnd,
    isShowModel: false,//控制弹窗是否显示，默认不显示
    isShowConfirm: false,//是否只显示确定按钮，默认不是
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '字母学习',
    })
    page = 1
    typeid = options.typeid
    wx.showLoading({
      title: '加载中',
    })
    this.loadData();
  },

  onShow: function(e) {

  },

  loadData: function() {
    var that = this
    let url = baseUrl + 'queryletters'
    wx.request({
      url: url,
      data: {
        'page': page
      },
      method: 'POST',
      success: function(result) {
        console.log(result.data.data)
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (page == 1) {
          list = result.data.data;
        } else {
          if (list != null) {
            list = list.concat(result.data.data);
          }
          if (result.data.data.length < 20){
            isEnd = true
          }

          that.setData({
            is_end: isEnd
          })
        }

        that.setData({
          videolist: list
        })
      },
      fail: function(res) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    })
  },

  onPullDownRefresh: function() {
    list = null
    page = 1
    this.data.videolist = null
    this.loadData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!isEnd){
      wx.showLoading({
        title: '加载中',
      })
      page++;
      this.loadData();
    }
  },

  videodetail: function(e) {
    console.log('count--->' + app.globalData.useCount)
    if (app.globalData.useCount % 3 == 0) {
      this.showModel({
        ModelId: 1,
        ModelTitle: '分享好友',
        ModelContent: '如果你觉得字母学习很有趣，请分享给你的好友一起学习吧！'
      })
    } else {
        var obj = e.currentTarget.dataset.item
        var video_item = JSON.stringify(obj);
        wx.navigateTo({
          url: '/pages/letterdetail/letterdetail?video_item=' + video_item
        })

        app.globalData.useCount = app.globalData.useCount + 1
    }
  },

  onShareAppMessage: function() {
    return {
      title: '儿歌乐园，宝宝的快乐源泉!',
      path: '/pages/home/home',
      imageUrl: '/images/share_img.png'
    }
  },

  //调用模态弹窗
  showModel: function (e) {
    //将传过来的标题和内容展示到弹窗上
    this.setData({
      isShowModel: true,
      ModelId: e.ModelId,
      ModelTitle: e.ModelTitle,
      ModelContent: e.ModelContent
    })
  },

  //取消事件
  cancel: function (e) {
    app.globalData.useCount = app.globalData.useCount + 1
    //关闭模态弹窗
    this.setData({
      isShowModel: false
    })
  },

  //确定事件
  confirm: function (e) {
    app.globalData.useCount = app.globalData.useCount + 1
    //关闭模态弹窗
    this.setData({
      isShowModel: false
    })
  }

})