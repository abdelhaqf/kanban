<template lang="html">
  <div @dblclick="$emit('update')"  class="kanbanCard" :class="['kanban-card', 'kanban'+kanban.priority]">
    <div  :class="new Date(kanban.due) < new Date()?'due passed':'due'" v-if="kanban.due">
      <timeago :datetime="kanban.due" :auto-update="60"> </timeago>
    </div>
    <div class="card-header">
      <b>{{kanban.title.length>19?kanban.title.substr(0,19)+'...':kanban.title}}</b>
    </div>
    <div class="card-body">
      {{kanban.updates[0].text.length>60?kanban.updates[0].text.substr(0,60)+'...':kanban.updates[0].text}}
    </div>
    <div class="card-footer">
      updated&nbsp<timeago :datetime="kanban.updates[0].created" :auto-update="60"> </timeago>
    </div>
  </div>
</template>

<script>
export default {
  name: 'kanbanCard',
  props: ['kanban']

}
</script>

<style lang="scss" scoped>
.kanban-card {
  position: relative;
  padding: 4px 6px;
  margin: 8px 0px;
  border-radius: 8px;
  height: 100px;
  width: 200px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-header {
  word-wrap: break-word;
  color: #253858;
}
.card-body {
  flex-grow: 99;
  word-wrap: break-word;
  font-size: .9em;
  color: #253858;
}
.card-footer {
  display: flex;
  justify-content: flex-end;
  font-size: 0.7em;
  color: #172B4D;
}

// kanban color
.kanban1 {
  background-color: #F2FFE3;
}
.kanban2 {
  background-color: #BDFCC3;
}
.kanban3 {
  background-color: #F8F491;
}
.kanban4 {
  background-color: #F9C07D;
}
.kanban5 {
  background-color: #FE9C8F;
}
// end kanban color

.due {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: rgba(red, 0.9);
  border-radius: 8px;
  padding: 4px 6px;
  font-size: .7em;
  color: white;
}
.passed {
  background-color: rgba(grey, 0.9) !important;
}
</style>
