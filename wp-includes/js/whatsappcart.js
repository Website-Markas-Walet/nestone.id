function whatsapp(){
    var produk = document.getElementById("produk").value;
    var nama = document.getElementById("nama").value;
    var alamat = document.getElementById("alamat").value;
    var produk = document.getElementById("produk").value;
    var pcs = document.getElementById("pcs").value;
    var harga = document.getElementById("harga").value;

    var whatsappurl="https://wa.me/6287725260196?text="
    + "Halo NestOne.id, Saya" + "%20" + nama + "%0a"
    + "ingin memesan produk" + "%20" + produk + "%0a"
    + "Total pcs :" + "%20" + pcs + "%0a"
    + "Harga :" + "%20" + harga;
    + "Alamat :" + "%20" + alamat + "%0a"

    window.open(whatsappurl,"_blank").focus();
} 