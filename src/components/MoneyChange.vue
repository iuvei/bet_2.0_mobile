<template>
    <div id="money-change">
         <div class="user_message" v-for="(v,k) in list">
            <p> <span class="pull-left">{{v.opr_time}}</span>  <span class="pull-right">余额: {{v.cur}}</span></p>
            <p>
              <span class="pull-left"> {{v.con}}</span>
              <span class="pull-right change-money">
                <span :class="v.chg>=0?'color-green':'color-red'" >{{v.chg>=0?'+':''}}{{v.chg}}</span>
              </span>
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
            list:[],

          };
          return data;
        },
        //this.global.config.API  == this.api
        methods:{
          get_money:function(){
            this.$http.get(this.api + '/chgs').then(function(res){
              console.log(res);
              if(res.status == 200){
                this.list = res.data.data.chgs.list;
                // this.list=res.data.data.list;
              }else{

              }
            })
          }
        },

        created:function(){
          this.get_money();
        }

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
