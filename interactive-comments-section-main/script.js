const comments_space = document.querySelector('.comments_space')
function fetching() {
  fetch('data.json')
    .then(response => response.json())
    .then(data =>{
        compose(data)
    }).catch(error => console.log('ERROR:',error))
}
fetching()
let data;
function compose(data) {
  const coms = data.comments.map((item) => {
    let replies;
    if(item.replies.length) {
      replies = item.replies.map((it) => {
        return `
        <div class="this_comment reply_c">
           <div class="userInfo_space">

              <div class="profile_image_box">
                 <img src=${it.user.image.png} alt="" class="profile_image">
              </div>
              <h4 class="profile_username">${it.user.username}</h4>
              <h5 class="profile_date">${it.createdAt}</h5>
           </div>

           <div class="comment_text_space">
              <h5 class="comment_text">@${it.replyingTo} ${it.content}</h5>
           </div>

           <div class="comments_actions_space">
             <div class="comments_like_dislike_space">
               <div class="like_space plus">
                 <img src="images/icon-plus.svg" alt="">
               </div>
               <h5 class="likes_count">${it.score}</h5>
               <div class="like_space minus">
                 <img src="images/icon-minus.svg" alt="" >
               </div>
             </div>
             <div class="reply_space id${it.id}">
             <img src="images/icon-reply.svg" alt="">
             <h5 class="reply_text">Reply</h5>
             </div>
            </div>
            </div>
        `
      }).join('')
    }
    return `
    <div class="single_comment_space comId${item.id}">
    <div class="this_comment">
       <div class="userInfo_space">

          <div class="profile_image_box">
             <img src=${item.user.image.png} alt="" class="profile_image">
          </div>
          <h4 class="profile_username">${item.user.username}</h4>
          <h5 class="profile_date">${item.createdAt}</h5>
       </div>

       <div class="comment_text_space">
          <h5 class="comment_text">${item.content}</h5>
       </div>

       <div class="comments_actions_space">
         <div class="comments_like_dislike_space">
           <div class="like_space plus">
             <img src="images/icon-plus.svg" alt="">
           </div>
           <h5 class="likes_count">${item.score}</h5>
           <div class="like_space minus">
             <img src="images/icon-minus.svg" alt="" >
           </div>
         </div>

         <div class="reply_space id${item.id}">
           <img src="images/icon-reply.svg" alt="">
           <h5 class="reply_text">Reply</h5>
         </div>

       </div>
    </div>
    <div class="reply_input reply_input${item.id}">
      ${replies !== undefined ? replies:''}
    </div>
    </div>
    `
  }).join('')
  const userReply = `
  <div class="user_reply_box">
  <div class="profile_image_box">
  <img src=${data.currentUser.image.png} alt="" class="profile_image">
  </div>
  <textarea name="name" rows="6" cols="40" class="text_area">
  </textarea>
  <div class="reply_box">
  <button type="button" name="button" class="reply_btn">Reply</button>
  </div>
 </div>

  `
  comments_space.innerHTML = coms;
  get_reply_space()
  trigger_reply(userReply, data)
}
function get_reply_space() {
  allReply = document.querySelectorAll('.reply_space')
  user_reply_box = document.querySelectorAll('.user_reply_box')
}
let r_open = false;
function trigger_reply(userReply, data){
  allReply.forEach((item, i) => {
     item.addEventListener('click', () => {
       const indx = parseInt(item.classList[1].slice(2))
         console.log(indx);
           add_reply_input(userReply, indx, data)
     })
  });

}
function add_reply_input(userReply, indx, data) {
  user_reply_box.forEach((ele, i) => {
    ele.style.display = 'none'
  });
  //const thisComment = document.querySelector(`.comId${indx}`)
  const replyInp = document.querySelector(`.reply_input${indx}`)
  replyInp.innerHTML += userReply;
  const reply_btns = document.querySelectorAll('.reply_box')
  trigger_replyBtns(reply_btns, data, replyInp)
}
function trigger_replyBtns(btns, data, replyInp) {
  btns.forEach((item, i) => {
    item.addEventListener('click', () => {
      let text_area = document.querySelector('.text_area')
      console.log(text_area.value);
      const reply_comment = `
      <div class="this_comment reply_c">
         <div class="userInfo_space">

            <div class="profile_image_box">
               <img src=${data.currentUser.image.png} alt="" class="profile_image">
            </div>
            <h4 class="profile_username">${data.currentUser.username}</h4>
            <h5 class="profile_date">1 minute ago</h5>
         </div>

         <div class="comment_text_space">
            <h5 class="comment_text">${text_area.value}</h5>
         </div>

         <div class="comments_actions_space">
           <div class="comments_like_dislike_space">
             <div class="like_space plus">
               <img src="images/icon-plus.svg" alt="">
             </div>
             <h5 class="likes_count">${1}</h5>
             <div class="like_space minus">
               <img src="images/icon-minus.svg" alt="" >
             </div>
           </div>

           <div class="reply_space id${0}">
             <img src="images/icon-reply.svg" alt="">
             <h5 class="reply_text">Reply</h5>
           </div>

         </div>
      </div>
      <div class="reply_input${0}">

      </div>
      `;
      replyInp.innerHTML += reply_comment;
      let bbs = document.querySelectorAll('.user_reply_box')
      bbs.forEach((ele, i) => {
        ele.style.display = 'none'
      });

    })
  });

}
