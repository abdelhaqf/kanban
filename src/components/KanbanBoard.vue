<template lang="html">
  <div class="kanbanBoard">
    <div class="nav">

      <div class="">
       <p-radio style="font-size: 0.8em;" @change="changeDept(dept)" :value="dept" v-model="DeptSelector" v-for="dept in curUser.department" class="p-icon p-round p-smooth p-plain" color="success-o">
         <menu-icon class="icon mdi mdi-check" slot="extra" />
          {{dept}}
        </p-radio>
      </div>
      <button id="btnLogout" @click="$parent.$parent.ds.close(); $ls.clear(); $router.push('/login')"><b>Logout</b></button>
    </div>
    <div class="kanban-container">
      <div v-for="(item,idx) in kanbanGroups" class="kanban-group" :style="{backgroundColor: colors[idx]}">
        <div class="kanban-title">
          <button id="button-add" v-if="idx=='backlog'" @click="$refs.mymodal.open();"><b>+</b></button>
          <popper
              trigger="hover"
              :options="{
                placement: 'top',
                modifiers: { offset: { offset: '0,10px' } }
              }">
              <div class="popper" style="padding: 6px; font-size: 0.7em;">
                <i>{{popovers[idx]}}</i>
              </div>

              <a slot="reference">
                {{idx}}
              </a>
            </popper>
        </div>
        <draggable class="mydraggable" v-model="kanbanGroups[idx]" v-bind="dragOptions"  group="kanban" @start="drag=true" @end="drag=false" @change="updateGroup">
          <KanbanCard  v-for="element in kanbanGroups[idx]" :key="element.created"
            :kanban="element"
            @update="$refs.myupdatemodal.open(element)"
          ></KanbanCard>
        </draggable>
      </div>

      <ModalAdd ref="mymodal" @save="updateDeepstream" :bl="kanbanGroups.backlog" />
      <ModalUpdate @save="updateDeepstream" @delete="deleteCard" ref="myupdatemodal" :kanbanGroups="kanbanGroups" />

    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import ModalAdd from '@/components/ModalAdd.vue'
import ModalUpdate from '@/components/ModalUpdate.vue'
import * as dss from 'deepstream.io-client-js'
import KanbanCard from '@/components/KanbanCard.vue'
import MenuIcon from "vue-material-design-icons/Check.vue"
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
  name: 'kanbanBoard',
  methods: {
    updateGroup(x) {
      if(Object.keys(x)[0]=='added') {
        var tmp = ''
        for(var key in this.kanbanGroups) {
          if(this.kanbanGroups[key].find(e => {return e == x.added.element})) {
            tmp = key
            this.record.set(key, this.kanbanGroups[key])
          }
        }

        this.newUpdateData = {
          text: 'moved to '+tmp,
          created: new Date(),
          type: 'system'
        }
        x.added.element.updates.unshift(this.newUpdateData)
        this.newUpdateData = {
          text: '',
          created: '',
          type: 'normal'
        }
      }
      else {
        this.updateDeepstream()
      }
    },
    updateDeepstream() {
      for(var key in this.kanbanGroups) {
        this.record.set(key, this.kanbanGroups[key])
      }
    },
    deleteCard(x) {
      for(var key in this.kanbanGroups) {
        this.kanbanGroups[key] = this.kanbanGroups[key].filter((val, idx, arr) => {
          return val != x
        })
      }
      this.updateDeepstream()
    },
    changeDept(x) {
      console.log(x);
      this.record.unsubscribe()
      this.record = this.$parent.$parent.ds.record.getRecord('myKanban'+x)
      this.record.subscribe(v=>{
        this.$nextTick(() => {
          this.kanbanGroups.backlog=v.backlog
          this.kanbanGroups.todo=v.todo
          this.kanbanGroups.hold=v.hold
          this.kanbanGroups.process=v.process
          this.kanbanGroups.done=v.done
          this.kanbanGroups.archive=v.archive
        })
      },true)
    }
  },
  components: {
    ModalAdd,
    ModalUpdate,
    Draggable,
    KanbanCard,
    MenuIcon,
    'popper': Popper
  },
  data: function() {
    return {
      abdel: '',
      newUpdateData: {
        text: '',
        created: '',
        type: 'normal'
      },
      kanbanGroups: {
        backlog: [],
        todo: [],
        hold: [],
        process: [],
        done: [],
        archive: [],
      },
      colors: {
        backlog: '#253858',
        todo: '#00B8D9',
        hold: '#FF5630',
        process: '#FFAB00',
        done: '#57D9A3',
        archive: '#DFEA8D'
      },
      popovers: {
        backlog: 'kumpulan ide yang ingin direalisasikan',
        todo: 'tugas yang dipersiapkan di awal hari',
        hold: 'tugas yang sementara tertunda',
        process: 'tugas yang sedang berjalan',
        done: 'tugas yang sudah selesai',
        archive: 'tugas yang sudah selesai di bulan sebelumnya'
      },
      // ds: dss('localhost:6020'),
      record: '',
      curUser: ''
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        ghostClass: "ghost"
      }
    }
  },
  mounted() {
    this.curUser =  this.$ls.get('user')
    this.DeptSelector = this.curUser.department[0]
    if(!this.$parent.$parent.ds) {
      this.$parent.$parent.login(this.curUser.uname, this.curUser.pass)
    }
    this.record=this.$parent.$parent.ds.record.getRecord('myKanban'+this.curUser.department[0])
    this.record.subscribe(v=>{
      this.$nextTick(() => {
        this.kanbanGroups.backlog=v.backlog
        this.kanbanGroups.todo=v.todo
        this.kanbanGroups.hold=v.hold
        this.kanbanGroups.process=v.process
        this.kanbanGroups.done=v.done
        this.kanbanGroups.archive=v.archive
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.kanban-container {

  margin-top: 100px;
  display: flex;
  align-items: flex-start;
  padding: 4px 6px;
}
.kanban-group {
  position: relative;
  background-color: grey;
  border-radius: 8px;
  margin: 2px 4px;
  padding: 4px 6px;
  min-width: 212px;
}
.kanban-title {
  padding: 4px 6px;
  text-align: center;
  color: white;
  font-weight: bold;
  cursor: default;
}
.kanban-title:hover {
  text-shadow: 0px 0px 4px rgba(255, 255, 255, 1);
}

// draggable
.no-move, .flip-list-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.nav {
  position: fixed;
  background-color: white;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 14px 16px;
  margin-bottom: 8px;
  align-items: center;
  z-index: 99;
  // border-bottom: 1px solid grey;

  button {
    padding: 4px 6px;
  }
}
// end draggable

#button-add {
  position: absolute;
  top: -28px;
  left: 7px;

  border-style: none;
  border-radius: 6px 6px 0 0;

  background-color: rgba(#253858, 0.7);
  color: white;

  padding: 0px 6px;
  font-size: 1.5em;
  cursor: default;
}

#btnLogout {
  border-style: none;
  padding: 6px 12px;
  border-radius: 4px;
  background-color: #FF5630;
  color: white;
}

button:hover {
  text-shadow: 0px 0px 4px rgba(255, 255, 255, 1);
}

.mydraggable {
  min-height: 70px;
  // background-color: #F8FAFB;
  background-color: rgba(white, 0.1);
  border-radius: 6px;
}
</style>
