// pages/top/top.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMovies: [],
    start: 0,
    count: 20,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopMovies(this.data.start * this.data.count, this.data.count);
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
  showDetail: function (e) {
    console.log(e.currentTarget.id)
    app.globalData.movieId = e.currentTarget.id;
    wx.navigateTo({
      url: '../movieDetil/movieDetail',
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.start = this.data.start + 1;
    if (this.data.count * this.data.start <= this.data.total) {
      this.getTopMovies(this.data.count * this.data.start, this.data.count)
    } else {
      wx.showToast({
        title: '没有更多',
        icon: 'warn'
      })
    }
  },
  getTopMovies:function(start, count){
    wx.showLoading({
      title: 'loading...'
    })
    var that = this;
    wx.request({
      url: app.globalData.douban + '/v2/movie/top250',
      header: {
        'content-type': 'json'
      },
      data: {
        start: start,
        count: count
      },
      success: function (res) {
        console.log(res.data);

        for (var i in res.data.subjects) {
          var flag = true;
          if (that.data.topMovies.length == 0) {
            that.data.topMovies.push(res.data.subjects[i])
          } else {
            for (var j in that.data.topMovies) {
              if (that.data.topMovies[j].id == res.data.subjects[i].id) {
                flag = false;
              }
            }
            if (flag) {
              that.data.topMovies.push(res.data.subjects[i])
            }
          }

        }

        that.setData({
          topMovies: that.data.topMovies,
          total: res.data.total
        })
        wx.hideLoading()
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})