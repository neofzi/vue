<template>
    <main-master-page>
        <div v-intersection data-watcher class="home">
            <div class="home__container">
                <swiper
                    :modules="modules"
                    :slides-per-view="1"
                    :space-between="50"
                    :autoplay="{ delay: 5000 }"
                    :pagination="{ clickable: true, dynamicBullets: true }"
                >
                    <swiper-slide>Main block 1</swiper-slide>
                    <swiper-slide>Main block 2</swiper-slide>
                    <swiper-slide>Main block 3</swiper-slide>
                    <swiper-slide>Main block 4</swiper-slide>
                    <swiper-slide>Main block 5</swiper-slide>
                </swiper>
            </div>
        </div>
        <menu-list />
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterPages/MainMasterPage'
import MenuList from '@/components/MenuList'
// import Swiper core and required modules
import { Autoplay, Pagination } from 'swiper/modules'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
export default {
    name: 'HomeView',
    components: { MainMasterPage, MenuList, Swiper, SwiperSlide },
    setup() {
        //   const onSwiper = (swiper) => {
        //       console.log(swiper)
        //   }
        //   const onSlideChange = () => {
        //       console.log('slide change')
        //   }
        // @swiper="onSwiper"
        // @slide-change="onSlideChange"
        return {
            // onSwiper,
            // onSlideChange,
            modules: [Autoplay, Pagination],
        }
    },
}
</script>
<style lang="scss" scoped>
@import '@/assets/helpers';
.swiper-slide {
    color: #fefefe;
    display: flex;
    font-weight: 700;
    align-items: center;
    justify-content: center;
    border-radius: toRem(20);
    background-color: #084349;
    @include adaptiveValue('font-size', 52, 28);
    @include adaptiveValue('min-height', 400, 300);
}
.home {
    opacity: 0;
    transform: translateY(toRem(20));
    @include adaptiveValue('padding-top', 50, 25);
    @include adaptiveValue('padding-bottom', 50, 25);
    :deep(.swiper-pagination-bullet-active) {
        background-color: #fefefe;
    }
}
</style>
