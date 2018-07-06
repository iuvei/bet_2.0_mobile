<!--未结算订单明细-->

<template>
    <div id="unclear">

      <div class="user_message mt15" v-for="(v,k) in list">
        <!--<p> <span class="pull-left">第2018025810期</span>  <span class="pull-right">2018-05-08 14:00:00</span></p>-->
        <p>
          <span class="pull-left">第{{v.expect}}期</span>
          <span class="color-gray bold pull-right">订单：{{v.order_no}}</span>
        </p>
        <p>
          <span class="pull-left">
            下注金额：<span class="color-red">{{v.money}}</span>
          </span>
          <span class="pull-right"> {{v.lty_name}} / {{v.mark_a}} / {{v.mark_b}}</span>
          <!--<span class="pull-right change-money"><span class="color-red">100.00</span></span>-->
        </p>
        <p>
          <span class="pull-left">预赢金额：<span class="color-green">{{v.win}}</span></span>
          <span class="pull-right  ml10"> 赔率：{{v.rate}}   </span>
        </p>
      </div>


<!--
      <div class="user_message mt15">
        <p> <span class="pull-left">第2018025810期</span>  <span class="pull-right">2018-05-08 14:00:00</span></p>
        <p>
          <span class="pull-left">第2018025810期</span>
          <span class="color-gray bold pull-right">订单：2014034506084520</span>
        </p>
        <p>
          <span class="pull-left">
            下注金额：<span class="color-red">100.00</span>
          </span>
          <span class="pull-right"> 加拿大28 / 两面盘 / 小单</span>
          <span class="pull-right change-money"><span class="color-red">100.00</span></span>
        </p>
        <p>
          <span class="pull-left">预赢金额：<span class="color-green">42.00</span></span>
          <span class="pull-right  ml10"> 赔率：4.200   </span>
        </p>
      </div>
-->





    </div>
</template>

<script>
    export default
    {
        name: "Unclear",
        data:function(){
            return{
              list:[],
          };
        },
        methods:{
        //  获取数据
          get_data_list:function(){
            this.$http.get(this.api +'/ssc/history/clear').then(function(res){
              console.log(res);
              if(res.status == 200){
                this.list=res.data.data.list;
              }
            })
          }
        },

        created:function(){
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
