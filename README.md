# vir-ui-loadmore

## 依赖安装

### npm

```sh
npm install Vir
```
### script 标签

```html
<script src="https://unpkg.com/vir"></script>
```

## 安装

### npm

```sh
npm install vir-ui-loadmore
```

### script 标签

```html
<script src="https://unpkg.com/vir-ui-loadmore"></script>
<!-- 全局变量 VirUiLoadMore -->
```

## 基本使用

```html
<div class="container">
  <div class="list"></div>
  <a href="javascript:;" class="more">加载更多</a>
</div>
```

```js
const App = require('vir-ui-loadmore')(
/* 默认值
  {
    waterfall: false,
    threshold: 200,
    buttonSelector: '.more'
  }
*/
)

var app = new App({
  el: '.container',
  data: {
    page: 1
  },
  watch: {
    state: function (result) {
      // 判断 状态 默认 'loading' or 'done'
      // last 是自定义的
      var state = result.value
      console.log('state ->', state)
      if (state == 'loading') {
        this.$$('.more').html('loading...')
      } else if (state == 'done') {
        this.$$('.more').html('加载更多')
      } else if (state == 'last') {
        this.$$('.more').html('最后一页')
      }
    }
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
      console.log('page ->', page)
      setTimeout(function () {
        this.set('data', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        this.set('page', page + 1)
        done(page > 4 ? 'last' : 'done')
      }.bind(this), 800)
    }
  }
})

app.load() // 手动加载首屏


```

## 例子

[base loadmore](http://htmlpreview.github.io/?https://github.com/sgdh-fe/vir-ui-loadmore/blob/master/examples/index.html)