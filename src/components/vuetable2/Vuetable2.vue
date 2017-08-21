<template>
  <div>
    <vuetable
      ref="vuetable"
      :api-url="apiUrl"
      :http-options="httpOptions"
      :fields="fields"
      pagination-path=""
      @vuetable:pagination-data="onPaginationData"
    ></vuetable>
    
    <vuetable-pagination-info ref="paginationInfo"
    ></vuetable-pagination-info>

    <vuetable-pagination ref="pagination"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>    
  
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import CustomActions2 from './CustomActions2'

Vue.component('custom-actions', CustomActions2)

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo
  },
  props: {
    apiUrl: {
      type: String,
      default () {
        return ''
      }
    },
    fields: {
      type: Array,
      default () {
        return []
      }
    },
    httpOptions: {
      type: Object,
      default () {
        return {
          headers: this.$http.defaults.headers
        }
      }
    }
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    }
  }
}
</script>
