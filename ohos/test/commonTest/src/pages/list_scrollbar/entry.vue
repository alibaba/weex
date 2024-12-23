<template>
  <div>
    <div class="marg"></div>
    <div class="tilte">:show-scrollbar="false" </div>
    <list
    class="list"
      offset-accuracy="10"
      @scroll="onscroll"
      :show-scrollbar="false"
      @loadmore="onloadmore"
      :loadmoreoffset="900"
      :scrollable="true"
    >
      <header>
        <text test-id="status1" ref="status1" style="font-size: 40px">{{
          status
        }}</text>
      </header>
      <cell v-for="row in rows" :key="row.index" style="padding: 10px">
        <text style="width: 750px; height: 150px; background-color: aqua">
          {{ row.id }}
        </text>
      </cell>
    </list>
    <div class="marg"></div>
    <div class="tilte">:show-scrollbar="true"</div>
    <list
      style="background-color: beige; width: 750px; height: 900px"
      offset-accuracy="10"
      @scroll="onscroll"
      :show-scrollbar="true"
      @loadmore="onloadmore"
      :loadmoreoffset="10"
      :scrollable="true"
    >
      <header>
        <text test-id="status2" ref="status2" style="font-size: 40px">{{
          status
        }}</text>
      </header>
      <cell v-for="row in rows" :key="row.index" style="padding: 10px">
        <text style="width: 750px; height: 150px; background-color: aqua">
          {{ row.id }}
        </text>
      </cell>
    </list>
    <div class="marg"></div>
    <div class="tilte">show-scrollbar</div>
    <list
      style="background-color: beige; width: 750px; height: 900px"
      offset-accuracy="10"
      @scroll="onscroll"
      show-scrollbar
      @loadmore="onloadmore"
      :loadmoreoffset="10"
      :scrollable="true"
    >
      <header>
        <text test-id="status2" ref="status2" style="font-size: 40px">{{
          status
        }}</text>
      </header>
      <cell v-for="row in rows" :key="row.index" style="padding: 10px">
        <text style="width: 750px; height: 150px; background-color: aqua">
          {{ row.id }}
        </text>
      </cell>
    </list>
    <div class="marg"></div>
    <div class="tilte">:show-scrollbar="showScrollbar"</div>
    <list
      style="background-color: beige; width: 750px; height: 900px"
      offset-accuracy="10"
      @scroll="onscroll"
      :show-scrollbar="showScrollbar"
      @loadmore="onloadmore"
      :loadmoreoffset="10"
      :scrollable="true"
    >
      <header>
        <text test-id="status2" ref="status2" style="font-size: 40px">{{
          status
        }}</text>
      </header>
      <cell v-for="row in rows" :key="row.index" style="padding: 10px">
        <text style="width: 750px; height: 150px; background-color: aqua">
          {{ row.id }}
        </text>
      </cell>
    </list>
    <div class="marg"></div>
    <div class="tilte">show-scrollbar=""</div>
    <list
      style="background-color: beige; width: 750px; height: 900px"
      offset-accuracy="10"
      @scroll="onscroll"
      show-scrollbar=""
      @loadmore="onloadmore"
      :loadmoreoffset="10"
      :scrollable="true"
    >
      <header>
        <text test-id="status2" ref="status2" style="font-size: 40px">{{
          status
        }}</text>
      </header>
      <cell v-for="row in rows" :key="row.index" style="padding: 10px">
        <text style="width: 750px; height: 150px; background-color: aqua">
          {{ row.id }}
        </text>
      </cell>
    </list>
    <div class="marg"></div>
    <div class="tilte">show-scrollbar='true'</div>
    <list
      style="background-color: beige; width: 750px; height: 900px"
      offset-accuracy="10"
      @scroll="onscroll"
      show-scrollbar="true"
      @loadmore="onloadmore"
      :loadmoreoffset="10"
      :scrollable="true"
    >
      <header>
        <text test-id="status2" ref="status2" style="font-size: 40px">{{
          status
        }}</text>
      </header>
      <cell v-for="row in rows" :key="row.index" style="padding: 10px">
        <text style="width: 750px; height: 150px; background-color: aqua">
          {{ row.id }}
        </text>
      </cell>
    </list>
    <div class="marg"></div>
    <div class="tilte">show-scrollbar=' '</div>
    <list
      style="background-color: beige; width: 750px; height: 900px"
      offset-accuracy="10"
      @scroll="onscroll"
      show-scrollbar=" "
      @loadmore="onloadmore"
      :loadmoreoffset="10"
      :scrollable="true"
    >
      <header>
        <text test-id="status2" ref="status2" style="font-size: 40px">{{
          status
        }}</text>
      </header>
      <cell v-for="row in rows" :key="row.index" style="padding: 10px">
        <text style="width: 750px; height: 150px; background-color: aqua">
          {{ row.id }}
        </text>
      </cell>
    </list>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      rows: [],
      status: "-",
      showScrollbar: true,
    };
  },
  created: function () {
    for (var i = 0; i < 20; i++) {
      this.rows.push({ id: "Cell " + i });
    }
  },
  mounted() {

  },
  computed: {},
  methods: {
    onscroll: function (e) {
      this.status = e.contentOffset.y;
    },
    onloadmore: function (e) {
        let el = document.getElementsByClassName('list')[0].children[0]
        let result = el.clientHeight + this.status
        console.log("列表在" + result + "触底了。。。");
    },
  },
};
</script>

<style>
.top {
    height: 60px;
    overflow-x: scroll;
    display: flex;
}
.tilte {
    font-weight: 700;
}
.list {
  background-color: beige;
  width: 750px;
  height: 900px;
}
.marg {
  margin-top: 40px;
  margin-bottom: 10px;
}
</style>