const app = new Vue({
    el: "#vue",
    data: {
        commits: [],
        refresh: 60 * 1000 // refresh time in ms (1 minute)
    },
    created() {
        this.fetchCommits();
        const interval = setInterval(() => this.fetchCommits(), this.refresh);
    },
    methods: {
        async fetchCommits() {
            const response = await fetch("/api");
            this.commits = await response.json();
        }
    }
});