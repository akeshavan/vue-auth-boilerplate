<template name="upload">
  <div class="upload container">
    <h1>File Upload</h1>
    <div class="upload">
      <ul>
        <li v-for="(file, index) in files" :key="file.id">
          <span>{{file.name}}</span> -
          <span>{{file.size | formatSize}}</span> -
          <span v-if="file.error">{{file.error}}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else></span>
        </li>
      </ul>
      <div class="example-btn">
        <file-upload
          class="btn btn-primary mb-0"
          :post-action="null"
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png,image/gif,image/jpeg,image/webp"
          :multiple="true"
          :size="1024 * 1024 * 10"
          v-model="files"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload">
          <i class="fa fa-plus"></i>
          Select files
        </file-upload>
        <button type="button" class="btn btn-success" @click="doUpload">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          Start Upload
        </button>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import Vue from 'vue';
import FileUpload from 'vue-upload-component';
import { db } from '../firebaseConfig';


Vue.filter('formatSize', (size) => {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  }
  return size.toString() + ' B'
});

export default {
  name: 'upload',
  components: {
    FileUpload,
  },
  data() {
    return {
      files: [],
      images: [],
    };
  },
  firebase: {
    images: db.ref('images'),
  },
  methods: {
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file

        // Filter system files or hide files
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent();
        }

        // Filter php html js file
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent();
        }
      }
    },

    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        console.log('add', newFile)
      }
      if (newFile && oldFile) {
        // update
        console.log('update', newFile)
      }

      if (!newFile && oldFile) {
        // remove
        console.log('remove', oldFile)
      }
    },

    doUpload(e) {
      e.preventDefault();
      var self = this;
      this.files.forEach((val) => {
        console.log('va;', val.file)
        self.getBase64(val);
      })
    },

    getBase64(img) {
      const reader = new FileReader();
      const self = this;
      reader.readAsDataURL(img.file);
      reader.onload = function () {
        const b64 = reader.result;
        self.$firebaseRefs.images.push({
          filename: img.name,
          pic: b64,
          num_votes: 0,
          votes: [],
        });
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    },

  },


};
</script>
