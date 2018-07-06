<!--cqssc的历史开奖记录-->
<template>
    <div id="cqssc-open-codes">
        <ul>
          <li v-for="(v,k) in list">
              <div>
                <span class="pull-left time">{{v.expect}} {{v.opentime.substring(10)}}</span>
                <div class="pull-right">
                  <span class="ball" v-for="(val,i) in v.open_codes" :class="'hhao'+(i+1)">{{val}}</span>
                </div>
                <div class="clear"></div>
              </div>

              <div>
                <p class="text-left open-codes-description">
                  <span>总和：{{get_sum(v.open_codes)}}-{{v.details.dragon_and_tiger[1].substring(2)}}-{{v.details.dragon_and_tiger[0].substring(2)}}</span>
                  <span>龙虎：{{v.details.dragon_and_tiger[v.details.dragon_and_tiger.length-1]}}</span>

                </p>
                <p class="text-left open-codes-description">
                  <span>前三：{{v.details.front_3[0]}}</span>
                  <span>中三：{{v.details.medium_3[0]}}</span>
                  <span>后三：{{v.details.end_3[0]}}</span>
                </p>
              </div>
          </li>

        </ul>
    </div>
</template>

<script>
    export default {
        name: "OpenCodesCqssc",
      data:function(){
          return{
            list:[],
            open_code_sum:[],
          }
      },
      methods:{
          get_list:function(){
            this.$http.get(this.api +'/ssc/history/lottery').then(function(res){
              // console.log(res);
              if(res.status == 200){
                this.list =res.data.data.list;
              }else{

              }
            })
          },
          //计算总和
          get_sum:function(arr){
            var sum=0;
            for(var i=0;i<arr.length;i++){
              sum+=parseInt(arr[i]);
            }
            return sum;
          }
      },
      created:function(){
          this.get_list();
      }
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
    width: 2rem;
    height: 2rem;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    font-size: 1.3rem;
    font-weight: 700;
    color: #f3f3f3;
    line-height: 2rem;
    margin-right: 5px;
  }
  .time
  {
    height: 2.2rem;
    line-height: 2.2rem;
  }
  .open-codes-description
  {
    font-size: 0.8rem;
    height: 20px;
    line-height: 20px;
  }
</style>
