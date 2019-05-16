<template lang="html">
  <div class="home">

    <KanbanBoard />

  </div>
</template>

<script>
import KanbanBoard from '@/components/KanbanBoard.vue'
import * as dss from 'deepstream.io-client-js'

export default {
  name: 'home',

  components: {
    KanbanBoard
  }
}
</script>
