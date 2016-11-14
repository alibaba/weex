<!--
  * in root component `data` is an plain object
  * in sub component `data` is a function which returns an plain object
  * `data` means (internal) data
  * `props` means external data, only used in sub components
  * `props` could be set from parent by an attribute with the same name
  * `props` cound be a string array or an object
  * `props` object may have `type`, `default`
  * `computed` support a single getter or a getter/setter object
-->

<template>
  <div @click="update">
    <text class="title">{{firstName}}</text>
    <text class="title">{{lastName}}</text>
    <text class="title">{{fullName}}</text>
    <text class="title">{{today}}</text>
  </div>
</template>

<style>
  .title {font-size: 48px;}
</style>

<script>
  // // if this is a sub component and the parent component could set `firstName` and `lastName` by:
  // // `<subcomponent first-name="John" last-name="Smith"></subcomponent>`
  // // but the `date` won't be changed from parent component
  // module.exports = {
  //   props: ['firstName', 'lastName'],
  //   data: function () {
  //     return {
  //       date: Date.now()
  //     }
  //   }
  // }

  // // more `props` formats like
  // module.exports = {
  //   props: {
  //     firstName: {
  //       default: 'John'
  //     },
  //     lastName: {
  //       type: String,
  //       default: 'Smith'
  //     }
  //   },
  //   data: function () {
  //     return {
  //       date: Date.now()
  //     }
  //   }
  // }

  module.exports = {
    data: {
      firstName: 'John',
      lastName: 'Smith',
      date: Date.now()
    },
    methods: {
      update: function () {
        this.today = '2016-01-01'
      }
    },
    computed: {
      fullName: function () {
        return this.firstName + ' ' + this.lastName
      },
      today: {
        get: function () {
          return new Date(this.date).toDateString()
        },
        set: function (v) {
          this.date = Date.parse(v)
        }
      }
    }
  }
</script>
