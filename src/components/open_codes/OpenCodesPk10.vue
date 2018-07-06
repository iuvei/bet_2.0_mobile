<!--北京赛车pk10的历史开奖记录-->
<template>
    <div id="cqssc-open-codes">
        <ul>
          <li v-for="(v,k) in list">
            <div>
                <div class="time">{{v.expect}}  <span class="pull-right which-seconds">{{v.opentime.substring(10)}}</span></div>
                <!--<div class="time">{{v.opentime}}</div>-->
                <div class="clear"></div>
                <div >
                  <span class="ball" v-for="(val,i) in v.open_codes" :class=" 'hao'+(i+1) ">{{val}}</span>
                  <div class="clear"></div>
                </div>

              </div>
          </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "OpenCodesPk10",
      data:function(){
          return{
            list:[],
          }
      },
      methods:{
      //    获取数据 初始化
        get_list_data:function(){
          this.$http.get(this.api + '/pk10/history/lottery').then(function(res){
            // console.log(res);
            if(res.status == 200){
              this.list=res.data.data.list;
            }else{

            }
          })
        }
      },
      created:function(){
          this.get_list_data();
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
</style>
