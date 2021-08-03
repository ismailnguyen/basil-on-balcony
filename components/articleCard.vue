<template>
    <client-only>
        <a v-if="article" class="box">
            <article class="media">
                <div class="media-content has-text-dark">
                    <div class="content">
                        <p class="title is-4">{{ article.amount }}</p>

                        <p class="subtitle is-6">
                            <small>
                                <time :datetime="article.date">{{ publishedDate }}</time>
                            </small>
                        </p>

                        <p>
                            {{ article.label }}
                        </p>
                    </div>

                    <nav class="level is-mobile">
                        <div class="level-left">
                            <span class="tag is-rounded">{{ article.category }}</span>
                        </div>
                    </nav>
                </div>
            </article>
        </a>
    </client-only>
</template>

<script>
    export default {
        props: ['article'],
        components: {
        },
        data () {
            return {
            }
        },
        mounted: function () {
        },
        computed: {
            publishedDate: function () {
                return new Date(this.article.date).toDateString();
            }
        }
    }
</script>

<style scoped>
    .media-right {
        display: flex;
    }

    .media-right > * {
        padding-left: 10px;
    }

    .level-item {
        align-items: flex-start;
    }

    .level-left {
        display: contents !important;
    }
</style>