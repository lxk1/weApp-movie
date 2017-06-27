// pages/searchResult/searchResult.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    start: 0,
    count: 20,
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSearchResult(this.data.count * this.data.start, this.data.count);
    
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
  getSearchResult: function(start, count){
    var that = this;
    wx.showLoading({
      title: 'loading...'
    })
    wx.request({
      url: app.globalData.douban + '/v2/movie/search',
      header: {
        'content-type': 'json'
      },
      data: {
        q: app.globalData.search,
        start: start,
        count: count
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          for (var i in res.data.subjects) {
            var flag = true;
            if (that.data.movies.length == 0) {
              that.data.movies.push(res.data.subjects[i])
            } else {
              for (var j in that.data.movies) {
                if (that.data.movies[j].id == res.data.subjects[i].id) {
                  flag = false;
                }
              }
              if (flag) {
                that.data.movies.push(res.data.subjects[i])
              }
            }

          }
          that.setData({
            movies: that.data.movies,
            total: res.data.total
          })
          wx.hideLoading();
        }
      }
    })
  },
  showDetail: function(e){
    app.globalData.movieId = e.currentTarget.id;
    wx.navigateTo({
      url: '../movieDetil/movieDetail',
    })
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
    this.data.start = this.data.start + 1;
    if (this.data.count * this.data.start <= this.data.total) {
      this.getSearchResult(this.data.count * this.data.start, this.data.count)
    } else {
      wx.showToast({
        title: '没有更多',
        icon: 'warn'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})