<template>
  <v-breadcrumbs :items="breadcrumbList" class="pl-0 p-0">
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
        let disabled = false
        this.$router.options.routes.map((route) => {
          if(route.path.includes(name.toLowerCase())) {
            if(!route.name && route.children[0].path != '' && route.children[0].name) {
              disabled = true
            }
          }
        })
        this.breadcrumbList.push({
          name: name == 'Dashboard' ? 'Dashboard' : name,
          link: name == 'Dashboard' ? '/' : breadcrumbLink.toLowerCase(),
          disabled: (id + 1 == PathsArray.length) ? true : disabled ? true : false,
        })
      })
    },
  },
}
</script>
