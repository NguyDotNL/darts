<template>
  <v-breadcrumbs :items="breadcrumbList" class="pl-0">
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
      let PathsArray = this.$route.path.split('/')
      let breadcrumbLink = ''
      PathsArray.shift()
      PathsArray.unshift('dashboard')
      PathsArray = PathsArray.filter((el) => { return el })
      if(PathsArray.length == 1) PathsArray.shift()

      PathsArray.map((name, id) => {
        name = name.charAt(0).toUpperCase() + name.slice(1)
        breadcrumbLink += id !== 0 ? `/${name}` : '' 
        this.breadcrumbList.push({
          name: name == 'Dashboard' ? 'Dashboard' : name,
          link: name == 'Dashboard' ? '/' : breadcrumbLink,
          disabled: id + 1 == PathsArray.length ? true : false,
        })
      })
    },
  },
}
</script>
