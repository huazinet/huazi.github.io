<template>
    <div class="newyearcard">
        <a href="#" target="_blank" class="a"></a>
        <div class="contain">
            <div class="dengbox" style="pointer-events: none;z-index: 1000;">
                <div :style="{
                    left: 5 + (2 * index) + '%'
                }" class="deng-box" :class="'deng-box' + index" v-for="(item, index) in lanternText" :key="index">
                    <div class="deng" :class="index % 2 === 0 ? 'deng3' : 'deng5'">
                        <div class="xian"></div>
                        <div class="deng-a">
                            <div class="deng-b">
                                <div class="deng-t">{{ item }}</div>
                            </div>
                        </div>
                        <div class="shui shui-a">
                            <div class="shui-c"></div>
                            <div class="shui-b"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="timedown">
                <p class="title">B站截流</p>
                <p class="desc">自动化采集</p>
                <div>
                    <Countdown :until="until" />
                </div>
                <a :href="'https://sharehub.club/posts/2024/04/bilibili_automation.html'" class="tolink">
                    <span class="span">点我或右侧扫码了解</span>
                    <svg class="svf" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                            fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
            <div class="redcover"></div>
        </div>
    </div>
    <swiper :style="{
        '--swiper-navigation-color': '#ffffff',
        '--swiper-pagination-color': 'var(--vp-c-brand)',
        height: theme?.website?.bannerHeight + 'px'
    }" class="mySwiper" :loop="true" :spaceBetween="10" :navigation="true" :modules="modules"
        v-if="theme?.website?.homeBanner && list.length"
        :noSwiping="true">
        <swiper-slide v-for="(item, index) in list" :key="index">
            {{ console.log(item?.link) }}
            <a class="a" :href="item?.link"><img class="image" :src="item?.image" :alt="item?.title" /></a>
        </swiper-slide>
    </swiper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useData } from 'vitepress'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import Countdown from "../../theme/components/Countdown.vue";
import 'swiper/css';
import 'swiper/css/navigation';

const { theme } = useData();
const modules = [Navigation]
const list = ref(theme.value?.banner ? theme.value.banner : [])
const defaultDate = '2024/04/01 00:00'

function getUntilDate() {
    const param = new URL(location.href).searchParams.get('until') || defaultDate
    if (/\d{8}/.test(param))
        return `${param.substring(0, 4)}/${param.substring(4, 6)}/${param.substring(6, 8)}`
    return defaultDate
}

const until = getUntilDate()
</script>

<style scoped>
.mySwiper {
    height: 400px;
    border-radius: 8px;
    margin-bottom: 32px;
    padding: 0;
}

.image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.newyearcard:hover .tolink {
    color: var(--vp-c-brand-1);
}

.newyearcard {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 32px;
    padding: 0;
    position: relative;
}

.a {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 30;
}

.contain {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 20;
}

.dengbox .deng-box {
    position: absolute;
    top: -15px;
    z-index: 10;
    pointer-events: none;
    transform: scale(.5);
    transform-origin: top left;
}

.deng {
    position: relative;
    width: 120px;
    height: 90px;
    margin: 50px;
    background: rgba(216, 0, 15, .8);
    border-radius: 50% 50%;
    transform-origin: 50% -100px;
    box-shadow: -5px 5px 50px 4px #fa6c00;
}

.deng3 {
    animation: swing 3s infinite ease-in-out;
}

.deng5 {
    animation: swing 5s infinite ease-in-out;
}

.deng-a {
    width: 100px;
    height: 90px;
    background: rgba(216, 0, 15, .1);
    margin: 12px 8px 8px 8px;
    border-radius: 50% 50%;
    border: 2px solid #dc8f03;
}

.deng-b {
    width: 45px;
    height: 90px;
    background: rgba(216, 0, 15, .1);
