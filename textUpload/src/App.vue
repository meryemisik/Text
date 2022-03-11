<template>
  <div id="app">
    <div>
      <input
        class="form-control form-control-lg"
        ref="txt"
        type="file"
        @change="readFile()  "
      />
    </div>
    <div class="form-floating">
      <textarea
        v-model="content"
        class="form-control"
        placeholder=" "
        id="floatingTextarea2"
        style="height: 100px"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      content: "",
      file: null,
    };
  },
  methods: {
   getMimeType(file) {
    return new Promise(function (resolve, reject) {
      var mimeType = '';
      var fr = new FileReader();
      fr.onprogress = function(e) {
        var header = '';
        if (e.loaded > 4) {
          var arr = (new Uint8Array(e.target.result)).subarray(0, 4);
          for (var i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
          }         
          // switch (header) {
          //   case '89504e47':
          //     mimeType = 'image/png';
          //     break;
          //   case "ffd8ffe0":
          //   case "ffd8ffe1":
          //   case "ffd8ffe2":
          //     mimeType = 'image/jpeg';
          //     break;
          //   case "44656e65":
          //     mimeType = 'text/txt';
          //     break;
          //   case '3026b275':
          //     mimeType = 'video/x-ms-wmv';
          //     break;
          //   case '25504446':
          //     mimeType = 'application/pdf';
          //     break;
          //   case '0001c':
          //   case '00018':
          //     mimeType = 'video/mp4';
          //     break;
          //   case '1a45dfa3':
          //     mimeType = 'video/webm';
          //     break;
          //   case '4f676753':
          //     mimeType = 'video/ogg';
          //     break;
          //   case '464c561':
          //     mimeType = 'video/x-flv';
          //     break;
          //   case '38425053':
          //     mimeType = 'psd';
          //     break;
          //   case '504b34':
          //     mimeType = 'office document (doc, pptx, xlsx)';
          //     break;
          //   case '49443b4e':
          //     mimeType = 'text/csv';
          //     break;
          //   default:
          //     mimeType = '';
          // }
          resolve({'file': file, 'header': header, 'type': mimeType});
        }
      }
      fr.readAsArrayBuffer(file);
    });
  },
    readFile() {
      this.file = this.$refs.txt.files[0];
      alert(this.file.type)
      this.getMimeType(this.file).then(data =>{
        console.log(data);
        alert(data.type)
        if(data.type.indexOf("text/")>=0)
        {

            const reader = new FileReader();
            reader.onload = (res) => {
              this.content = res.target.result;
            };
            reader.onerror = (err) => console.log(err);
            reader.readAsText(this.file);
        }
        else{
          this.$refs.txt.value = null;
          this.content = "";
          alert("This type does not supported");
        }
      })
    },
  },
};
</script>
<style>
#app {
  width: 70%;
  margin: auto;
  margin-top: 4rem;
}
textarea {
  margin-top: 2rem;
}
</style>

