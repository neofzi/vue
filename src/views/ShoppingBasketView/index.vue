<template>
    <main-master-page>
        <div class="shopping-basket">
            <div class="shopping-basket__container">
                <h2 v-if="getBasket.length === 0" class="message">{{ message }}</h2>
                <div v-else class="shopping-basket__info">
                    <div class="shopping-basket__box">
                        <div
                            v-for="item in getBasket"
                            :key="item.id"
                            v-intersection
                            data-watcher
                            class="shopping-basket__card"
                        >
                            <div class="shopping-basket__wrapper-img">
                                <div class="shopping-basket__image-ibg">
                                    <img :src="item.img" alt="Shopping basket product" />
                                </div>
                            </div>
                            <div class="shopping-basket__content">
                                <h4 class="shopping-basket__title">{{ item.title }}</h4>
                                <div class="shopping-basket__prices">
                                    <div class="shopping-basket__price">{{ item.price }}$</div>
                                    <div class="shopping-basket__old-price">{{ item.oldPrice }}$</div>
                                </div>
                                <div class="shopping-basket__buttons">
                                    <button
                                        type="button"
                                        class="shopping-basket__btn"
                                        @click="removeFromBasket(item.id)"
                                    >
                                        <font-awesome-icon
                                            :icon="['fas', 'trash']"
                                            style="color: #fefefe"
                                            class="shopping-basket__icon"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="button" class="shopping-basket__buy-btn">Buy</button>
                </div>
            </div>
        </div>
    </main-master-page>
</template>

<script>
import MainMasterPage from '@/masterPages/MainMasterPage'
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'ShoppingBasketView',
    components: {
        MainMasterPage,
    },
    data() {
        return {
            message: 'The basket is currently empty',
        }
    },
    computed: {
        ...mapGetters('shoppingBasket', ['getBasket']),
    },
    methods: {
        ...mapActions('shoppingBasket', ['removeFromBasket']),
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
.shopping-basket {
    @include adaptiveValue('padding-top', 50, 25);
    @include adaptiveValue('padding-bottom', 50, 25);
    &__box {
        display: grid;
        @include adaptiveValue('gap', 20, 10);
        &:not(:last-child) {
            @include adaptiveValue('margin-bottom', 50, 25);
        }
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
    &__card {
        background-color: #fefefe;
        border-radius: toRem(20);
        padding: toRem(20);
        display: flex;
        align-items: start;
        gap: toRem(10);
        box-shadow: 0 toRem(4) toRem(10) rgba(0, 0, 0, 0.5);
    }
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
    &__title {
        font-weight: 700;
        @include adaptiveValue('font-size', 22, 18);
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
    &__buy-btn {
        max-width: toRem(200);
        min-width: toRem(200);
        display: flex;
        justify-content: center;
        margin: 0 auto;
        text-align: center;
        background-color: #094546;
        border-radius: toRem(20);
        color: #fefefe;
        padding: toRem(10) toRem(10);
        font-weight: 700;
        transition: background-color 0.3s;
        @include adaptiveValue('font-size', 18, 16);
        @media (any-hover: hover) {
            &:hover {
                background-color: #036f71;
            }
        }
    }
}
</style>
