<!--首页-->
<template>
    <div class="hello" style="padding-bottom: 58px;">


        <div class="notice" >
            <span class="letter-icon" >
                <i class="fa fa-envelope"></i>
            </span>

            <marquee class="pull-left notice-txt">尊敬的客户：您好，目前尚未正式运营，请您持续关注，敬请期待      欢迎来到WM 点击下方「在线客服」将由专人为您服务      </marquee>

            <div class="clear"></div>
        </div>

        <mt-swipe :auto="4000" style="height:160px;">
            <mt-swipe-item>
                <img src="../assets/img/b1.png" alt="" width="100%" height="100%">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../assets/img/b2.png" alt="" width="100%" height="100%">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../assets/img/b3.png" alt="" width="100%" height="100%">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../assets/img/b4.png" alt="" width="100%" height="100%">
            </mt-swipe-item>
        </mt-swipe>



        <div class="home-links">
            <a href="">关于VM</a>
            <a href="" class="color-white">充提中心</a>
            <a href="" > <span class="online-girl">在线客服</span></a>
        </div>


        <div class="lotteies">
            <!--1-->
            <div class="baijia">
                <div class="baijiale1 bgbg firstone">
                    <img src="../assets/img/mid_i101.png" alt="" width="60px" style="margin-top: 20px;">
                    <p>开奖大厅</p>
                    <span class="hot">HOT</span>
                </div>

                <div class="baijiale1">
                    <div class="bjls bgbg" @click="turnTo('pk10')">
                        <img src="../assets/img/icon_bjpk.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">北京赛车</div>
                    </div>

                    <div class="bjls bgbg mt6" @click="turnTo('cqssc')">
                        <img src="../assets/img/icon_ssc.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">时时彩</div>
                    </div>
                </div>

                <div class="baijiale1">
                    <div class="bjls bgbg" @click="turnTo('Pcegg')">
                        <img src="../assets/img/icon_lhc.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">PC蛋蛋</div>
                    </div>

                    <div class="bjls bgbg mt6">
                        <img src="../assets/img/icon_jnd28.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">加拿大28</div>
                    </div>
                </div>
            </div>
            <!--2-->
            <div class="baijia">
                <div class="baijiale1 bgbg firstone">
                    <img src="../assets/img/mid_i201.png" alt="" width="60px" style="margin-top: 20px;">
                    <p>微投利鑫彩票</p>
                    <span class="hot">HOT</span>
                </div>

                <div class="baijiale1">
                    <div class="bjls bgbg">
                        <img src="../assets/img/mid_i202.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">直播彩票</div>
                    </div>

                    <div class="bjls bgbg mt6">
                        <img src="../assets/img/mid_i204.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">微投龙虎</div>
                    </div>
                </div>

                <div class="baijiale1">
                    <div class="bjls bgbg">
                        <img src="../assets/img/mid_i203.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">微投龙虎</div>
                    </div>

                    <div class="bjls bgbg mt6">
                        <img src="../assets/img/mid_i205.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">微投龙虎</div>
                    </div>
                </div>
            </div>

            <!--3-->
            <div class="baijia">
                <div class="baijiale1 bgbg firstone">
                    <img src="../assets/img/mid_i301.png" alt="" width="70px"  style="margin-top: 20px;">
                    <p>微投百家</p>
                    <!--<span class="hot">HOT</span>-->
                </div>

                <div class="baijiale1">
                    <div class="bjls bgbg">
                        <img src="../assets/img/mid_i302.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">微投龙虎</div>
                    </div>

                    <div class="bjls bgbg mt6">
                        <img src="../assets/img/mid_i306.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">微投龙虎</div>
                    </div>
                </div>

                <div class="baijiale1">
                    <div class="bjls bgbg">
                        <img src="../assets/img/mid_i306.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">微投龙虎</div>
                    </div>

                    <div class="bjls bgbg mt6">
                        <img src="../assets/img/mid_i105.png" alt="" style="width: 35px;margin-left: 10px;">
                        <div style="margin-left: 5px;">微投龙虎</div>
                    </div>
                </div>
            </div>




        </div>



    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {}
        },
        methods:
        {
            turnTo(url)
            {
                this.$router.push(url);
                return null;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mt6
    {
        margin-top: 6px;
    }
    .bjls
    {
        height: 60px;
        display: flex;
        align-items:center;
    }
    .firstone
    {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .bgbg
    {
        background: rgba(255,255,255,0.1);
    }
    .hot
    {
        position: absolute;
        left: 0;
        top: 10px;
        width: 40px;
        font-size: 12px;
        line-height: 18px;
        height: 18px;
        background: red;
        color: #fff;

    }
    .lotteies
    {
        background: #31302E;
        padding-bottom: 30px;
    }
    .baijia
    {
        display: flex;
        padding: 2px 3vw;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-box-flex:1;
        -moz-box-flex: 1;
        box-flex:1;
        height: 130px;
        align-items: center;

    }
    .baijiale1
    {
        height: 100%;
        flex: 1;

        box-sizing: border-box;
        margin: 0 3px;
        position: relative;
    }
    .home-links
    {
        display: flex;
        width: 100%;
        height:28px;

    }
    .online-girl
    {
        box-sizing: border-box;
        -webkit-border-radius: 15px;
        -moz-border-radius: 15px;
        border-radius: 15px;
        color: #000;
        width: 85%;
        display: block;
        font-size: 15px;
        background-image:linear-gradient(0deg, #e4b340 0%, #a78638 15%, #d7ad4c 40%, #e8c77a 80%, #ffe5a7 100%);
    }
    .home-links>a
    {
        flex: 1;
        height: 100%;
        line-height:28px;
        font-size: 16px;
    }
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
    .mint-header
    {
        height: 60px;
    }
    #lty-list
    {
        width: 100%;
        overflow:hidden;
    }
    .lty
    {
        width: 33.33333333%;
        box-sizing: border-box;
        height: 100px;
        float: left;
    }
    .notice
    {
        background:#000;position:relative;
        padding-bottom: 8px;
    }
    .notice-txt
    {
        color: #fce30d;
        width: 95vw;
        margin-left: 5vw;
    }
    .letter-icon
    {
        position: absolute;
        left: 1vw;
        top: 0;
    }
    .fa-envelope
    {
        color: #fce30d;font-size: 18px;
    }
</style>
