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
      lock: false,
      state: 'pending'
    },
    events: {
      ['click->' + buttonSelector + '']: 'load'
    },
    watch: {
      data(result) {
        this.render(result.value)
      }
    },
    methods: {
      load() {
        if (this.get('lock')) {
          return
        }
        this.set({
          'state': 'loading',
          'lock': true
        })
        this.fetch((state = 'done') => {
          this.set({
            'state': state,
            'lock': false
          })
        })
      },
      fetch(done) {},
      render(data) {}
    },
    init() {
      if (!waterfall) {
        return
      }

      const $window = $(window)
      $window.on('scroll resize', () => {
        if (this.get('lock')) {
          return
        }
        if ($(document).height() - $window.scrollTop() - $window.height() < threshold) {
          this.load()
        }
      })
    }
  })
}