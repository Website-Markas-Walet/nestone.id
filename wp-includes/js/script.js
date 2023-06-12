class CartItem{
    constructor(name, price){
        this.name = name
        this.price = price
        this.quantity = 1
   }
}

class LocalCart{
    static key = "cartItems"

    static getLocalCartItems(){
        let cartMap = new Map()
     const cart = localStorage.getItem(LocalCart.key)   
     if(cart===null || cart.length===0)  return cartMap
        return new Map(Object.entries(JSON.parse(cart)))
    }

    static addItemToLocalCart(id, item){
        let cart = LocalCart.getLocalCartItems()
        if(cart.has(id)){
            let mapItem = cart.get(id)
            mapItem.quantity +=1
            cart.set(id, mapItem)
        }
        else
        cart.set(id, item)
       localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
       updateCartUI()
       checkOut()
        
    }

    static removeItemFromCart(id){
    let cart = LocalCart.getLocalCartItems()
    if(cart.has(id)){
        let mapItem = cart.get(id)
        if(mapItem.quantity>1)
       {
        mapItem.quantity -=1
        cart.set(id, mapItem)
       }
       else
       cart.delete(id)
    } 
    if (cart.length===0)
    localStorage.clear()
    else
    localStorage.setItem(LocalCart.key,  JSON.stringify(Object.fromEntries(cart)))
       updateCartUI()
       checkOut()
    }
}


const cartIcon = document.querySelector('.fa-cart-arrow-down')
const wholeCartWindow = document.querySelector('.whole-cart-window')
wholeCartWindow.inWindow = 0
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn')
const cartBtns = document.querySelectorAll('.cart-btn')
cartBtns.forEach( (btn)=>{
    btn.addEventListener('click', addItemFunction)
}  )
addToCartBtns.forEach( (btn)=>{
    btn.addEventListener('click', addItemFunction)
}  )
cartBtns.forEach( (btn)=>{
    btn.addEventListener('click', showCartIcon)
}  )
addToCartBtns.forEach( (btn)=>{
    btn.addEventListener('click', showCartIcon)
}  )

function addItemFunction(e){
    const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    const name = e.target.parentElement.previousElementSibling.textContent
    let price = e.target.parentElement.children[1].textContent
    price = price.replace("Rp", '')
    const item = new CartItem(name, price)
    LocalCart.addItemToLocalCart(id, item)
 console.log(price)
}

function showCartIcon() {
    if (wholeCartWindow.classList.contains('hide')) {
        wholeCartWindow.classList.remove('hide')
    }
  }

cartIcon.addEventListener('mouseover', ()=>{
if(wholeCartWindow.classList.contains('hide'))
wholeCartWindow.classList.remove('hide')
})

cartIcon.addEventListener('mouseleave', ()=>{
    // if(wholeCartWindow.classList.contains('hide'))
    setTimeout( () =>{
        if(wholeCartWindow.inWindow===0){
            wholeCartWindow.classList.add('hide')
        }
    } ,500 )
    
    })

 wholeCartWindow.addEventListener('mouseover', ()=>{
     wholeCartWindow.inWindow=1
 })  
 
 wholeCartWindow.addEventListener('mouseleave', ()=>{
    wholeCartWindow.inWindow=0
    wholeCartWindow.classList.add('hide')
})  
 

function updateCartUI(){
    const cartWrapper = document.querySelector('.cart-wrapper')
    cartWrapper.innerHTML=""
    const items = LocalCart.getLocalCartItems()
    if(items === null) return
    let count = 0
    let total = 0
    for(const [key, value] of items.entries()){
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        let price = value.price*value.quantity
        price = Math.round(price*100)/100
        count+=1
        total += price
        total = Math.round(total*100)/100
        cartItem.innerHTML =
        `
                       <div class="details">
                           <h4>${value.name}</h4>
                           <p>
                            <span class="quantity">Quantity: ${value.quantity}</span>
                               <span class="price">Rp${price}</span>
                               <span class="increase-quantity" onclick="increaseQuantity('${key}')"><i class="fas fa-plus"></i></span>
                               <span class="cancel" onclick="decreaseQuantity('${key}')"><i class="fas fa-minus"></i></span>
                           </p>
            </div>
                       
        `


        cartWrapper.append(cartItem)
    }

    if(count > 0){
        cartIcon.classList.add('non-empty')
        let root = document.querySelector(':root')
        root.style.setProperty('--after-content', `"${count}"`)
        const subtotal = document.querySelector('.subtotal')
        subtotal.innerHTML = `Total Harga: Rp${total}`
    }
    else
    cartIcon.classList.remove('non-empty')
}


function increaseQuantity(key) {
    LocalCart.addItemToLocalCart(key);
    updateCartUI();
    checkOut()
  }
  
  function decreaseQuantity(key) {
    LocalCart.removeItemFromCart(key);
    updateCartUI();
    checkOut()
  }
  

document.addEventListener('DOMContentLoaded', ()=>{updateCartUI(), checkOut()})

