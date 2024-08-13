<template>
    <div class="page-not-found">
        <div class="page-not-found__container">
            <h2 class="page-not-found__title">Error 404</h2>
            <p class="page-not-found__text">Sorry, the page you are looking for cannot be found.</p>
            <router-link :to="{ name: 'home' }" class="page-not-found__btn">Return to Home</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageNotFound',
}
</script>

<style lang="scss" scoped>
@import '@/assets/helpers';
.page-not-found {
    text-align: center;
    @include adaptiveValue('padding-top', 50, 25);
    @include adaptiveValue('padding-bottom', 50, 25);
    // .page-not-found__title
    &__title {
        font-weight: 700;
        margin-bottom: toRem(5);
        @include adaptiveValue('font-size', 38, 22);
    }
    // .page-not-found__text
    &__text {
        @include adaptiveValue('margin-bottom', 50, 25);
    }
    // .page-not-found__btn
    &__btn {
        display: inline-block;
        padding: toRem(10) toRem(20);
        background-color: #084349;
        border-radius: toRem(5);
        color: #fefefe;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.3s;
        @media (any-hover: hover) {
            &:hover {
                background-color: #036f71;
            }
        }
    }
}
</style>
