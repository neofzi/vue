<template>
    <main-master-page>
        <div class="favorite">
            <div class="favorite__container">
                <h2 v-if="getFavorites.length === 0" class="message">{{ message }}</h2>
                <div v-else class="favorite__box">
                    <div v-for="item in getFavorites" :key="item.id" v-intersection data-watcher class="favorite__card">
                        <div class="favorite__wrapper-img">
                            <div class="favorite__image-ibg"><img :src="item.img" alt="Favorite product" /></div>
                        </div>
                        <div class="favorite__content">
                            <h4 class="favorite__title">{{ item.title }}</h4>
                            <div class="favorite__prices">
                                <div class="favorite__price">{{ item.price }}$</div>
                                <div class="favorite__old-price">{{ item.oldPrice }}$</div>
                            </div>
                            <div class="favorite__buttons">
                                <button type="button" class="favorite__btn" @click="removeFromFavorites(item.id)">
                                    <font-awesome-icon
                                        :icon="['fas', 'trash']"
                                        style="color: #fefefe"
                                        class="favorite__icon"
                                    />
                                </button>
                                <button type="button" class="favorite__btn" @click="addToBasket(item)">
                                    <font-awesome-icon
                                        :icon="['fas', 'plus']"
                                        style="color: #fefefe"
                                        class="favorite__icon"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterPages/MainMasterPage'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'FavoriteView',
    components: {
        MainMasterPage,
    },
    data() {
        return {
            message: 'No favorites added yet',
        }
    },
    computed: {
        ...mapGetters('favorite', ['getFavorites', 'getMessage']),
    },
    methods: {
        ...mapActions('favorite', ['removeFromFavorites']),
        ...mapActions('shoppingBasket', ['addToBasket']),
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/helpers';
.message {
    font-weight: 700;
    text-align: center;
    @include adaptiveValue('font-size', 38, 22);
}
.favorite {
    @include adaptiveValue('padding-top', 50, 25);
    @include adaptiveValue('padding-bottom', 50, 25);
    // .favorite__box
    &__box {
        //   display: flex;
        //   justify-content: center;
        //   flex-wrap: wrap;
        display: grid;
        @include adaptiveValue('gap', 20, 10);
        @media (min-width: $tablet) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: $tablet) and (min-width: em(675)) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: em(675)) {
            grid-template-columns: repeat(1, 1fr);
        }
    }
    // .favorite__card
    &__card {
        //   flex: 1 1 30%;
        //   min-width: toRem(300);
        //   max-width: toRem(395);
        background-color: #fefefe;
        border-radius: toRem(20);
        padding: toRem(20);
        display: flex;
        align-items: start;
        gap: toRem(10);
        box-shadow: 0 toRem(4) toRem(10) rgba(0, 0, 0, 0.5);
    }
    // .favorite__image-ibg
    &__image-ibg {
        padding-bottom: 66.27%;
        border-radius: toRem(10);
        overflow: hidden;
    }
    &__wrapper-img {
        flex: 1 1 60%;
    }
    &__prices {
        flex-grow: 1;
        display: flex;
        gap: toRem(5);
    }
    &__price {
        font-size: toRem(18);
        font-weight: 600;
    }
    &__old-price {
        font-size: toRem(16);
        text-decoration: line-through;
    }
    &__content {
        flex: 1 1 50%;
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: toRem(10);
    }
    // .favorite__title
    &__title {
        font-weight: 700;
        @include adaptiveValue('font-size', 22, 18);
    }
    //  &__text {
    //      flex-grow: 1;
    //      font-size: toRem(16);
    //        display: -webkit-box;
    //        -webkit-box-orient: vertical;
    //        -webkit-line-clamp: 3; //кол-во рядков
    //        overflow: hidden;
    //        text-overflow: ellipsis;
    //  }
    &__buttons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: toRem(10);
    }
    &__btn {
        padding: toRem(7);
        background-color: #094546;
        border-radius: toRem(5);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
        @media (any-hover: hover) {
            &:hover {
                background-color: #036f71;
            }
        }
    }
    &__icon {
        height: toRem(16);
        width: toRem(16);
    }
}
</style>
