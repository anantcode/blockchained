const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, data, prevHash) {
        this.index = index;
        this.timestamp = Math.floor(Date.now() / 1000);
        this.data = data;
        this.previousHash = prevHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(
            this.index +
                this.previousHash +
                this.timestamp +
                this.data +
                this.nonce
        ).toString();
    }

    mineBlock(difficulty) {}
}

class Blockchain {
    constructor() {
        this.chain = [];
    }

    createGenesis() {
        return new Block("10/02/2021", "Genesis block");
    }

    latestBlock() {
        return this.chain[this.chain.length - 1];
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
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (i > 0 && currentBlock.previousHash !== previousBlock.hash) {
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
