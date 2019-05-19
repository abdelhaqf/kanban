<template lang="html">

  <div class="modalAdd" v-show="isVisible">
    <div class="container">
      <div class="header">
        <div><b>Tambah kartu</b></div>
        <button id="btnClose" @click="close">x</button>
      </div>
      <div class="content">
        <table>
          <tr>
            <td>Title</td>
            <td><input ref="mytitle" v-model="newCard.title"></td>
          </tr>
          <tr>
            <td>Priority</td>
            <td>
              <star-rating v-model="newCard.priority"
                           :padding="10"
                           :border-color="'#4C3300'"
                           :border-width="2"
                           :show-rating="false"
                           :star-size="22.5" />
            </td>
          </tr>
          <tr>
            <td>Due</td>
            <td>
              <datetime :input-style="{padding: '4px 6px'}" type="datetime" v-model="newCard.due"></datetime>
            </td>
          </tr>
        </table>
      </div>
      <div class="footer">
        <button id="btnAdd" @click="confirmAddCard">add</button>
      </div>
    </div>
  </div>

</template>

<script>

  import StarRating from 'vue-star-rating'
  export default {
    name: 'modalAdd',
    components: { StarRating },
    data: () => {
      return {
        isVisible: false,
        newCard: { title: '', priority: 1, created: '', due: '', updates: [] }
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
        this.newCard.created = Date.now()
        this.newCard.updates.unshift({ text: 'created', created: Date.now(), due: '' })
        // this.bl.push(this.newCard)
        // this.$emit('save')
        this.$parent.dsAdd(this.newCard)
        this.close()
        this.newCard = { title: '', priority: 1, created: '', due: '', updates: [] }
      }
    }
  }

</script>

<style lang="scss" scoped>

  .modalAdd {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .container {
    background-color: white;
    min-width: 200px;
    border-radius: 8px;
  }
  button,
  input,
  td {
    padding: 4px 6px;
  }
  tr {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .content {
    padding: 8px 12px;
    font-size: 0.9em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .header {
    color: #253858;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 8px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 8px;
  }
  #btnAdd {
    border-style: none;
    border-radius: 0 0 6px 0;
    background-color: #00b8d9;
    color: white;
    padding: 8px 12px;
  }
  #btnClose {
    border-radius: 0 6px 0 0;
    border-style: none;
    background-color: #ff5630;
    color: white;
  }
  button:hover {
    text-shadow: 0px 0px 4px rgba(255, 255, 255, 1);
  }

</style>
