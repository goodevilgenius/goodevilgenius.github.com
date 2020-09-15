/* global axios, location, Vue */

(function() {
  'use strict';

  if (location.protocol == 'http:' && location.host == 'projects.danielrayjones.com') {
    location.replace(location.href.replace('http:', 'https:'));
  }

  let nowTS = Date.now() / 1000;

  var watched = new Vue({
    el: '#app',
    data: {
      sources: {},
      fullList: [],
      current: {}
    },
    computed: {
      list: function() {
        const list = this.fullList;
        const now = this.current;

          return list ? list.filter(function (item) {
              let released = item.released || 1;
              if (typeof released == 'string') {
                  released = (new Date(released)).valueOf() / 1000;
              }

              return released <= nowTS && item.last_watched < now.date;
          }) : [];
      }
    },
    methods: {
      load: function(source) {
        this.current = source;
        axios.get('data/' + source.slug + '.json')
          .then(response => {
            const data = response.data;
            let proms = data.map((datum) => {
              if (datum.include) {
                return axios.get('data/' + datum.include);
              } else {
                return new Promise(resolve => resolve(datum));
              }
            });
            Promise.all(proms).then(values => {
              let r = [];
              values.forEach(datum => {
                if (datum.data) {
                  datum.data.forEach(ep => r.push(ep));
                } else {
                  r.push(datum);
                }
              });
              this.fullList = r;
            });
          });
      }
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
    }
  });

})();
