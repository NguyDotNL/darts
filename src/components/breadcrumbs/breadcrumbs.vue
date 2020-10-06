<template>
  <v-breadcrumbs :items="breadcrumbList">
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item :href="item.link" :disabled="item.disabled">
        {{ item.name }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  data: function () {
    return {
      breadcrumbList: [],
    }
  },
  watch: {
    $route() {
      this.updateBreadcrumbList()
    },
  },
  mounted() {
    this.updateBreadcrumbList()
  },
  methods: {
    routeTo(Route) {
      if (this.breadcrumbList[Route].link)
        this.$router.push(this.breadcrumbList[Route].link)
    },
    updateBreadcrumbList() {
      this.breadcrumbList = this.$route.meta.breadcrumb
    },
  },
}
</script>
