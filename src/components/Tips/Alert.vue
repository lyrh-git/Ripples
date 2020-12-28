<template>
<div>
	<Button type="primary" @click="downtemp = true" style="margin-left:60px;" size="small">下载模板</Button>
	   <modal
	     v-model="downtemp"
	     title="提示"
	     @on-ok="downtempok"
	     @on-cancel="downtempcancel"
	     ok-text="确定修改"
	     cancel-text="取消"
	   >
	     <!-- <p style="text-align:center">
	       <Icon type="ios-checkmark-circle-outline" size="30"/>
	     </p> -->
	     <p style="text-align:center; font-size:30px ">{{message}}</p>
	     <!-- <p style="text-align:center; font-size:10px ">成功导入数据 553 条，导入失败数据 10 条</p>
	     <p style="text-align:center; font-size:10px;color:orange ">下载导入失败数据</p> -->
	   </modal>
       </div>
</template>

<script>
export default {
    name:"Alert",
  data() {
    return {
      downtemp: false
    };
  },
  methods:{
	  downtempok(){
		  alert("ok")
	  },
	  downtempcancel(){
		  alert("cancel")
	  }
  },
  props:['message']
}
</script>
