<template>
   <div id="pk10">
     <!--头部-->
     <div class="header">
       <div class="mt15">
         <!--<span class="pull-left pre-expect">{{lastExpect}}</span>-->
         <span class="pull-left pre-expect">20180808052</span>
         <!--<span class="balls" v-for="v in lastOpenCode">{{v}}</span>-->
         <span class="balls" >1</span>
         <span class="balls" >1</span>
         <span class="balls" >1</span>
         <span class="balls" >1</span>
         <span class="balls" >1</span>
         <span class="balls" >1</span>
         <span class="balls" >1</span>
         <span class="balls" >1</span>
         <span class="balls" >1</span>
         <span class="balls" >1</span>
         <div class="clear"></div>
       </div>

       <div class="mt10 expect-time">
         <span>{{$store.state.cqssc.thisExpect}}</span> &nbsp;&nbsp;
         <span>{{$store.state.cqssc.open_time<60?'准备开盘':'距离封盘'}} ：{{$store.state.cqssc.hours}}:{{$store.state.cqssc.minute}}:{{$store.state.cqssc.seconds}}</span>
       </div>
     </div>
     <!--/头部-->


     <!--选项卡-->
     <div class="tabs" style="margin-bottom: 55px;">
       <ul>
         <li v-for="(v,k) in tab1" :class="isActive[k]?'active':''" @click="tabs(k)">{{v}}</li>
       </ul>
     </div>
     <!--/选项卡-->


     <!--下注金额选择-->
     <div class="choose-money" style='position:fixed;bottom: 56px;left: 0;'>
       <span class="bg-white reset" @click="reset">重置</span>
       <!--<span></span>-->
       <span style="background-position: -32px 0;" :class="bet_money == 5?'selected':''"
             @click="changeBetMoney(5)"></span>
       <span style="background-position: -61px 0;" :class="bet_money == 10?'selected':''"
             @click="changeBetMoney(10)"></span>
       <span style="background-position: -91px 0;" :class="bet_money == 50?'selected':''"
             @click="changeBetMoney(50)"></span>
       <span style="background-position: -121px 0;" :class="bet_money == 100?'selected':''"
             @click="changeBetMoney(100)"></span>
       <span style="background-position: -151px 0;" :class="bet_money == 500?'selected':''"
             @click="changeBetMoney(500)"></span>
     </div>
   </div>
</template>

<script>
    export default {
        name: "Pk10",
        data()
        {
          let data =
          {
            tab1: ['两面盘', '数字盘', '冠、亚军', '三、四名','五、六名', '七、八名','九、十名'],
            isActive: [1, 0, 0, 0, 0, 0, 0],
            bet_money:10,
          };
          return data;
        },
        methods:
        {
          /**
           * 切换选项卡
           */
          tabs(index) {
            this.isActive = [0, 0, 0, 0, 0, 0, 0];
            this.isShowThisDiv = [0, 0, 0, 0, 0, 0, 0];
            this.isActive[index] = 1;
            this.isShowThisDiv[index] = 1;
          },
          //改变下注金额
          changeBetMoney: function (money) {
            this.bet_money = money;
          },
          reset() {
            //清空数据
            this.bets = [];

          },
        },

    }
</script>

<style scoped>
  @import "../assets/css/pk10.css";
</style>
