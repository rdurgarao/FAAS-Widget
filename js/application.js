;
(function ($) {

  var defaults = {
    faas_url: 'http://staging.faas.in/channels/FourthEstate/feedback',
    speed: 400,
    transition: 'slideIn',
    api_key: '10eaedc00df4d855666cb51c3ae0a95a',
    error_message: 'Problem sending feedback',
    submit_message: 'Thanks for your feedback'
  };


  $.fn.faas = function (options) {

    /*:===============================================================================
     * FAAS DOM ELEMENTS
     ================================================================================*/

    var faas_var_content =
        ['div', {style: css.faas_feedback_content, id: 'feedback_content'}]

    var faas_var_suggestion =
        ['div', {style: css.faas_column2}
          , ['input', {type: 'radio', checked: true, name: 'feedback_type', value: 'suggestion'}]
          , ['span', 'Suggestion']
        ]

    var faas_var_report =
        ['div', {style: css.faas_column2}
          , ['input', {type: 'radio', name: 'feedback_type', value: 'report'}]
          , ['span', 'Report']
        ]

    var faas_var_rating =
        ['div', {style: css.faas_column2, id: 'rating'}
          , ['input', {type: 'radio', name: 'feedback_type', value: 'rating'}]
          , ['span', 'Rating']
        ]
    var faas_var_comment_desc =
        ['div', {style: css.faas_comment_desc, id: 'faas_comment_desc'}
          , ['span', {style: css.faas_desc_title}, 'Comments']
          , ['textarea', {rows: 5, cols: 35, id: 'feedback_desc', style: css.faas_fdbck_text}]
        ]

    var faas_var_rating_desc =
        ['div', {style: css.faas_rating_desc, id: 'faas_rating_desc'}
          , ['span', {style: css.faas_desc_title}, 'Rating']
          , ['span', {style:"font-size: 30px"}, "☆☆☆☆☆"]
        ]


    var faas_var_buttons =
        ['div', {id: 'faas_buttons', style: 'padding-left:108px;padding-top:10px'}
          , ['button', {text: 'submit', id: 'btn-feedback', style: css.faas_btn}]
          , ['span', {style: "padding-left: 5px"} ]
          , ['button', {text: 'cancel', id: 'faas_cancel', style: css.faas_btn}]
        ]

    var faas_var_feedback_type =
        ['div', {style: css.faas_row}
          , DOMBuilder.build(faas_var_suggestion, 'dom')
          , DOMBuilder.build(faas_var_report, 'dom')
          , DOMBuilder.build(faas_var_rating, 'dom')
        ]

    var faas_var_comment_wraper =
        ['div', {style: css.faas_row}
          , DOMBuilder.build(faas_var_comment_desc)
          , DOMBuilder.build(faas_var_buttons)

    ]

    var faas_var_error_message =
        ['div', {style: css.faas_error_message}]

    var faas_var_submit_message =
        ['div', {style: css.faas_submit_message}]

    var faas_var_button =
        ['button', {style: css.faas_btn+css.faas_close_btn, text: 'close', class: 'close_popup'}]

//    *********************************************************************************************************************

    config = $.fn.extend({}, defaults, options);

//    Customising CSS
//    css.faas_feedback_btn = css.faas_feedback_btn.concat(config.button_float + ': 0;' + 'float : ' + config.button_float + ';');

    this.append($('<div/>', {id: 'feedback_div'}));


    $('#feedback_div').append(DOMBuilder.build(faas_var_content));

    this.click(function () {

      $('#feedback_content').empty();
      $('#feedback_content').append(
          DOMBuilder.build(faas_var_feedback_type, 'dom'), DOMBuilder.build(faas_var_comment_wraper, 'dom')
      );

      choose_options();
      $("#btn-feedback").click(function () {
        send_request();
      });

      $("#faas_cancel").click(function () {
        close_popup();
      });

      $('input[name = feedback_type]').change(function () {
        choose_options();
        $("#btn-feedback").click(function () {
          send_request();
        });
      });

      $('#feedback_content').bPopup({
        speed: config.speed,
        transition: config.transition
      });

      function choose_options() {
        var option = $('input[name = feedback_type]:checked').val();
        $('#faas_rating_desc').remove();
        $('#faas_comment_desc').remove();

        if (option == 'rating') {

          $('#feedback_content ').append(DOMBuilder.build(faas_var_rating_desc));
        }
        else {

          $('#feedback_content').append(DOMBuilder.build(faas_var_comment_desc));
        }

        $('#faas_buttons').remove();
        $('#feedback_content').append(DOMBuilder.build(faas_var_buttons));

        $("#faas_cancel").click(function () {
          close_popup();
        });
      }

      function close_popup()
      {
        $("#feedback_content").bPopup().close();
      }

      function send_request() {
        var option = $('input[name = feedback_type]:checked').val();
        var description = $("#feedback_desc").val();

	var url = config.faas_url+'?feedback_type='+option+'&comments='+description+'&api_key='+config.api_key+'&rating=2';
	var xhr = createCORSRequest('POST', url);
	xhr.setRequestHeader('X-Custom-Header', 'value');
	xhr.send();

	xhr.onreadystatechange = function(){
	if (xhr.status == 200 )
	{
	 $('#feedback_content').empty();
         $('#feedback_content').append(DOMBuilder.build(faas_var_submit_message));
         $('#feedback_content :first').html(config.submit_message);
         $('#feedback_content').append(DOMBuilder.build(faas_var_button));
         $('.close_popup').click(function(){
         close_popup();
         });
	}
	else
	{
	$('#feedback_content').empty();
        $('#feedback_content').append(DOMBuilder.build(faas_var_error_message));
        $('#feedback_content :first').html(config.error_message);
        $('#feedback_content').append(DOMBuilder.build(faas_var_button));
        $('.close_popup').click(function(){
        close_popup();
        });
	}

}

	//if (xhr.readyState == 2 )
//	{


//	}

//        $.ajax({
//          type: 'POST',
//          contentType: "application/json; charset=utf-8",
//	  crossDomain : true,
//          dataType: 'json',
//          data: {'feedback_type': option, 'comments': description, 'api_key': config.api_key, 'rating': "fds"},
//          url: config.faas_url,
//          success: function (data) {

//            $('#feedback_content').empty();
//            $('#feedback_content').append(DOMBuilder.build(faas_var_submit_message));
//            $('#feedback_content :first').html(config.submit_message);
//            $('#feedback_content').append(DOMBuilder.build(faas_var_button));
//            $('.close_popup').click(function(){
//              close_popup();
//            });

//          },
//          error: function (xhr, status) {

//            $('#feedback_content').empty();
//            $('#feedback_content').append(DOMBuilder.build(faas_var_error_message));
//            $('#feedback_content :first').html(config.error_message);
//            $('#feedback_content').append(DOMBuilder.build(faas_var_button));
//            $('.close_popup').click(function(){
//              close_popup();
//            });
//          }
//       });
      }
    });
  };

  /*:===============================================================================
   * FAAS CSS
   ================================================================================*/

  var css =
  {faas_row: "width : 400px;",
    faas_column1: "width: 65px; float: left;font-size: 20px;font-family:Helvetica",
    faas_column2: "width: 130px; float:left;font-size: 20px;font-family:Helvetica",
    faas_desc_title: "padding-left: 8px; width: 100px; float:left;font-size: 20px;font-family:Helvetica",
//    faas_feedback_btn: "top: 50%; color:red; position: fixed; -webkit-transform: rotate(-90deg); transform: rotate(-90deg); width: 100px; background: pink; height: 10px; border-radius: 3px; padding: 21px; color: #f96277; border: 2px solid #f96277; text-align: center; line-height: 15px; font-size: 15px; font-weight: bold; transition: background 0.4s;",
    faas_feedback_hover: "cursor: hand;",
    faas_feedback_content: "padding: 20px; height: 190px; width:  400px; background-color: #DCEDEA; border: 1px solid; border-radius:3px;opacity: 0; z-index: 2;display: block;padding: 30px 40px;float: left;border-color:red",
    faas_fdbck_text: "width: 270px; border-radius: 5px; background-color: #C0E7F3; resize : none;",
    faas_fdbck_text_title: "padding-right: 50px;",
    faas_fdbck_span: "",
    faas_comment_desc: "padding-top: 40px;",
    faas_rating_desc: "padding-top: 30px",
    faas_btn: "cursor: pointer;font-family: Open Sans, Helvetica Neue, Helvetica, Helvetica, Arial, sans-serif !important;font-weight: normal;  line-height: normal;margin: 0 0 1.11111rem; position: relative; text-decoration: none;text-align: center;display: inline-block; padding-top: 0.88889rem; padding-right: 1.0rem;  padding-bottom: 0.94444rem;  padding-left: 1.0rem;  font-size: 0.88889rem;  background-color: #008cba;  border-color: #007ba1;  color: white;  -webkit-transition: background-color 300ms ease-out;  -moz-transition: background-color 300ms ease-out;  transition: background-color 300ms ease-out;  padding-top: 0.94444rem;  padding-bottom: 0.88889rem;  -webkit-appearance: none;  border: none;  font-weight: normal !important;",    faas_close_btn: "margin-left : 40%;margin-top : 10%;",
    faas_error_message: "color: red; text-align: center;padding-top: 10%;border-style: solid;border-width: 1px;  display: block; font-weight: normal;  margin-bottom: 1.11111rem;  position: relative;  padding: 0.77778rem 1.33333rem 0.77778rem 0.77778rem;  font-size: 0.72222rem;",
    faas_submit_message: "color: green; text-align: center;padding-top: 10%;"
  }

}(jQuery));


//cors request

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}



