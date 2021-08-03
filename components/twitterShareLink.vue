<template>
    <a class="level-item" aria-label="like" :href="twitterShareUrl" target="_blank">
        <span class="icon is-small">
            <fa :icon="faTwitter" />
        </span>
        &nbsp;
        <span v-if="showLabel">
            {{ shareLabel }}
        </span>
    </a>
</template>

<script>
    import { faTwitter } from '@fortawesome/free-brands-svg-icons'

    export default {
        props: {
            article: { type: Object}, 
            showLabel: { type: Boolean, default: true }
        },
        data () {
            return {
                shareLabel: 'Partager'
            }
        },
        computed: {
            articleUrl: function () {
                if (process.browser)
                    return `${ window.location.origin }${ this.article.route }`;

                return this.article.route;
            },
            twitterShareUrl: function () {
                return 'https://twitter.com/intent/tweet' +
                        `?text=${ encodeURIComponent(this.article.title) }` +
                        `&url=${ encodeURIComponent(this.articleUrl) }` +
                        `&hashtags=${ encodeURIComponent(this.article.tags) }` +
                        `&via=${ encodeURIComponent(process.env.twitterUsername) }`;
            },
            faTwitter: function() {
                return faTwitter
            }
        }
    }
</script>