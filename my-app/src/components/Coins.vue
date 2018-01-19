<template>
  <!-- This is a dynamic route
    Source: https://scotch.io/tutorials/getting-started-with-vue-router
  -->
  <div>
    <h1>  </h1>

    <p> {{ articleInfo }} </p>

    <p>Symbol: coin.symbol </p>
<p>Price (USD):  coin.price_usd</p>
  </div>
</template>
<script>
  import axios from 'axios';
  import x2js from 'x2js';

  export default {
    name: 'PMIDs',

    data() {
      return {
        coins: {},
        articleInfo: {},
      };
    },

    created() {
      this.fetchData();
    },

    watch: {
      $route: 'fetchData',
    },

    methods: {
      fetchData() {
        // const url = `https://api.coinmarketcap.com/v1/ticker/${this.$route.params.id}/`
        const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${this.$route.params.pmid}&rettype=fasta&retmode=xml`;
        axios.get(url)
        .then((resp) => {
          // this.pubmedid = resp.data[0];
          console.log(this.convertxml(resp.data))
          this.articleInfo = this.convertxml(resp.data)
        })
        .catch(() => {
        });
      },
      convertxml(text) {
        var convert = require('xml-js');
        var xml = text;
        var result = convert.xml2json(xml, {compact: true, spaces: 4});
        return result;
      }
    },
  };
</script>
