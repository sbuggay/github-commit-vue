const app = new Vue({
    el: "#vue",
    data: {
        commits: [],
        refresh: 60000 // refresh time in ms
    },
    created() {
        this.fetchCommits();
        setTimeout(() => this.fetchCommits, this.refresh);
    },
    methods: {
        async fetchCommits() {
            console.log("refresh");
            const response = await fetch("/api");
            this.commits = await response.json();
        }
    }
});