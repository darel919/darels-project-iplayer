<template>
    <NuxtLoadingIndicator/>
    <NuxtLayout id="mainPage">
        <NuxtPage/>
    </NuxtLayout>
    <UNotifications />
</template>

<style>
#mainPage {
    margin-top:96px;
    padding: 0 2rem 0 2rem;
}
@font-face {
    font-family: 'SegoeUI' !important;
    src: local('Segoe UI'),
         url('https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2') format('woff2'),
         url('https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff') format('woff'),
         url('https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.ttf') format('ttf');
    font-weight: 400;
}
html, body {
    font-family: 'SegoeUI', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
}
</style>