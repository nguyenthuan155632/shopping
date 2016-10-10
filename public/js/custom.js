$(document).ready(function(){


  $(".submenu > a").click(function(e) {
    e.preventDefault();
    var $li = $(this).parent("li");
    var $ul = $(this).next("ul");

    if($li.hasClass("open")) {
      $ul.slideUp(350);
      $li.removeClass("open");
    } else {
      $(".nav > li > ul").slideUp(350);
      $(".nav > li").removeClass("open");
      $ul.slideDown(350);
      $li.addClass("open");
    }
  });

  $('#submit_category').click(function(e) {
    if($('#category_slug').val() == "" || $('#category_name').val() == "") {
      $('#category-err').css('display', 'block');
      $('#category-err').text('Please fill out required fields!');
      return false;
    }
  });

  $('.remove-category').click(function(e) {
    if (confirm("Are you sure?")) {
      deleteId = $(this).data('id');
      $.ajax({
        url: '/manage/categories/delete/' + deleteId,
        type: "DELETE",
        success: function() {

        }
      });
      window.location = '/manage/categories';
    }
    return false;
  });

  $('.remove-product').click(function(e) {
    if (confirm("Are you sure?")) {
      deleteId = $(this).data('id');
      $.ajax({
        url: '/manage/products/delete/' + deleteId,
        type: "DELETE",
        success: function() {

        }
      });
      window.location = '/manage/products';
    }
    return false;
  });

  $('.remove-blog-cate').click(function(e) {
    if (confirm("Are you sure?")) {
      deleteId = $(this).data('id');
      $.ajax({
        url: '/manage/blog_cate/delete/' + deleteId,
        type: "DELETE",
        success: function() {

        }
      });
      window.location = '/manage/blog_cate';
    }
    return false;
  });

  $('.remove-blog').click(function(e) {
    if (confirm("Are you sure?")) {
      deleteId = $(this).data('id');
      $.ajax({
        url: '/manage/blogs/delete/' + deleteId,
        type: "DELETE",
        success: function() {

        }
      });
      window.location = '/manage/blogs';
    }
    return false;
  });

  $('.remove-user').click(function(e) {
    if (confirm("Are you sure?")) {
      deleteId = $(this).data('id');
      $.ajax({
        url: '/manage/users/delete/' + deleteId,
        type: "DELETE",
        success: function() {

        }
      });
      window.location = '/manage/users';
    }
    return false;
  });

  $('#submit_signup').click(function() {
    if($('input[name=password]').val() != $('input[name=password_confirm]').val()) {
      $('#signup-err').css('display', 'block');
      $('#signup-err').text('Password and Password Confirm do not match!');
      return false;
    }
    else {
      $('#signup-err').css('display', 'none');
    }
  });

  $('#submit_edit_user').click(function() {
    if($('input[name=password]').val() != "" || $('input[name=password_confirm]').val() != "") {
      if($('input[name=password]').val() != $('input[name=password_confirm]').val())  {
        $('#edit-user-err').css('display', 'block');
        $('#edit-user-err').text('Password and Password Confirm do not match!');
        return false;
      }
      else {
        $('#edit-user-err').css('display', 'none');
      }
    }
  });
  
  $('.sidebar ul.nav li').each(function() {
    $(this).removeClass('current');
    if(window.location.pathname == $('a', this).attr('href') || window.location.pathname == $('a', this).attr('href') + '/') {
      $(this).addClass('current');
    }
  });
  
});
