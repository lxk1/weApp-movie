// pages/movies/movies.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheatersList: [],
    start: 0,
    count: 20,
    total:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMovieList(this.data.count * this.data.start, this.data.count)
    console.log(this)
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
  showDetail: function(e){
    console.log(e.currentTarget.id)
    app.globalData.movieId = e.currentTarget.id;
    wx.navigateTo({
      url: '../movieDetil/movieDetail',
    })
  },
  search: function(e){
    console.log(e.detail.value);
    app.globalData.search = e.detail.value;
    wx.navigateTo({
      url: '../searchResult/searchResult',
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.start = this.data.start + 1;
    if (this.data.count * this.data.start <= this.data.total){
      this.getMovieList(this.data.count * this.data.start, this.data.count)
    }else{
      wx.showToast({
        title: '没有更多',
        icon: 'warn'
      })
    }
  },
  getMovieList: function(start, count){
    wx.showLoading({
      title: 'loading...'
    })
    var that = this;
    wx.request({
      url: app.globalData.douban + '/v2/movie/in_theaters', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'json'
      },
      data: {
        start: start,
        count: count
      },
      success: function (res) {
        console.log(res.data);
      
        for (var i in res.data.subjects){
          var flag = true;
          if (that.data.inTheatersList.length == 0){
            that.data.inTheatersList.push(res.data.subjects[i])
          }else{
            for (var j in that.data.inTheatersList){
              if (that.data.inTheatersList[j].id == res.data.subjects[i].id){
                flag =false;
              }
            }
            if(flag){
              that.data.inTheatersList.push(res.data.subjects[i])
            }
          }
          
        }
        
        that.setData({
          inTheatersList: that.data.inTheatersList,
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