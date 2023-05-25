function whatsapp(){
    var produk = document.getElementById("produk").value;
    var nama = document.getElementById("nama").value;
    var alamat = document.getElementById("alamat").value;
    var pcs = document.getElementById("pcs");
    var nilaiPcs = pcs.textContent;
    var harga = document.getElementById("harga").value;
    var provinsi = document.getElementById("provinsi").value;
    var kota = document.getElementById("kota").value;
    var kecamatan = document.getElementById("kecamatan").value;
    var kelurahan = document.getElementById("kelurahan").value;
    var pos = document.getElementById("pos").value;

    var whatsappurl="https://wa.me/6287725260196?text="
    + "Halo nestone.id, Saya" + "%20" + nama + "%0a"
    + "Alamat :" + "%20" + kelurahan + "%20" + alamat + ", "+kecamatan+", "+kota+", "+provinsi + "%0a"
    + "Kode Pos : " + pos + "%0a" + "%0a"
    + "Ingin memesan produk : " + "%20" + produk + "%0a"
    + "Total pcs :" + "%20" + nilaiPcs + "%0a"
    + "Harga Satuan Produk : Rp." + harga;

    window.open(whatsappurl,"_blank").focus();
}
