<template>
  <section class="filed">
    <div class="filed__name">时间</div>
    <div class="filed__content">
      <el-date-picker class="el-date-editor--keep"
        v-model="val"
        type="date"
        size="large"
        editabble="false"
        placeholder="选择日期"
        :picker-options="pickerOptions">
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

  module.exports = {
    name: 'filedDatepicker',

    data: function () {
      return {
        val: '',

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      }
    },

    methods: {
    }
  }
</script>