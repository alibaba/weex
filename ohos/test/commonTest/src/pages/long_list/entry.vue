<template>
<div>
    <list class="list-wrap" v-grouping-child-elements="5">
        <cell class="list-cell" v-for="(item, smart_index) in lists" :key="item">
            <text class="item" @click='onstart(item, smart_index)'>{{ `${item}--${smart_index}` }}</text>
        </cell>
    </list>
    <button class="btn" @click="addInfo">添加数据</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            lists: [
                "pretty",
                "large",
                "big",
                "small",
                "tall",
                "short",
                "long",
                "handsome",
                "plain",
                "quaint",
                "clean",
                "elegant",
                "easy",
                "angry",
                "crazy",
                "helpful",
                "mushy",
                "odd",
                "unsightly",
                "adorable",
                "important",
                "inexpensive",
                "cheap",
                "expensive",
                "fancy",
            ],
        };
    },
    methods: {
        onstart(item, index) {
            console.log(`${item}---${index}`)
        },
        addInfo() {
            console.log("button anniu")
            this.lists.push(...[
                "pretty",
                "large",
                "big",
                "small",
                "tall",
                "short",
                "long",
                "handsome",
                "plain",
                "quaint",
                "clean",
                "elegant",
                "easy",
                "angry",
                "crazy",
                "helpful",
                "mushy",
                "odd",
                "unsightly",
                "adorable",
                "important",
                "inexpensive",
                "cheap",
                "expensive",
                "fancy",
            ])
        }
    },
};
</script>

<style>
.btn {
    width: 500px;
    padding: 20px;
    margin: 20px auto 0;
    border-radius: 10px;
    color: #6d7dff;
    text-align: center;
    font-size: 32px;
    border-style: solid;
    border-color: #6d7dff;
    border-width: 1px;
    opacity: 1;
}

.list-wrap {
    width: 750px;
    flex: 1;
    background-color: aliceblue;
}

.list-cell {
    width: 100%;
    margin-bottom: 20px;
}

.item {
    width: 750px;
    height: 50px;
    background-color: red;
}
</style>
