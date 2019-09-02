function dd(obj , string = "your target", type = 'p'){
    switch (type){
    case 'p':
            var out= '';
              for (var i in obj){
                out += i + ": " + obj[i] + "\n";
              }
            alert(string + ':'+ out);
        break;
    case 'vd':
          console.log(string);
          console.log(obj);
        break;
    }
}

function owesomeAlert(titleToBind, textToShow ,typeToBind, confirmbtnText = null, cbtnText = null , confirmStyle = null){
    swal({
      title: titleToBind,
      text: textToShow,
      type: typeToBind,
      showCancelButton: cbtnText ? true : false,

      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmbtnText,
      cancelButtonText: cbtnText,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swal({
          title: 'Reloading' ,
          text:  'have fun todd.',
          type : 'success',
          timer : 2500
        })
        setTimeout(function(){
            window.location.reload();
        }, 2000);

      } else if (result.dismiss === 'cancel') {
        swal({
          title: 'Pausing',
          text: 'Refresh the page to play again',
          type: 'info',
          animation: false,
          customClass: 'animated tada',
          timer: 1000
        })
      }
    })

}
