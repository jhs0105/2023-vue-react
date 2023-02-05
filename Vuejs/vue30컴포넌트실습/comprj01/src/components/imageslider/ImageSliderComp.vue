<style scoped>
.sliderWrap > img {
  object-fit: cover;
  box-shadow: 0 8px 16px rgb(0 0 0 / 50%);
}

.sliderWrap {
  width: 1000px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
}

.sliderWrap > span {
  display: block;
  position: absolute;
  top: calc(50% - 1.25rem);
  font-size: 2.5rem;
  transition: all 0.5s ease;
}

.sliderWrap span:hover {
  cursor: pointer;
}

.sliderWrap > div {
  display: inline-block;
  width: 100%;
}

p {
  position: absolute;
  bottom: 10px;
  right: 55px;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  padding: 10px;
}

span.left {
  left: 30px;
}

span.right {
  right: 30px;
  rotate: (180);
}

span.right > img {
  transform: rotate(180deg);
  width: 70%;
}

span.left > img {
  width: 70%;
}

.dot {
  position: relative;
}

.dot > span {
  height: 12px;
  width: 12px;
  margin: 0 4px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: all 0.5s ease;
  box-shadow: inset 0 1px 1px 0px rgb(0 0 0 / 60%), 0px 1px 1px 0px white;
}

.dot > span:hover,
.dot > span.active {
  cursor: pointer;
  background-color: #717171;
}
</style>

<template>
  <div class="sliderWrap">
    <span class="left" v-on:click="toLeft">
      <img src="../../../public/assets/arrow.png" alt="" />
    </span>
    <span class="right" v-on:click="toRight">
      <img src="../../../public/assets/arrow.png" alt="" />
    </span>
    <p>{{ activateImg.name }}</p>
    <img
      v-bind:src="activateImg.src"
      v-bind:alt="activateImg.name"
      v-bind:style="{
        width: `${width}px`,
        height: `${height}px`,
      }"
    />
    <div class="dot">
      <span
        v-for="(image, index) in option"
        v-bind:key="image.id"
        v-on:click="setActive(index)"
        v-bind:class="{ active: currIdx === index }"
      >
      </span>
    </div>
  </div>
</template>

<script>
export default {
  /* pdtmc^2w */
  props: ['option'],
  data() {
    /* 컴포넌트 안에서 사용되는 변수 등록. 개별 변수 */
    return {
      //activateImg: {}, <-option 과 currIdx에 종속되는 변수, computed에 넣는다
      width: 800,
      height: 450,
      currIdx: 0,
    };
  },
  //template: ``,
  methods: {
    /* 이벤트 핸들러 등록 + 일반 함수 */
    toLeft(e) {
      console.log(e.target);
      this.$data.currIdx = Math.max(this.$data.currIdx - 1, 0);
      //둘중에 가장 작은 값으로 해라
    },
    toRight(e) {
      console.log(e.target);
      this.$data.currIdx = Math.min(
        this.$data.currIdx + 1,
        this.$props.option.length - 1,
        //둘중에 가장 큰 값으로 해라
      );
    },
    setActive(index) {
      this.$data.currIdx = index;
    },
  },
  components: {
    /* 전역 컴포넌트인 경우는 등록하지 않는다. 전역 컴포넌트는 프로토타입 체인으로 찾을 수 있기 때문에 */
    /* 지역 컴포넌트나 파일 컴포넌트만 등록 한다. 예시) "태그명" : 컴포넌트명 */
  },
  computed: {
    /* 자동처리 + 동기식. 메서드로 작성. return 필수. data 와 공존 불가 */
    activateImg() {
      const curimg = this.$props.option[this.$data.currIdx];
      return curimg;
    },
    /* vuex 를 사용하는 경우
      mapGetters 는 store의 getters 를 가져오는 헬퍼메서드입니다.
      namespaced: true를 설정한 경우 네임스페이스를 사용하기 때문에 store의 모듈 명을 적어주어야 합니다.
      store 모듈에서 getters 를 가져오는 2가지 방식
      1) store.모듈명.getters 이름 바꾸어 사용하기
         ...mapGetters('모듈명', { get게터명1: '게터명1', get게터명2: '게터명2' }),
      2) store.모듈명.getters 이름 그대로 사용하기(추천방식)
         ...mapGetters('모듈명', ['게터명1', '게터명2']),
      */
  },
  watch: {
    /* 자동처리 + 비동기식. data 에 등록된 프로퍼티(변수) 모니터링. 메서드로 작성. 매개변수 필수. 외부 api 호출을 위해서 사용 */
  },
  created() {
    console.log('created');
  },
  mounted() {
    console.log('mounted');
    /* store의 actions 호출 */
    // this.$store.dispatch('액션명', payload);
  },
  updated() {
    console.log('updated');
  },
};
</script>
