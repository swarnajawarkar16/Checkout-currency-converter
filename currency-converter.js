console.log('currency converter checkout file is here');
if(localStorage.swarna){
  

let userCurrency = 'INR';
document.cookie.split(';').forEach(x=>{
    if(x.includes('CustomCurrency')) {
        userCurrency = x.split('=')[1];
    }
});




//currencyConversion
function currencyConversion(valuePrice , element , priceCurrencyelem){
    if(userCurrency == 'INR') return;
    console.log('Inside converting fxn......');
    let hasCurrency = 'USD';
    let currCurrency = 'INR';
    let baseCurrency = 'INR';
    //  userCurrency = 'AED';

    let currencyExchangefrom,currencyChange,updatedCurrency;
    if(!element.innerText.includes(`${hasCurrency}`)){
    if(priceCurrencyelem) priceCurrencyelem.innerText = userCurrency;

     console.log(' converting ......'); 
     let convertedprice = (valuePrice*(JSON.parse(localStorage.conversionRates)[baseCurrency]) ) / (JSON.parse(localStorage.conversionRates)[userCurrency]);  
    //  updatedCurrency = userCurrency + ' ' + (valuePrice*JSON.parse(localStorage.conversionRates)[currCurrency]).toFixed(2);
    // if(userCurrency == 'INR') updatedCurrency =  '₹' + convertedprice.toFixed(3);
     updatedCurrency = userCurrency + '' + convertedprice.toFixed(3);
     element.innerText = updatedCurrency;
    // return updatedCurrency ;
    }
}





//------------------------------------ Information step --------------------------------------------------//

          /*orderSummary cart Items */
function orderSummaryItems(){
    let cartItems = document.querySelectorAll('.order-summary__section__content [data-order-summary-section="line-items"] .product');
    cartItems.forEach(item=>{
        let prItem = item.querySelector('.product__price span');
        let itemPrice = prItem.innerText;
        let newItemPrice = parseInt ( Array.from(itemPrice).map(x=>parseInt(x)).filter(x=>x || x===0).join('')/100 );
        currencyConversion(newItemPrice, prItem);
    });
};

            /*subtotal*/
function checkoutSubtotalItemfxn(){
    let checkoutSubtotalItem = document.querySelector('[data-order-summary-section="payment-lines"] [data-checkout-subtotal-price-target]');
    if(checkoutSubtotalItem){
       let checkoutSubtotal = checkoutSubtotalItem.getAttribute('data-checkout-subtotal-price-target');
       checkoutSubtotal = parseFloat(checkoutSubtotal/100); 
        checkoutSubtotalItem.setAttribute('data-checkout-subtotal-price-target',checkoutSubtotal);
       currencyConversion(checkoutSubtotal,checkoutSubtotalItem); 
    } 
};

/*shipping*/
function checkout_ShippingtotalItemfxn(){
    let checkout_ShippingtotalItem = document.querySelector('[data-order-summary-section="payment-lines"] [data-checkout-total-shipping-target]');
        if(checkout_ShippingtotalItem){
          let checkout_Shippingtotal = checkout_ShippingtotalItem.getAttribute('data-checkout-total-shipping-target');  
          console.log(checkout_Shippingtotal,'attrValue');
        
          let ifNumber = Array.from(checkout_ShippingtotalItem.innerText).map(x=>parseInt(x)).filter(x=>x).join('');
          console.log(ifNumber);
          if(ifNumber){
               console.log(checkout_ShippingtotalItem.innerText,"text"); 
               checkout_Shippingtotal = parseFloat(checkout_Shippingtotal/100);
               console.log(checkout_Shippingtotal,"checkout_Shippingtotal");
               currencyConversion(checkout_Shippingtotal,checkout_ShippingtotalItem);
            } 
        }; 
};

//total
function totalprice(){
    let payementCurrencyItem = document.querySelector('[data-presentment-currency] span.payment-due__currency');
    let itempr = document.querySelector('.total-line__price.payment-due .payment-due__price');
  if(document.querySelector('.total-line__price.payment-due .payment-due__price')){
    let itemTotalprice = document.querySelector('.total-line__price.payment-due .payment-due__price').getAttribute('data-checkout-payment-due-target');
    if( itemTotalprice ) {
        itemTotalprice = parseInt(itemTotalprice/100);
        console.log(itemTotalprice,"itemTotalprice");
        // currencyConversion(itemTotalprice);
        if(payementCurrencyItem) currencyConversion(itemTotalprice,itempr,payementCurrencyItem);
        else currencyConversion(itemTotalprice,itempr);
    }
}
}


//------------------------------------ Shipping step --------------------------------------------------//

/* shipping method radio btns */
let shippingmethods = document.querySelectorAll('[data-shipping-methods] [data-shipping-method]');
for(let i=0;i< shippingmethods.length ; i++){
        let radioInput = shippingmethods[i].querySelector('.radio__input input');
        let radioLabel = shippingmethods[i].querySelector('.radio__label .radio__label__accessory .content-box__emphasis');
        let ifNumber;
        if(radioLabel)  ifNumber = Array.from(radioLabel.innerText).map(x=>parseInt(x)).filter(x=>x).join('');
        if(ifNumber){
            let labelPrice = parseInt ( Array.from(radioLabel.innerText).map(x=>parseInt(x)).filter(x=>x || x===0).join('')/100 );
            currencyConversion(labelPrice,radioLabel);
        }
        radioInput.addEventListener('change',x=>{
             setTimeout(x=>{
                  checkoutSubtotalItemfxn();
                  totalprice();
                 checkout_ShippingtotalItemfxn();
             },1);
        });
}
                                                  
// information step & shipping step
window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
    checkoutSubtotalItemfxn();
    totalprice();
    checkout_ShippingtotalItemfxn();
    orderSummaryItems();
  });
}
  


