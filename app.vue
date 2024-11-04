<template>
    <NuxtLoadingIndicator/>
    <UContainer>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UContainer>
    <UNotifications />
</template>

<style>
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