<template>
  <section class="filed">
    <div class="filed__name">时间</div>
    <div class="filed__content">
      <el-date-picker class="el-date-editor--keep"
        v-show="editorVisible"

        v-model="val"
        type="date"
        size="large"
        :editable="false"
        placeholder=""
        :picker-options="pickerOptions"
        @changeVisible="handlePickerVisible">
      </el-date-picker>
    </div>
  </section>
</template>

<style scoped>
  @import url(./filed.css);
  @import url(/node_modules/element-ui/lib/theme-default/date-picker.css);

  .filed__content {
    text-align: left;
  }
</style>

<script>
  import { DatePicker } from 'element-ui'
  Vue.component(DatePicker.name, DatePicker)

  import { formatDate } from '../../js/module/utils'

  export default {
    name: 'filedDatepicker',

    data: function () {
      return {
        val: '',

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },

        editorVisible: true
      }
    },

    computed: {
      today: function () {
        return this.val.length > 0 ? this.val : formatDate(new Date())
      }
    },

    methods: {
      handlePickerVisible(statu) {
        this.$emit('changeVisible', statu)
//        this.editorVisible = !statu
      }
    }
  }
</script>