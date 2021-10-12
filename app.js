const SHA256 = require('crypto-js/sha256')
class Block{
    constructor(timestamp, data , hashPrevio=''){
        this.timestamp=timestamp;
        this.data=data;
        this.hashPrevio=hashPrevio;
        this.hash = this.calcularHash()
    }
    calcularHash() {
        return SHA256(this.timestamp + this.hashPrevio + JSON.stringify(this.data)).toString()
    }
}

class BlockChain{
    constructor(){
        this.chain =[this.crearBloqueGenesis()]
    }

    crearBloqueGenesis(){
        return new Block('01/01/2018', 'BloqueGenesis', '0')
    }

    getUltimoBloque(){
        return this.chain[this.chain.length-1]
    }

    agregarBloque(nuevoBloque){
        nuevoBloque.hashPrevio=this.getUltimoBloque().hash
        nuevoBloque.hash = nuevoBloque.calcularHash()
        this.chain.push(nuevoBloque)
    }
}
let Coin = new BlockChain()
Coin.agregarBloque(new Block('16/10/2018', {cantidad:10}))
Coin.agregarBloque(new Block('18/10/2018', {cantidad:40}))
Coin.agregarBloque(new Block('20/10/2018', {cantidad:80}))
Coin.agregarBloque(new Block('26/10/2018', {cantidad:60}))

console.log(JSON.stringify(Coin, null , 4))



