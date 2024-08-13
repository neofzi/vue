<template>
    <div class="container">
        <div class="main-header">
            <router-link :to="{ name: 'home' }" class="main-header__logo">Logo</router-link>
            <div class="main-header__rigth-block">
                <nav class="main-header__navigation">
                    <router-link :to="{ name: 'favorite' }" class="main-header__item">
                        <font-awesome-icon :icon="['far', 'heart']" class="main-header__icon" />
                        <span class="main-header__item-text">favorite</span>
                    </router-link>
                    <router-link :to="{ name: 'shopping-basket' }" class="main-header__item">
                        <font-awesome-icon :icon="['fas', 'basket-shopping']" class="main-header__icon" />
                        <span>{{ getTotalPrice.toFixed(2) }}$</span>
                    </router-link>
                </nav>
                <div class="main-header__buttons">
                    <div v-if="getUser" class="main-header__login-data">
                        <img v-if="getUser.photoURL" :src="getUser.photoURL" />
                        <div v-else class="main-header__name">{{ firstLetter }}</div>
                        <!-- <span>{{ getUser.displayName }}</span> -->
                        <button type="button" class="main-header__btn" @click="onLogout">Log out</button>
                    </div>
                    <router-link v-else :to="{ name: 'register' }" class="main-header__btn">Login</router-link>
                </div>
            </div>
        </div>
        <div class="main"><slot></slot></div>
        <div class="footer">
            <div class="footer__box">
                <router-link :to="{ name: 'home' }" class="footer__logo">Logo</router-link>
                <div class="footer__social-network">
                    <div v-for="(social, index) in socialNetwork" :key="index" class="footer__item">
                        <a :href="social.url" target="_blank">
                            <font-awesome-icon :icon="['fab', social.icon]" class="footer__icon" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="footer__privacy-policy">© Coffee cafe. Privacy Policy and Terms of Service.</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import dataSocialNetwork from '@/masterPages/dataSocialNetwork'

export default {
    name: 'MainMasterPage',
    data() {
        return {
            socialNetwork: dataSocialNetwork,
        }
    },
    computed: {
        ...mapGetters('auth', ['getUser']),
        ...mapGetters('shoppingBasket', ['getTotalPrice']),
        firstLetter() {
            return this.getUser.displayName ? this.getUser.displayName.charAt(0).toUpperCase() : ''
        },
    },
    methods: {
        ...mapActions('auth', ['logout']),
        onLogout() {
            this.logout()
            this.$router.push({
                name: 'register',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/helpers';

.container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.main {
    flex-grow: 1;
}
.main-header {
    padding: toRem(15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: toRem(15);
    font-weight: 600;
    &__logo {
        @include adaptiveValue('font-size', 22, 18);
    }
    &__rigth-block {
        display: flex;
        align-items: center;
        @include adaptiveValue('column-gap', 35, 10);
        @include adaptiveValue('font-size', 18, 16);
    }
    &__btn {
        color: #fefefe;
        border-radius: toRem(5);
        background-color: #0a4647;
        font-weight: 600;
        display: block;
        transition: background-color 0.3s;
        @include adaptiveValue('padding-bottom', 8, 5);
        @include adaptiveValue('padding-top', 8, 5);
        @include adaptiveValue('padding-right', 20, 10);
        @include adaptiveValue('padding-left', 20, 10);
        @media (any-hover: hover) {
            &:hover {
                background-color: #036f71;
            }
        }
    }
    &__item {
        display: flex;
        align-items: center;
        gap: toRem(5);
        transition: color 0.3s;
        @media (any-hover: hover) {
            &:hover {
                color: #036f71;
                .main-header__icon {
                    color: #036f71;
                    transition: color 0.3s;
                }
            }
        }
    }
    &__name {
        background-color: #0a4647;
        border-radius: 50%;
        color: #fefefe;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: toRem(16);
        padding: toRem(5);
        min-height: toRem(25);
        min-width: toRem(25);
        max-height: toRem(25);
        max-width: toRem(25);
    }
    &__login-data {
        display: flex;
        align-items: center;
        gap: toRem(10);
        img {
            height: toRem(25);
            width: toRem(25);
            border-radius: 50%;
        }
    }
    &__item-text {
        @media (max-width: em(425)) {
            display: none;
        }
    }
}
.footer {
    padding: toRem(20) toRem(15);
    border-top: 1px solid #1d0e0b;
    // .footer__box
    &__box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: toRem(25);
    }
    // .footer__logo
    &__logo {
        font-weight: 600;
        @include adaptiveValue('font-size', 22, 18);
    }
    // .footer__social-network
    &__social-network {
        display: flex;
        align-items: center;
        gap: toRem(15);
    }
    // .footer__item
    &__item {
        max-width: toRem(20);
        max-height: toRem(20);
    }
    &__icon {
        min-height: toRem(20);
        min-width: toRem(20);
    }
    &__privacy-policy {
        text-align: center;
        @include adaptiveValue('font-size', 20, 16);
    }
}
</style>
