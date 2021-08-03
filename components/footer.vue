
<template>
    <footer class="footer">
        <div class="content has-text-centered">
            &copy; {{ currentYear }}
            <br>
            <small>{{ siteName }}</small>
        </div>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                siteName: process.env.siteName
            }
        },
        computed: {
            currentYear: function () {
                return new Date().getFullYear();
            }
        }        
    }
</script>