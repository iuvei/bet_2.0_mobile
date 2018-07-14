<!--结算报表-->
<template>
    <div id="diagram">

        <div class="today" v-for="(v,k) in data_list">
            <div class="today-left pull-left">
                <div class="yy-sg">{{china_week[k]}}</div>
                <div class="today-left-details" @click="turnUrl('diagram_details')">明细></div>
            </div>
          <div class="today-right pull-right">
            <span class="block">盈亏： <span :class="get_sum(v,'win')>=0?'color-red':'color-green'">{{get_sum(v,'win')>=0?'+':'-'}}{{get_sum(v,'win')}}</span></span>
            <span class="block">投注： <span class="color-red">{{get_sum(v,'sum_money')}}</span></span>
            <span class="block">返水： <span class="color-red">{{get_sum(v,'fs')}}</span></span>
            <span class="block">中奖： <span :class="get_sum(v,'sum_money')>=0?'color-red':'color-green'">{{get_sum(v,'sum_money')>=0?'+':'-'}}{{get_sum(v,'sum_money')}}</span></span>
            <!--<span class="block">充值： <span class="color-green">+100.00</span></span>-->
            <!--<span class="block">提现： <span class="color-red">+100.00</span></span>-->
          </div>
        </div>

<!--
      <div class="today">
        <div class="today-left pull-left">
          <div class="yy-sg">本周</div>
          <div class="today-left-details" @click="turnUrl('diagram_details')" >明细></div>
        </div>

        <div class="today-right pull-right">
          <span class="block">盈亏： <span class="color-green">+100.00</span></span>
          <span class="block">投注： <span class="color-red">100.00</span></span>
          <span class="block">返水： <span class="color-green">+100.00</span></span>
          <span class="block">中奖： <span class="color-green">+100.00</span></span>
          <span class="block">充值： <span class="color-green">+100.00</span></span>
          <span class="block">提现： <span class="color-red">+100.00</span></span>
        </div>
      </div>
-->




    </div>
</template>

<script>
    export default
    {
        name: "DiagramClear",
      data(){
          return{
            data:[],//全部数据
            data_list:[],
            china_week:['上周','本周','本月'],
          }
      },
      methods:{
        //  获取初始化数据
        get_all_data:function(){
          this.$http.get(this.api + '/clearList').then(function(res){
            // console.log(res);
            if(res.status == 200){
              this.data = res.data.data;
              for(var i in this.data){
                this.data_list.push(this.data[i]);
              }
              console.log(this.data_list);
            }
          })
        },
        //累计、合计
        get_sum:function(arr,type){
            let sum = 0;
            for(let i=0;i<arr.length;i++){
              sum+=arr[i].sum_data[type];
            }
            return sum.toFixed(2);
        }
      },
      created(){
          this.get_all_data();
      }
    }
</script>

<style scoped>
    .today
    {
      width: 95%;
      margin:15px auto;
      height: 120px;
      border: 1px solid #fff;
      border-radius:5px;
    }
    .today-left
    {
      width: 100px;
      height: 100%;
    }
    .yy-sg
    {
      height: 75px;
      line-height: 75px;
      color: #f3f3f3;
      font-size: 24px;
      font-weight:700;
    }
    .today-left-details
    {
      height: 45px;
      line-height:45px;
      font-size: 16px;
    }
    .today-right
    {
      width: 240px;
      box-sizing: border-box;
      padding-top: 15px;
      height: 100%;
      color:white;
    }
    .block
    {
      width: 120px;
      display: block;
      text-align:left;
      text-indent:8px;
      height: 30px;
      line-height: 30px;
      float: left;
      font-size: 0.9rem;
    }
</style>
