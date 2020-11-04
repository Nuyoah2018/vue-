<template>
  <div>
      <div id="main" class="box"></div>
  </div>
</template>

<script>
//1.引入echarts 
import echarts from "echarts"

import {mapGetters,mapActions} from "vuex"

export default {
    
  computed:{
      
    ...mapGetters({
      list:"cate/list"
      
    })
  },
  methods:{
    ...mapActions({
      reqList:"cate/reqListAction"
    })
  },
  watch:{
      
    list:{
        
      handler(){
        if(this.list.length>0){
          //数据回来之后才画图表
          let myChart=echarts.init(document.getElementById("main"))
          var option = {
            title: {
                text: '商品分类详情'
            },
            tooltip: {},
            legend: {
                data:["子分类数量"]
            },
            xAxis: {
                //list=[{catename:"家用电器"},{catename:"没转护肤"}]-->["家用电器","没转护肤"]
                data: this.list.map(item=>item.catename)
            
            },
            yAxis: {},
            series: [
                {
                    name: '子分类数量',
                    type: 'line',
                    //list=[{catename:"家用电器",chilren:[{},{}]},{catename:"没转护肤"},chilren:[{}]}, {catename:"家用电器"}]-->[2,1,0]
                    data: this.list.map(item=>item.children?item.children.length:0)
                },
                
            ]
          };

          myChart.setOption(option)
        }
      },
      deep:true
    }
  },
  mounted(){
      //获取list
      this.reqList();

     
  }
}
</script>

<style scoped>
.box{
  width: 100%;
  height:800px;
  background: pink;
  margin: 0px auto;
}
</style>