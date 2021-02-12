const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, data, prevHash) {
        this.index = index;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.data = data;
        this.previousHash = prevHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        // console.log(
        //     `Calculating hash for following data: ${this.index} ${this.previousHash} ${this.timestamp} ${this.data} ${this.nonce}`
        // );

        // console.log(
        //     `Calculated hash:  ${SHA256(
        //         this.index +
        //             this.previousHash +
        //             this.timestamp +
        //             this.data +
        //             this.nonce
        //     ).toString()} \n`
        // );

        return SHA256(
            this.index +
                this.previousHash +
                this.timestamp +
                this.data +
                this.nonce
        ).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [];
    }

    addBlock(data) {
        let index = this.chain.length;
        let prevHash =
            this.chain.length !== 0
                ? this.chain[this.chain.length - 1].hash
                : 0;
        let block = new Block(index, data, prevHash);
        this.chain.push(block);
    }

    chainIsValid() {
        for (let i = 0; i < this.chain.length; i++) {
            let currentBlock = this.chain[i];

            // console.log("i= " + i);
            // console.log("1: " + currentBlock.hash);
            // console.log("2: " + currentBlock.calculateHash());
            // console.log("3: " + currentBlock.previousHash);
            // if (i > 0) console.log("4: " + this.chain[i - 1].hash);
            // console.log("\n");

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (i > 0 && currentBlock.previousHash !== this.chain[i - 1].hash) {
                return false;
            }
        }
        return true;
    }
}

let BlockChain = new Blockchain();

BlockChain.addBlock({
    sender: "Bruce wayne",
    reciver: "Tony stark",
    amount: 100,
});
BlockChain.addBlock({
    sender: "Harrison wells",
    reciver: "Han solo",
    amount: 50,
});
BlockChain.addBlock({ sender: "Tony stark", reciver: "Ned stark", amount: 75 });

console.dir(BlockChain, { depth: null });

console.log("Is blockchain valid? " + BlockChain.chainIsValid());
