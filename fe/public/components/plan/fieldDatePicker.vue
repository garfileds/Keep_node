<template>
  <section class="field">
    <div class="field__name">时间</div>
    <div class="field__content">
      <el-date-picker class="el-date-editor--keep"
        v-show="editorVisible"

        v-model="val"
        type="date"
        size="large"
        format="MM/dd/yyyy"
        :editable="false"
        placeholder=""
        :picker-options="pickerOptions"
        @changeVisible="handlePickerVisible">
      </el-date-picker>
      <input type="hidden" name="start_day" :value="formatSelectedDay">
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import '../../style/blocks/field';
  @import '../../../node_modules/element-ui/lib/theme-default/date-picker.css';

  .field__content {
    text-align: left;
  }
</style>

<script>
  import Vue from 'vue'
  import { DatePicker } from 'element-ui'
  Vue.component(DatePicker.name, DatePicker)

  import { formatDate } from '../../js/module/utils'

  export default {
    name: 'fieldDatePicker',

    data: function () {
      let defaultDay = formatDate(new Date(), 'yy-mm-dd')

      return {
        val: defaultDay,

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },

        editorVisible: true
      }
    },

    watch: {
      val(selectedDay) {
        this.$emit('changeDate', formatDate(selectedDay, 'mm/dd/yy'))
      }
    },

    computed: {
      today() {
        return this.val.length > 0 ? this.val : formatDate(new Date())
      },

      formatSelectedDay() {
        return formatDate(new Date(this.val), 'mm/dd/yy')
      }
    },

    methods: {
      handlePickerVisible(status) {
        this.$emit('changeVisible', status)
//        this.editorVisible = !statu
      }
    }
  }
</script>