function checkOut() {
    const cartWrapper = document.querySelector('.checkout-item')
    cartWrapper.innerHTML = ""
    const items = LocalCart.getLocalCartItems()
    if (items === null) return
    let count = 0
    let total = 0

    // Membuat array untuk menyimpan data name, price, dan quantity
    const names = []
    const prices = []
    const quantities = []

    for (const [key, value] of items.entries()) {
        const cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        let price = value.price * value.quantity
        price = Math.round(price * 100) / 100
        count += 1
        total += price
        total = Math.round(total * 100) / 100
        cartItem.innerHTML =
        `
            <div class="details">
                <h4>${value.name}</h4>
                <p>
                    <span class="quantity">Quantity: ${value.quantity}</span>
                    <span class="price">Total Harga: Rp${price}</span>

                </p>
            </div>
        `

        // Menambahkan data name, price, dan quantity ke dalam array
        names.push(value.name)
        prices.push(price)
        quantities.push(value.quantity)

        cartWrapper.append(cartItem)
    }

    if (count > 0) {
        cartIcon.classList.add('non-empty')
        let root = document.querySelector(':root')
        root.style.setProperty('--after-content', `"${count}"`)
        const subtotal = document.querySelector('.subtotal')
        subtotal.innerHTML = `Total Harga: Rp${total}`

        // Memanggil total data name, price, dan quantity di HTML
        const namaProdukElemen = document.getElementById('nama-produk')
        const quantityElemen = document.getElementById('quantity')
        const hargaElemen = document.getElementById('harga')

        // Menggabungkan data name, price, dan quantity menjadi satu string
        const namaProduk = names.join(", ")
        const quantity = quantities.join(", ")
        const harga = prices.join(", ")

        namaProdukElemen.textContent = namaProduk
        quantityElemen.textContent = `Quantity: ${quantity}`
        hargaElemen.textContent = `Harga Satuan: Rp${harga}`
    } else {
        cartIcon.classList.remove('non-empty')
    }
}

function checkoutViaWhatsApp() {
    const items = LocalCart.getLocalCartItems();
    if (items === null) return;
  
    let message = 'Halo, saya ingin memesan produk berikut:\n\n';
  
    for (const [key, value] of items.entries()) {
      message += `Produk: ${value.name}\n`;
      message += `Harga Satuan: Rp${value.price}\n`;
      message += `Kuantitas: ${value.quantity}\n\n`;
    }

const nama = document.getElementById('namalengkap').value;
  const alamat = document.getElementById('alamat').value;
  const provinsi = document.getElementById('provinsi').value;
  const kota = document.getElementById('kota').value;
  const kecamatan = document.getElementById('kecamatan').value;
  const kelurahan = document.getElementById('kelurahan').value;
  const pos = document.getElementById('pos').value;


  message += `Nama Lengkap: ${nama}\n`;
  message += `Alamat: ${alamat}, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}, ${pos}\n\n`;
  
    const total = getTotalPrice(items);
    message += `Total Harga: Rp${total}\n\n`;
  
    // Ganti nomor telepon WhatsApp yang sesuai
    const phoneNumber = '6285731470538';
  
    // Buka WhatsApp dengan pesan yang sudah terisi
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`);
  }
  
  function getTotalPrice(items) {
    let total = 0;
    for (const [key, value] of items.entries()) {
      const price = value.price * value.quantity;
      total += price;
    }
    total = Math.round(total * 100) / 100;
    return total;
  }

  document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm();
  });
  
  function validateForm() {
    var nama = document.getElementById("namalengkap").value;
    var provinsi = document.getElementById("provinsi").value;
    var kota = document.getElementById("kota").value;
    var kecamatan = document.getElementById("kecamatan").value;
    var kelurahan = document.getElementById("kelurahan").value;
    var alamat = document.getElementById("alamat").value;
    var pos = document.getElementById("pos").value;
    
    if (nama === "" || provinsi === "Pilih" || kota === "Pilih" || kecamatan === "Pilih" || kelurahan === "Pilih" || alamat === "" || pos === "") {
      alert("Mohon lengkapi semua data!");
      return false;
    }
    else{
    checkoutViaWhatsApp();
    }
  }

   // JavaScript
   const addToCartBtn = document.querySelector('.add-to-cart-btn');


   addToCartBtn.addEventListener('click', () => {
     // Membuat elemen angka yang akan melayang
     const floatingNumber = document.createElement('span');
     floatingNumber.classList.add('floating-number');
     floatingNumber.textContent = '1';
   
     // Menambahkan animasi lalu menghapus elemen angka setelah animasi selesai
     floatingNumber.addEventListener('animationend', () => {
       floatingNumber.remove();
     });
   
     // Menambahkan elemen angka ke dalam tombol add-to-cart-btn
     addToCartBtn.appendChild(floatingNumber);
   });
 
 
    // JavaScript
    const cartBtn = document.querySelector('.cart-btn');
 
 
    cartBtn.addEventListener('click', () => {
      // Membuat elemen angka yang akan melayang
      const floatingNumber = document.createElement('span');
      floatingNumber.classList.add('floating-number');
      floatingNumber.textContent = '1';
    
      // Menambahkan animasi lalu menghapus elemen angka setelah animasi selesai
      floatingNumber.addEventListener('animationend', () => {
        floatingNumber.remove();
      });
    
      // Menambahkan elemen angka ke dalam tombol add-to-cart-btn
      cartBtn.appendChild(floatingNumber);
    });

