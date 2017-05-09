var App = VirUiLoadMore({
  waterfall: true,
  threshold: 200,
  buttonSelector: '.more'
})

var app = new App({
  el: '.container',
  data: {
    page: 1
  },
  methods: {
    render: function (data) {
      // 只处理模版
      this.$$('.list').append(data.reduce((prev, next) => {
        return prev += '<p>' + next + '</p>'
      }, ''))
    },
    fetch: function (done) {
      // 拉取数据
      let page = this.get('page')
      // 模拟异步加载
      setTimeout(function () {
        this.set('data', [page, page, page, page, page, page, page, page])
        this.set('page', page + 1)
        done(page > 2 ? 'finish' : 'done')
      }.bind(this), 800)
    }
  },
  inited() {
    this.$watch('state', function (result) {
      // 判断 状态 'loading'、 'done'、'finish'
      var state = result.value
      if (state == 'loading') {
        this.$$('.more').html('loading...')
      } else if (state == 'done') {
        this.$$('.more').html('加载更多')
      } else if (state == 'finish') {
        this.$$('.more').html('最后一页')
      }
    })
  }
})

app.load()