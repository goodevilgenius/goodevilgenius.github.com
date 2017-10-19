(function() {
  'use strict';

  var watched = new Vue({
    el: '#app',
    data: {
      sources: {},
      list: {},
      current: {}
    },
    created: function() {
      axios.get('data/sources.json')
        .then(response => this.sources = response.data);
    },
    methods: {
      load: function(source) {
        this.current = source;
        console.log(source);
        axios.get('data/' + source.slug + '.json')
          .then(response => this.list = response.data);
      }
    }
  })

})();
