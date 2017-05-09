import Vir from 'vir'

export default function (options = {}) {
  let {
    waterfall = false,
      threshold = 200,
      buttonSelector = '.more'
  } = options
  return Vir({
    data: {
      data: [],
      state: 'pending'
    },
    events: {
      ['click->' + buttonSelector + '']: 'load'
    },
    watch: {
      data(result) {
        this.render(result.value)
      },
      state(result) {
        if (result.value == 'finish') {
          this.destroy()
        }
      }
    },
    methods: {
      load() {
        let state = this.get('state')
        if (state == 'loading' || state == 'finish') {
          return
        }
        this.set('state', 'loading')
        this.fetch((state) => {
          this.set('state', state)
        })
      },
      destroy() {
        let space = 'loadmore' + this._uid
        $(window).off(`scroll.${space} resize.${space}`)
      },
      fetch(done) {},
      render(data) {}
    },
    init() {
      if (!waterfall) {
        return
      }

      let $window = $(window)
      let space = 'loadmore' + this._uid
      $window.on(`scroll.${space} resize.${space}`, () => {
        if (this.get('state') == 'loading') {
          return
        }
        if ($(document).height() - $window.scrollTop() - $window.height() < threshold) {
          this.load()
        }
      })
    }
  })
}