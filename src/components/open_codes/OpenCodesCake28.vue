<!--加拿大28的历史开奖记录-->
<template>
    <div id="cqssc-open-codes">
        <ul>
          <li v-for="(v,k) in list">
            <div>
                <div class="time">{{v.expect}}  <span class="pull-right which-seconds">{{v.opentime.substring(10)}}</span></div>
                <div class="clear"></div>
                <div >
                  <span class="ball bg-red">{{v.details.ball_0[0]}}</span>
                  <span class="jjcc">+</span>
                  <span class="ball bg-green">{{v.details.ball_0[1]}}</span>
                  <span class="jjcc">+</span>
                  <span class="ball bg-blue">{{v.details.ball_0[2]}}</span>
                  <span class="jjcc">=</span>
                  <span class="ball bg-white">{{v.details.ball_1[0]}}</span>
                  <div class="clear"></div>
                </div>
              </div>
          </li>
          <!--
          <li>
            <div>
                <div class="time">20180616023  <span class="pull-right which-seconds">15:14:30</span></div>
                <div class="clear"></div>
                <div >
                  <span class="ball bg-red">1</span>
                  <span class="jjcc">+</span>
                  <span class="ball bg-green">2</span>
                  <span class="jjcc">+</span>
                  <span class="ball bg-blue">3</span>
                  <span class="jjcc">=</span>
                  <span class="ball bg-white">6</span>
                  <div class="clear"></div>
                </div>
              </div>
          </li>
          -->

        </ul>
    </div>
</template>

<script>
    export default {
        name: "OpenCodesCake28",
        data:function(){
          var data={
            list:[],
          };
          return data;
        },

        methods:{
          get_data_list:function(){
            this.$http.get(this.api + '/cake/history/lottery' ).then(function(res){
              console.log(res);
              if(res.status == 200){
                this.list=res.data.data.list;
              }else{

              }
            })
          }
        },
        created(){
          this.get_data_list();
        },
    }
</script>

<style scoped>
  #cqssc-open-codes
  {
    width:100%;
    padding:8px 5%;
    box-sizing: border-box;
  }
  ul
  {
    width: 100%;
    padding-bottom: 4rem;
  }
  ul>li
  {
    width: 100%;
    padding: 9px 3px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    font-size: 1rem;
  }
  .ball
  {
    display: inline-block;
    width: 1.7rem;
    height: 1.7rem;
    font-size: 1.3rem;
    font-weight: 700;
    color: #f3f3f3;
    line-height: 1.7rem;
    margin-right: 0.6rem;
    float: left;
  }
  .time
  {
    width: 100%;
    height: 2.2rem;
    line-height: 2.2rem;
    text-align: left;
    /*text-indent: ;*/
  }
  .open-codes-description
  {
    font-size: 0.8rem;
    height: 20px;
    line-height: 20px;
  }
  .which-seconds
  {
    margin-right: 1.6rem;
  }
  .jjcc
  {
    display: inline-block;
    width: 1.7rem;
    height: 1.7rem;
    font-size: 1.4rem;
    font-weight: 700;
    color: #f3f3f3;
    line-height: 1.7rem;
    margin-right: 0.6rem;
    float: left;
  }
</style>
