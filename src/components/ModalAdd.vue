<template lang="html">
  <div class="modalAdd" v-show="isVisible">
    <div class="container">

      <div class="header">
        <div>Tambah kartu</div>
        <button @click="close">x</button>
      </div>

      <div class="content">
        <table>
          <tr>
            <td>title</td><td><input ref="mytitle" v-model="newCard.title"></td>
          </tr>
          <tr>
            <td>priority</td><td><star-rating v-model="newCard.priority" :padding="10" :border-color="'#4C3300'" :border-width="2" :show-rating="false" :star-size="25" /></td>
          </tr>
          <tr>
            <td>due</td><td><datetime :input-style="{padding: '4px 6px'}" type="datetime" v-model="newCard.due"></datetime></td>
          </tr>
        </table>
      </div>

      <div class="footer">
        <button @click="confirmAddCard">add</button>
      </div>

    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'modalAdd',
  components: {
    StarRating
  },
  data: () => {
    return {
      isVisible: false,
      newCard: {
        title: '',
        priority: 1,
        created: '',
        due: '',
        updates: []
      }
    }
  },
  props: ['bl'],
  methods: {
    close() {
      this.isVisible = false
    },
    open() {
      this.isVisible = true
      this.$nextTick(() => {
        this.$refs.mytitle.focus()
      })
    },
    confirmAddCard() {
      this.newCard.created= Date.now()
      this.newCard.updates.unshift({
        text: 'created',
        created: Date.now(),
        due: ''
      })

      this.bl.push(this.newCard)
      this.$emit('save')
      this.close();

      this.newCard = {
        title: '',
        priority: 1,
        created: '',
        due: '',
        updates: []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modalAdd {
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
  min-width: 200px;
}
.header, .content, .footer, button, input, td {
  padding: 4px 6px;
}
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  align-items: flex-end;
}
.content {
  border-bottom: 1px solid rgba(0,0,0,0.1);
}
.footer {
  display: flex;
  justify-content: flex-end;
}
</style>
