<template lang="html">
  <div class="modal" v-show="isVisible">

    <div class="container">

      <div class="header">
        <p-check style="margin: 4px 4px" @change="updateTitlePriority" v-model="canEditUpdate" class="p-switch p-fill" color="success"><b>Toggle Edit</b></p-check>

        <button id="btnClose" @click="close">x</button>
      </div>

      <div class="content">
        <table>

          <tr>
            <td class="tdInfo">Title</td>
            <td  v-if="canEditUpdate">
              <input v-model="oldCardData.title" />
            </td>
            <td v-else style="">{{curCardData.title}}</td>
          </tr>

          <tr>
            <td class="tdInfo">Priority</td>
            <!-- <input v-model="oldCardData.priority"  v-if="canEditUpdate" type="number" min="1" max="5"> -->
            <td v-if="canEditUpdate">
              <star-rating  v-model="oldCardData.priority" :padding="10" :border-color="'#4C3300'" :border-width="2" :show-rating="false" :star-size="22.5" />
            </td>
            <td v-else><star-rating :read-only="true" v-model="curCardData.priority" :padding="10" :border-width="2" :show-rating="false" :star-size="22.5" /></td>
          </tr>

          <tr>
            <td class="tdInfo">Due</td>
            <td v-if="canEditUpdate">
              <datetime :input-style="{padding: '4px 6px'}" type="datetime" v-model="oldCardData.due"></datetime>
            </td>
            <td v-else>
              <a v-if="curCardData.due">{{curCardData.due | myTime}}</a>
              <a v-else>-</a>
            </td>
          </tr>

          <tr>
            <td class="tdInfo">Created</td>
            <td>{{curCardData.created | myTime}}</td>
          </tr>

        </table>
      </div>

      <div class="footer">
        <div class="" style="width: 100%;display: flex; ">
          <input ref="myupdate" v-model="newUpdateData.text" style="flex-grow: 99;" placeholder="tuliskan progress anda...">
          <button id="btnAdd" @click="confirmAddUpdate">update</button>
        </div>

        <div class="" style="display: flex; flex-direction: column; overflow-y: scroll;height: 200px;">
          <div class="update-data" v-for="element in curCardData.updates">
            <a v-if="element.type=='normal'" >{{element.text}}</a>
            <a v-else style="color: grey; font-size: 0.7em">{{element.text}}</a>
            <br>
            <a style="font-size: 0.7em">
              {{element.created | myTime}}
            </a>
          </div>
        </div>

      </div>

      <div class="help">
        <drag-verify v-if="resetDeleteButton" @passcallback="deleteCard" :width="400"
        :height="40"
        :text="'swipe to delete'"
        :success-text="'deleted'"
        :background="'#FFAB00'"
        :progress-bar-bg="'#E54D2B'"
        :completed-bg="'#E54D2B'"
        :handler-bg="'#fff'"
        :circle="false"></drag-verify>
      </div>

    </div>

  </div>
</template>

<script>
import dragVerify from 'vue-drag-verify'
import StarRating from 'vue-star-rating'

