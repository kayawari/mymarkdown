<template>
  <div class='editor'>
    <h1>Editor Page</h1>
    <span>{{ user.displayName }}</span>
    <div>
      <button @click='logout'>ログアウト</button>
    </div>
    <div class="memoListWrapper">
      <div class="memoList" v-for="(memo, index) in memos" @click="selectMemo(index)" :data-selected="index == selectedIndex">
        <p class="memoTitle">{{ displayTitle(memo.markdown) }}</p>
      </div>
      <button class="addMemoBtn" @click="addMemo">add Memo</button>
      <button class="deleteMemoBtn" v-if="memos.length > 1" @click="deleteMemo">delete memo</button>
      <button class="saveMemosBtn" @click="saveMemos">save memo</button>
    </div>
    <div class='editorWrapper'>
      <textarea class='markdown' v-model='memos[selectedIndex].markdown'></textarea>
      <div class='preview' v-html='preview()'></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  name: 'editor',
  props: ['user'],
  data () {
    return {
      memos:[{
        markdown: ''
      }],
      selectedIndex: 0,
    }
  },
  methods: {
    logout: function() {
      firebase.auth().signOut();
    },
    preview: function() {
      return marked(this.memos[this.selectedIndex].markdown);
    },
    addMemo:function(){
      this.memos.push({
        markdown: '無題のメモ',
      })
    },
    selectMemo: function(index) {
      this.selectedIndex = index;
    },
    displayTitle: function(text) {
      return text.split(/\n/)[0];
    },
    deleteMemo: function(){
      this.memos.splice(this.selectedIndex, 1);
      if(this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    },
    saveMemos: function() {
      firebase
        .database()
        .ref('memos/' + this.user.uid)
        .set(this.memos);
    },
  },
  created: function() {
    firebase
      .database()
      .ref('memos/' + this.user.uid)
      .once('value')
      .then(result => {
        if(result.val()) {
          this.memos = result.val();
        }
      })
  }
}
</script>

