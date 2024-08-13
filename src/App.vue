<template>
    <router-view />
</template>

<style lang="scss">
@import 'assets/helpers';
@import 'assets/resset';

#app {
    height: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
nav {
    display: flex;
    align-items: center;
    @include adaptiveValue('column-gap', 35, 10);
}
// nav {
//     a {
//         font-weight: bold;

//         &.router-link-exact-active {
//             color: #9dc3ae;
//         }
//     }
// }
</style>
