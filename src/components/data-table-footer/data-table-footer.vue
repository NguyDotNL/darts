<template>
  <v-row>
    <v-col>
      <div class="text-center d-flex align-center justify-end">
        <div class="whitespace-no-wrap d-flex align-center justify-end mr-3 text-xs">
          Items per pagina:
          <v-select
            v-model="itemsPerPageValue"
            class="ml-5 mr-5"
            style="flex: 0 1 0 !important;"
            :disabled="currentPage != 1"
            :items="itemsPerPageArray"
            :full-width="false"
            @change="changeItemsPerPage"
          />
        </div>
        <v-btn
          icon
          depressed
          :disabled="currentPage == 1"
          @click="prevPage()"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span class="ml-3 mr-3 text-sm">{{ currentPage }}</span>
        <v-btn
          icon
          depressed
          :disabled="itemsLength < itemsPerPageValue"
          @click="nextPage()"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'DataTableFooter',
  props: {
    itemsPerPageArray: {
      type: Array,
      default: function () {
        return [5, 10, 15, 20]
      },
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
    itemsLength: {
      type: Number,
      required: true,
    },
  },
  data: function() {
    return {
      currentPage: this.page,
      itemsPerPageValue: this.itemsPerPage,
    }
  },
  methods: {
    prevPage: function () {
      if(this.currentPage > 1) {
        this.currentPage--
        this.$emit('prev', { page: this.currentPage, itemsPerPage: this.itemsPerPageValue })
      }
    },
    nextPage: function () {
      if(this.currentPage > 0) {
        this.currentPage++
        this.$emit('next', { page: this.currentPage, itemsPerPage: this.itemsPerPageValue })
      }
    },
    changeItemsPerPage(val) {
      this.itemsPerPageValue = val
      this.$emit('changeItemsPerPage', this.itemsPerPageValue)
    },
  },
}
</script>
