<!--已结算订单明细-->

<template>


    <div id="unclear">

      <div class="user_message mt15" v-for="(v,k) in list">
        <!--<p> <span class="pull-left">第2018025810期</span>  <span class="pull-right">2018-05-08 14:00:00</span></p>-->
        <p>
          <span class="pull-left color-white">第{{v.expect}}期</span>
          <span class="color-gray bold pull-right">订单：{{v.order_no}}</span>
        </p>
        <p>
          <span class="pull-left">
            下注金额：<span class="color-red">{{v.money}}</span>
          </span>
          <span class="pull-right"> {{v.lty_name}} / {{v.mark_a}} / {{v.mark_b}}</span>
          <!--<span class="pull-right change-money"><span class="color-red">￥100.00</span></span>-->
        </p>
        <p>
          <span class="pull-left">输赢结果：<span :class="v.open_win>=0? 'color-red':'color-green'" >{{v.open_win>=0?'+':''}}{{v.open_win}}</span></span>
          <span class="pull-right  ml10"> 赔率：{{v.rate}}   </span>
        </p>

        <p>
          <span class="pull-left">投注时间：{{v.create_time}}</span>
          <span class="bold pull-right " :class="v.open_ret == 1? 'color-red': 'color-green' ">{{v.open_ret == 1? '中奖' :'未中奖'}}</span>
        </p>
      </div>

<!--
      <div class="user_message mt15">
        <p> <span class="pull-left">第2018025810期</span>  <span class="pull-right">2018-05-08 14:00:00</span></p>
        <p>
          <span class="pull-left color-white">第2018025810期</span>
          <span class="color-gray bold pull-right">订单：2014034506084520</span>
        </p>
        <p>
          <span class="pull-left">
            下注金额：<span class="color-red">100.00</span>
          </span>
          <span class="pull-right"> 加拿大28 / 两面盘 / 小单</span>
          <span class="pull-right change-money"><span class="color-red">￥100.00</span></span>
        </p>
        <p>
          <span class="pull-left">输赢结果：<span class="color-green">+195.00</span></span>
          <span class="pull-right  ml10"> 赔率：1.9500   </span>
        </p>

        <p>
          <span class="pull-left">投注时间：2018-06-19 15:30:00</span>
          <span class="color-green bold pull-right">中奖</span>
        </p>
      </div>
-->
    </div>


</template>

<script>
    export default
    {
        name: "Clear",
      data:function(){
          return{
            list:[],
          }
      },
      methods:{
          get_data_list:function(){
            this.$http.get(this.api + '/ssc/history/clear').then(function(res){
              console.log(res);
              if(res.status == 200){
                this.list=res.data.data.list;
              }
            })
          }
      },
      created(){
          this.get_data_list();
      }
    }
</script>

<style scoped>
  #unclear
  {
    /*font-size: 0.8rem;*/
    padding-bottom:4rem;
  }

  /*.user_message*/
  /*{*/
    /*width: 95%;*/
    /*margin:15px auto;*/
    /*padding:0.2rem 5px;*/
    /*border: 1px solid gray;*/
    /*-webkit-border-radius: 3px;*/
    /*-moz-border-radius: 3px;*/
    /*border-radius: 3px;*/
    /*box-sizing: border-box;*/
  /*}*/
  .user_message
  {
    width: 95%;
    margin:15px auto;
    padding:0.6rem 5px;
    background: rgba(255,255,255,0.1);
    box-sizing: border-box;
    border-top: 1px solid #e8c77a;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .user_message>p
  {
    height: 25px;
    line-height: 25px;
  }

  .change-money
  {
    font-size: 1.5rem;
  }
</style>
