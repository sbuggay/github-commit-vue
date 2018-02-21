const app = new Vue({
    el: "#vue",
    data: {
        commits: [],
        refresh: 10000 // refresh time in ms
    },
    created() {
        this.fetchCommits();
        setTimeout(this.fetchCommits, this.refresh);
    },
    methods: {
        async fetchCommits() {
            const response = await fetch("/api");
            this.commits = await response.json();
        }
    }
});