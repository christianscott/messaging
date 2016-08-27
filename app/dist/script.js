$(() => {
  let $messages = $('#messages');
  let $name = $('#name');
  let $message = $('#message');


  let messageTemplate = "<li><div class='msg'>" +
                        "<div class = 'text'><em>{{ name }} says:</em> {{ msg }} </div>"+
                        "<button data-id='{{ id }}' class='remove btn btn-default'>X</button></div></li>"
  let newLine = (msg) => {
    $messages.append(Mustache.render(messageTemplate, msg))
  };

  $.ajax({
    type: 'GET',
    url: 'http://localhost:8888/messages',
    success: (messages) => {
      $.each(messages, (i, message) => {
        newLine(message);
      });
    },
    error: () => {
      try {
        throw new Error('Failed to load resource.');
      } catch (e) {
        console.log(e);
      };
    }
  });

  $('#add-message').on('click', () => {

    let message = {
      name: $name.val(),
      msg: $message.val()
    };

    $.ajax({
      type: 'POST',
      data: message,
      url: 'http://localhost:8888/messages',
      success: (message) => {
        newLine(message);
      },
      error: () => {
        try {
          throw new Error('Failed to post resource.');
        } catch (e) {
          console.log(e);
        };
      }
    })
  })
});
