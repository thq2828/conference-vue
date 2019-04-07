<template>
    <div class="body">
        <logo/>
        <div class="core">
            <navigation2/>
            <router-view/>
        </div>
    </div>
</template>

<script>
    //引入logo区
    export default {
        name: 'home',
        components: {
        }
    }
</script>
