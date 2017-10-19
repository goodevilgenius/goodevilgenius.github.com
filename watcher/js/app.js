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
        .then(response => {
          this.sources = response.data;
          let hash = location.hash.split('#')[1];

          let slugs = this.sources.map(source => source.slug);
          if (hash && (slugs.indexOf(hash) > -1)) {
            this.load(this.sources.filter(source => source.slug == hash)[0]);
          }
        });
    },
    methods: {
      load: function(source) {
        this.current = source;
        axios.get('data/' + source.slug + '.json')
          .then(response => this.list = response.data);
      }
    }
  })

})();
