<template>
  <div id="app" @mousedown="onMousedown">
    <div id="box" v-show="isShowBox" :style="`top: ${y}px; left: ${x}px`">
      <input
        type="text"
        ref="inputText"
        v-model="inputText"
        @keydown.enter="addCard"
      />
    </div>

    <div
      class="card"
      v-for="card in cards"
      :key="card.id"
      :style="`top: ${card.y}px; left: ${card.x}px`"
    >
      {{ card.text }}
    </div>
  </div>
</template>

<script>
import { db } from "@/utl/db";

export default {
  name: "App",
  data() {
    return {
      x: 0,
      y: 0,
      inputText: "",
      cards: [],
      isShowBox: false,
    };
  },
  firebase: {
    cards: db.ref("cards"),
  },
  methods: {
    onMousedown(e) {
      if (e.target.id === "app") {
        this.isShowBox = true;
        this.x = e.pageX;
        this.y = e.pageY;
        this.$refs.inputText.focus();
      }
    },
    addCard() {
      console.log("addCard");
      let newCard = {
        id: Date.now() + "-" + Math.random(),
        text: this.inputText,
        x: this.x,
        y: this.y,
      };
      db.ref("cards/")
        .push(newCard)
        .then(() => {
          console.log("user updated!");
        });
      this.inputText = "";
      this.isShowBox = false;
    },
  },
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
#app {
  width: 100vw;
  height: 100vh;
  background: #eef2f7;
}

input {
  width: 290px;
  font-size: 24px;
  border: 1px solid #e1e1e1;
  border-radius: 2px;
}

#box {
  z-index: 1000;
  position: absolute;
  left: 650px;
  top: 320px;
  width: 300px;
  height: 60px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}

.card {
  position: absolute;
  font-size: 24px;
  width: 300px;
  height: 60px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
}
</style>
