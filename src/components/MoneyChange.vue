<template>
  <div id="money-change">



    <div class="user_message" v-for="(v,k) in money_change_data">
      <p>
        <span class="pull-left">{{v.opr_time}}</span>
        <span class="pull-right">余额: {{v.cur}}.00</span></p>
      <p>
        <span class="pull-left"> {{v.con}}</span>
        <span class="pull-right change-money"><span :class="v.chg<=0?'color-red':'color-green'">{{v.chg<=0?'':'+'}}{{v.chg}}</span></span>
      </p>
    </div>


  </div>


</template>

<script>
  export default {
    name: "MoneyChange",
    data()
    {
      let data =
        {
          money_change_data:[],//资金变动的数据
        };
      return data;
    },
    methods :
      {
        get_money_details:function( url =`${this.api}/chgs` )
        {
          this.$http.get(url)
            .then(function(res)
            {
              if(res.data.status == 200)
              {

                this.money_change_data = res.data.data.chgs.list;
                /*this.hasPrev = res.data.data.chgs.hasPrev;
                this.hasNext = res.data.data.chgs.hasNext;
                this.sum = res.data.data.chgs.sum;
                this.pageNum = res.data.data.chgs.pageNum;
                this.prevPageUrl = this.hasPrev?res.data.data.chgs.prevPageUrl:'';
                this.nextPageUrl = this.hasNext?res.data.data.chgs.nextPageUrl:'';
                this.page = res.data.data.chgs.curPage;*/
              }
              else
              {
                this.$toast({
                  message: `数据加载失败，请稍后再试！`,
                });
              }

            });
        },
      },//end methods
    created()
    {
      this.get_money_details();
    },//end created
  }
</script>

<style scoped>
  #money-change
  {
    /*font-size: 0.8rem;*/
    padding-bottom: 56px;
  }

  .user_message
  {
    width: 95%;
    margin:5px auto;
    padding:0.8rem 0.8rem;
    box-sizing: border-box;
    background: rgba(255,255,255,0.1);
    border-top-left-radius:15px;
    border-bottom-left-radius:15px;
    text-indent: 0.3rem;

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
