 $(document).ready(function() {
    fetchUsers ();
    // Create User
    $('#createForm').on('submit', function(e) {
     e.preventDefault ();
    const name = $('#createName').val();
    const email = $('#createEmail') . val();


    $.ajax({
    url: '/users', method: 'POST',
    data: { name, email },
    success: function(response) {
    console. log (response.message) ;
    fetchUsers();
    }
});
});

    
    // Update User
    $('#updateForm').on('submit', function(e) {
    e.preventDefault ();

    const id = $('#updateId').val();
    const name = $('#updateName') .val();
    const email = $('#updateEmail'). val();

    $.ajax({
    url: '/users/${id}', 
    method: 'PUT',
    data: { name, email },
    success: function(response) {
    console. log(response.message);
    fetchUsers();
    
    }
});
});

//Delete User
$('#deleteform').on('submit', function(e) {
e.preventDefault ();
 const id = ('#deleteld').val();


  $.ajax({
url: '/users/${id}', 
method: 'DELETE',
success: function(response) {
console.log (response. message);
fetchusers();
}
  });
});
});
 
  // Fetch all users
  function fetchUsers() {
 
  S.ajax({
url: '/users',
 
method: 'GET',
 
success: function (data) {
 
const userslist = $('#usersList');
 
usersList.empty();
 
 
data.forEach (user => {
usersList.append('<li›ID: ${user.id}, Name: $(user.name), Email: ${user.email}</li>');
});
}

});
  }