<script lang="jsx">
import { defineComponent, h, resolveComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'


export default defineComponent({
    name: 'HeaderBarItem',
    setup() {

      const router = useRouter()

      const routes = computed(() => {
        return router.options.routes
      })
      
      const route = useRoute()
      const renderMenu = () => {
        function travel(_route, nodes = []) {
          if (_route) {
            _route.forEach((element) => {
              const { icon, title } = element.meta
              const node =
                element.children && element.children.length > 0 ? (
                  <a-sub-menu title={title} key={element.name} icon={h(resolveComponent(icon))}>
                    {travel(element.children)}
                  </a-sub-menu>
                ) : (
                  <a-menu-item key={element.path}>
                    <router-link to={element.path}>{title}</router-link>
                  </a-menu-item>
                )
              nodes.push(node)
            })
          }
          return nodes
        }
        return travel(routes.value[0].children)
      }
      return () => (
        <a-menu theme="light" mode="horizontal" selectedKeys={[route.path]}>
          { renderMenu() }
        </a-menu>
      )
    }
})
</script>