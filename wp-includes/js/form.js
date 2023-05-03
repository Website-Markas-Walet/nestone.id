function Calc(v){
    var pcs = document.getElementById("pcs").value;
    var harga = document.getElementById("harga").value;

    var total = pcs*harga;
    document.getElementById("total").value = total;
}