export default {
  name: 'modal',

  components: {
    dragVerify,
    StarRating
  },

  data: () => {
    return {
      isVisible: false,
      canEditUpdate: false,
      newUpdateData: {
        text: '',
        created: '',
        type: 'normal'
      },
      resetDeleteButton: true,
      curCardData: {},
      oldCardData: {}
    }
  },

  props: ['kanbanGroups'],

  filters: {
    myTime: function(x) {
      var temp = new Date(x)
      return temp.toLocaleDateString('ID', {
        hour: 'numeric',
        minute: 'numeric',
      	day : 'numeric',
      	month : 'short',
      	year : 'numeric'
      })
    }
  },

  methods: {
    close() {
      this.isVisible = false
    },

    open(x) {
      this.resetDeleteButton = true
      this.canEditUpdate = false
      for(var k in x) this.oldCardData[k]=x[k];
      this.curCardData = x
      this.isVisible = true
      this.$nextTick(() => {
        this.$refs.myupdate.focus()
      })
    },

    updateTitlePriority() {
      if(!this.canEditUpdate) {
        this.curCardData = this.findCard(this.curCardData)
        if(this.curCardData.title != this.oldCardData.title) {
          this.newUpdateData = {
            text: 'change title from '+this.curCardData.title+' to '+this.oldCardData.title,
            created: new Date(),
            type: 'system'
          }
          this.curCardData.updates.unshift(this.newUpdateData)
          this.newUpdateData = {
            text: '',
            created: '',
            type: 'normal'
          }
          this.curCardData.title=this.oldCardData.title
        }
        if(this.curCardData.due !=this.oldCardData.due) {
          this.newUpdateData.created = new Date()
          this.newUpdateData = {
            text: 'change due date from '+this.$options.filters.myTime(this.curCardData.due)+' to '+this.$options.filters.myTime(this.oldCardData.due),
            created: new Date(),
            type: 'system'
          }
          this.curCardData.updates.unshift(this.newUpdateData)
          this.newUpdateData = {
            text: '',
            created: '',
            type: 'normal'
          }
          this.curCardData.due=this.oldCardData.due
        }
        if(this.curCardData.priority !=this.oldCardData.priority) {
          this.newUpdateData.created = new Date()
          // this.newUpdateData.text = 'change priority from '+this.curCardData.priority+' to '+this.oldCardData.priority,
          this.newUpdateData = {
            text: 'change priority from '+this.curCardData.priority+' to '+this.oldCardData.priority,
            created: new Date(),
            type: 'system'
          }
          this.curCardData.updates.unshift(this.newUpdateData)
          this.newUpdateData = {
            text: '',
            created: '',
            type: 'normal'
          }
          this.curCardData.priority=this.oldCardData.priority
        }
        this.$emit('save')

      }else {
        this.curCardData = this.findCard(this.curCardData)
        for(var k in this.curCardData) this.oldCardData[k]=this.curCardData[k];
      }
    },

    confirmAddUpdate() {
      this.curCardData = this.findCard(this.curCardData)
      for(var k in this.curCardData) this.oldCardData[k]=this.curCardData[k];
      this.newUpdateData.created = new Date()
      this.curCardData.updates.unshift(this.newUpdateData)
      this.$emit('save')

      this.newUpdateData = {
        text: '',
        created: '',
        type: 'normal'
      }

    },

    deleteCard() {
      this.curCardData = this.findCard(this.curCardData)
      setTimeout(() => {
        this.close()
        this.$emit('delete',this.curCardData)
        this.resetDeleteButton = false

      }, 500);
    },

    findCard(x) {
      var temp=-99
      for(var key in this.kanbanGroups) {
        if(temp=this.kanbanGroups[key].find(e => {return e.created == x.created}))
          return temp
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.7)
}

.container {
  background-color: white;
  width: 400px;
  border-radius: 8px;
}

.header, .content, .footer, button, input, td {
  padding: 4px 6px;
  // color: #253858;
}

.header {
  color: #253858;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  align-items: flex-end;
}

.content {
  padding: 6px 6px;
  font-size: 0.9em;
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
td {
  height: 35px;
  word-wrap: break-word;
  white-space: normal;
  word-break: break-all;
}

.footer {
  background-color: #F8FAFB;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
}

.update-data {
  width: 370px;
  word-wrap: break-word;
  border-bottom: 1px solid grey;
  padding: 4px 6px;
}

.help {
  height: 38px;
  overflow-y: hidden;
}

.tdInfo {
  font-size: 0.87em;
  width: 80px;
  color: rgba(black,0.7);
}

#btnClose {
  border-radius: 0 6px 0 0;
  border-style: none;

  background-color: #FF5630;
  color: white;
}

#btnAdd {
  border-style: none;

  background-color: #00B8D9;
  color: white;

  padding: 8px 12px;
}

button:hover {
  text-shadow: 0px 0px 4px rgba(255, 255, 255, 1);
}

</style>
