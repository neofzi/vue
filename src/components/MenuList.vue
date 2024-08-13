<template>
    <div class="menu">
        <div class="menu__container">
            <filter-menu :categories="categories" @chose-item="choseItem" />
            <div v-if="filteredList.length === 0" class="menu__message">
                There are no items in this category at the moment.
            </div>
            <div v-if="isLoading" class="menu__load"><v-progress-circular indeterminate></v-progress-circular></div>
            <div v-else-if="hasError">Error</div>
            <div v-else class="menu__box">
                <div v-for="product in filteredList" :key="product.id" v-intersection data-watcher class="menu__card">
                    <div class="menu__image-ibg"><img :src="product.img" alt="Product" /></div>
                    <h4 class="menu__title">{{ product.title }}</h4>
                    <p class="menu__text">{{ product.text }}</p>
                    <div class="menu__button-box">
                        <div class="menu__wrapper">
                            <div class="menu__prices-block">
                                <div class="menu__price">{{ product.price }}$</div>
                                <div class="menu__old-price">{{ product.oldPrice }}$</div>
                            </div>
                            <div class="menu__buttons">
                                <button type="button" class="menu__btn" @click="toggleFavorite(product)">
                                    <font-awesome-icon
                                        :icon="[isFavorite(product) ? 'fas' : 'far', 'heart']"
                                        style="color: #fefefe"
                                        class="menu__icon"
                                    />
                                </button>
                                <button type="button" class="menu__btn" @click="addToBasket(product)">
                                    <font-awesome-icon
                                        :icon="['fas', 'plus']"
                                        style="color: #fefefe"
                                        class="menu__icon"
                                    />
                                </button>
                                <button
                                    v-if="userPermissions.delete"
                                    type="button"
                                    class="menu__btn"
                                    @click="deleteItem(product.id)"
                                >
                                    <font-awesome-icon
                                        :icon="['fas', 'trash']"
                                        style="color: #fefefe"
                                        class="menu__icon"
                                    />
                                </button>
                                <button
                                    v-if="userPermissions.update"
                                    type="button"
                                    class="menu__btn"
                                    @click="onEdin(product.id)"
                                >
                                    <font-awesome-icon
                                        :icon="['fas', 'pencil']"
                                        style="color: #fefefe"
                                        class="menu__icon"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <router-link v-if="userPermissions.write" :to="{ name: 'admin_add' }" class="menu__btn menu__btn--center"
                >Add product</router-link
            >
        </div>
    </div>
</template>

<script>
import FilterMenu from '@/components/FilterMenu'
import categories from '@/components/Data/categoriesData'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'MenuList',
    components: {
        FilterMenu,
    },
    data() {
        return {
            categories,
            choseCategory: null,
        }
    },
    computed: {
        ...mapGetters('menu', ['hasError', 'isLoading', 'getProductsByCategory']),
        ...mapGetters('favorite', ['getFavorites']),
        ...mapGetters('users', ['userPermissions']),
        filteredList() {
            return this.getProductsByCategory(this.choseCategory)
        },
    },
    created() {
        this.loadList()
    },
    methods: {
        ...mapActions('menu', ['loadList', 'deleteItem']),
        ...mapActions('favorite', ['addToFavorites', 'removeFromFavorites']),
        ...mapActions('shoppingBasket', ['addToBasket']),
        toggleFavorite(product) {
            if (this.isFavorite(product)) this.removeFromFavorites(product.id)
            else this.addToFavorites(product)
        },
        isFavorite(product) {
            return this.getFavorites.some((favorite) => favorite.id === product.id)
        },
        choseItem(val) {
            console.log(val)
            this.choseCategory = val == 'All' ? null : val
        },
        onEdin(prodId) {
            this.$router.push({
                name: 'admin_add',
                params: {
                    id: prodId,
                },
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/helpers';
.menu {
    @include adaptiveValue('padding-top', 50, 25);
    @include adaptiveValue('padding-bottom', 50, 25);
    &__message {
        text-align: center;
        font-weight: 700;
        @include adaptiveValue('font-size', 28, 18);
    }
    &__load {
        text-align: center;
        padding: toRem(50) toRem(10);
    }
    // .menu__box
    &__box {
        display: grid;
        @include adaptiveValue('gap', 20, 10);
        &:not(:last-child) {
            @include adaptiveValue('margin-bottom', 50, 25);
        }
        @media (min-width: $pc) {
            grid-template-columns: repeat(4, 1fr);
        }
        @media (min-width: $mobile) and (max-width: $pc) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: $mobile) and (min-width: em(500)) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: em(500)) {
            grid-template-columns: repeat(1, 1fr);
        }
    }
    // .menu__card
    &__card {
        background-color: #fefefe;
        padding: toRem(20);
        border-radius: toRem(10);
        display: flex;
        flex-direction: column;
        gap: toRem(10);
        box-shadow: 0 toRem(4) toRem(10) rgba(0, 0, 0, 0.5);
    }
    // .menu__image-ibg
    &__image-ibg {
        padding-bottom: 66.27%;
        border-radius: toRem(10);
        overflow: hidden;
    }
    // .menu__title
    &__title {
        font-weight: 700;
        @include adaptiveValue('font-size', 22, 18);
    }
    // .menu__text
    &__text {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; //кол-во рядков
        overflow: hidden;
        text-overflow: ellipsis;
    }
    // .menu__button-box
    &__button-box {
        &::before {
            content: '';
            display: block;
            width: 100%;
            height: toRem(1);
            background-color: #1d0e0b;
            border-radius: toRem(10);
            margin-bottom: toRem(10);
        }
    }
    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: toRem(10);
    }
    // .menu__prices-block
    &__prices-block {
        display: flex;
        align-items: flex-end;
        gap: toRem(5);
    }
    // .menu__price
    &__price {
        font-size: toRem(18);
        font-weight: 600;
    }
    // .menu__old-price
    &__old-price {
        font-size: toRem(16);
        text-decoration: line-through;
    }
    &__buttons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: toRem(5);
    }
    &__btn {
        padding: toRem(7);
        background-color: #094546;
        border-radius: toRem(5);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
        &--center {
            padding: toRem(10) toRem(20);
            margin: 0 auto;
            color: #fefefe;
            max-width: toRem(250);
        }
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
