const app = new Vue({
    el: "#vue",
    data: {
        commits: []
    },
    created() {
        this.fetchCommits();
    },
    methods: {
        async fetchCommits() {
            const response = await fetch("/api");
            const json = await response.json();
            this.commits = json;
            console.log(json);
        }
    }
});