<template>
  <div id="app">
    <div>
      <input
        class="form-control form-control-lg"
        ref="txt"
        type="file"
        @change="readFile()"
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
     <p style="color:red;">Metin içindeki b harfinin sayısı : 
       {{sayac}}
     </p>
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
      sayac : "",
    };
  },
  methods: {
    getMimeType(file) {
      return new Promise(function (resolve, reject) {
        var mimeType = "";
        var fr = new FileReader();
        fr.onprogress = function (e) {
          var header = "";
          if (e.loaded > 4) {
            var arr = new Uint8Array(e.target.result).subarray(0, 4);
            for (var i = 0; i < arr.length; i++) {
              header += arr[i].toString(16);
            }
            switch (header) {
              case "3c21444f":
                mimeType = "text/html";
                break;
              case "42752067":
                mimeType = "text/txt";
                break;
              case "49443b4e":
                mimeType = "text/csv";
                break;
              default:
                mimeType = "";
            }
            resolve({ file: file, header: header, type: mimeType });
          }
        };
        fr.readAsArrayBuffer(file);
      });
    },
    readFile() {
     
      this.file = this.$refs.txt.files[0];
      this.getMimeType(this.file).then((data) => {
        if (data.type.indexOf("text/") >= 0) {
          const reader = new FileReader();
          reader.onload = (res) => {
          this.content = res.target.result;
          var sayac=0;
          var metin = this.content.split("");        
         for(var i = 0; i<metin.length;i++){
           if(metin[i]==="b" || metin[i] === "B"){
             sayac++;
                      
           }
         }
         this.sayac=sayac;
         console.log("metnin içindeki b sayısı : " + sayac);
          };       
          reader.onerror = (err) => console.log(err);
          reader.readAsText(this.file);
        } else {
          this.$refs.txt.value = null;
          this.content = "";
          alert("This type does not supported");
        }
      });
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

