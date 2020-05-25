{   
    //method to submit a form data for new posts using ajax
    let createPost=function(){
        let newPostForm=$('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success: function(data){
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        });
    }

    //method to create a post in DOM

    let newPostDom = function(post){
        return $(`<span id="post-${ post._id }" >
        <p style="border: 1px solid black;">
            <small>
                <a class="delete-post-button" href="/posts/destroy/${ post._id }" style="color: black;">X</a>
            </small>
            ${ post.content }
        <br>
        <small>
        By:${ post.user.name }
        </small>
       </p>
       <div class="post-comments"> 
       
       

       <form action="/comments/create" method="POST">
        <input type="text" name="content" id="" placeholder="Comment here..." required>
        <input type="hidden" name="post" value="${ post._id }">
        <input type="submit" value="Comment">
        </form>
        <div class="comment-list-container">
        <ul id="post-comments-${ post._id }">

        </ul> 
          </div>
    
       </div>
    </span>`)
    }

    //method to delete a post from DOM
    let deletePost=function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        })
    }

    createPost();

}