<!--
  * inline event listener
-->

<template>
  <div>
    <text class="title">Hello {{name}}</text>
    <text class="btn" @click="update">Update 1</text>
    <text class="btn" @click="update($event)">Update 1</text>
    <text class="btn" @click="setName(temp, $event)">Update 2</text>
    <text class="btn" @click="setName('John')">Update 3</text>
  </div>
</template>

<style>
  .title {font-size: 48px;}
  .subtitle {font-size: 36px;}
  .btn {font-size: 36px; text-align: center; color: white; background-color: gray; padding: 20px; border-radius: 5px;}
</style>

<script>
  module.exports = {
    data: function () {
      return {
        name: 'Steve',
        temp: 'Mike'
      }
    },
    methods: {
      update: function (e) {
        this.setName('David')
        console.log('setName', this.name)
      },
      setName: function (value) {
        this.name = value
        console.log('name', this.name)
      }
    }
  }
</script>
