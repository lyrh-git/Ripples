{/* <script> */ }
const login_user = null;
// const login_user_img = "/static/images/aiqinggongyu.png";
const login_user_img="";
const login_user_id=null;
const background_img="/static/images_background/2.jpg"

function alert(modal,message) {
      alert("here全局方法")
      modal.show("dialog", {
            title: "提示",
            text: message,
      });
      setTimeout(() => {
            modal.hide("dialog")
      }, 1500);
}

// function hideDialog() {
//       Vue.prototype.$modal.hide("dialog");
// }

export default {
      login_user,
      login_user_img,
      login_user_id,
      background_img,
      alert,
      // hideDialog,
      //   computed: {
      //     login_user: {
      //       get: function() {
      //         return this.user;
      //       },
      //       // setter
      //       set: function(newValue) {
      //         this.user = newValue;
      //       }
      //     }
      //   }
};
// </script>