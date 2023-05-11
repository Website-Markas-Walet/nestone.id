//* Add PayPal Email
simpleCart({
    checkout: {
      type: "PayPal",
      email: "you@yours.com"
    }
  });
  
  //* Add shopping cart dropdown in header
  jQuery(document).ready(function () {
    $('.showCart').on('click', function () {
      $('#cartPopover').slideToggle('fast');
      $('.showCart span.dropdown').toggleClass('fa-chevron-circle-down fa-chevron-circle-up');
    })
  });
  
  //* Define spreadsheet URL (make sure you add the #gid=0 for the sheet you want to use)
  var googleSheetURI = 'https://docs.google.com/spreadsheets/d/1paX0bl77dl17vDlKRBW__z7q9i9WUwfwSAlTurfQHSg/edit#gid=0';
  
  //* Compile the Handlebars template for HR leaders
  var HRTemplate = Handlebars.compile($('#hr-template').html());
  
  //* Load products from spreadsheet
  
  $('#products5').sheetrock({
    url: googleSheetURI,
    query: "select A,B,C,D",
    rowTemplate: HRTemplate
  });